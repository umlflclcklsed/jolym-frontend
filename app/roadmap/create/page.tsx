"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { roadmapAPI } from "@/lib/api"
import { RoadmapGenerationLoading } from "@/components/roadmap-generation-loading"
import { cn } from "@/lib/utils"

export default function CreateRoadmapPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [similarPrompts, setSimilarPrompts] = useState<any[]>([])
  const [searchingForSimilar, setSearchingForSimilar] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    // Check for query parameter
    const q = searchParams?.get("q")
    if (q) {
      setPrompt(q)
      handlePromptChange({ target: { value: q } } as React.ChangeEvent<HTMLInputElement>)
    }

    // Trigger animation
    setTimeout(() => {
      setAnimateIn(true)
    }, 100)
  }, [searchParams])

  const handlePromptChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setPrompt(text)

    // If text is long enough, search for similar prompts
    if (text.length > 10) {
      try {
        setSearchingForSimilar(true)
        const response = await roadmapAPI.findSimilarPrompts(text)
        setSimilarPrompts(response.data || [])
      } catch (err) {
        console.error("Error finding similar prompts:", err)
      } finally {
        setSearchingForSimilar(false)
      }
    } else {
      setSimilarPrompts([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prompt.trim()) {
      setError("Please enter a career path or goal")
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Create prompt and generate roadmap
      const response = await roadmapAPI.createPrompt(prompt)

      // If successful and we have a roadmap_id, redirect to it
      if (response.data && response.data.roadmap_id) {
        router.push(`/roadmap/${response.data.roadmap_id}`)
      } else {
        throw new Error("Failed to generate roadmap")
      }
    } catch (err: any) {
      console.error("Error generating roadmap:", err)
      setError(err.response?.data?.detail || "Failed to generate roadmap. Please try again.")
      setLoading(false)
    }
  }

  const handleSelectSimilarPrompt = (promptId: number, roadmapId: number | null) => {
    if (roadmapId) {
      router.push(`/roadmap/${roadmapId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        {loading ? (
          <RoadmapGenerationLoading />
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card
              className={cn(
                "border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-emerald-900/10 opacity-0 translate-y-8 transition-all duration-500",
                animateIn && "opacity-100 translate-y-0",
              )}
            >
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 gradient-text">
                  Create Career Roadmap
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Describe your desired career path or learning goal, and we'll generate a personalized roadmap for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert
                    variant="destructive"
                    className="mb-6 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/30"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="prompt" className="text-gray-700 dark:text-gray-300">
                        What do you want to learn or become?
                      </Label>
                      <Input
                        id="prompt"
                        placeholder="e.g., Become a UX Designer, Learn machine learning, Master web development"
                        value={prompt}
                        onChange={handlePromptChange}
                        className="border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500 h-12 text-base"
                        disabled={loading}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Be specific about your goal. This helps us generate a more accurate roadmap.
                      </p>
                    </div>
                  </div>
                </form>

                {/* Similar prompts */}
                {similarPrompts.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Similar roadmaps already exist:
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      {similarPrompts.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 cursor-pointer transition-colors duration-200"
                          onClick={() => handleSelectSimilarPrompt(item.id, item.roadmap_id)}
                        >
                          <p className="font-medium text-gray-800 dark:text-gray-200">{item.text}</p>
                          {item.roadmap_id && (
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                              Click to view this existing roadmap
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {searchingForSimilar && (
                  <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Loader2 className="h-3 w-3 animate-spin mr-2" />
                    Searching for similar roadmaps...
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-all duration-300"
                  disabled={loading || !prompt.trim()}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Roadmap"
                  )}
                </Button>
              </CardFooter>
            </Card>

            <div
              className={cn(
                "mt-12 space-y-6 opacity-0 translate-y-8 transition-all duration-500 delay-300",
                animateIn && "opacity-100 translate-y-0",
              )}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 gradient-text text-center">
                Popular Career Paths
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  "UX Designer",
                  "Data Scientist",
                  "Full Stack Developer",
                  "Product Manager",
                  "Digital Marketer",
                  "Cloud Architect",
                  "Machine Learning Engineer",
                  "DevOps Engineer",
                  "Blockchain Developer",
                  "Cybersecurity Specialist",
                  "AI Researcher",
                  "Mobile App Developer",
                  "Game Developer",
                  "Data Analyst",
                  "Frontend Developer",
                  "Backend Developer",
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    className="justify-start border-gray-200 dark:border-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-200"
                    onClick={() => setPrompt(`Become a ${suggestion}`)}
                    disabled={loading}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
