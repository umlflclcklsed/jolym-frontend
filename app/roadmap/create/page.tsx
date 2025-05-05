"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { roadmapAPI } from "@/lib/api"

export default function CreateRoadmapPage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [similarPrompts, setSimilarPrompts] = useState<any[]>([])
  const [searchingForSimilar, setSearchingForSimilar] = useState(false)

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
    } finally {
      setLoading(false)
    }
  }

  const handleSelectSimilarPrompt = (promptId: number, roadmapId: number | null) => {
    if (roadmapId) {
      router.push(`/roadmap/${roadmapId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-emerald-900">Create Career Roadmap</CardTitle>
              <CardDescription>
                Describe your desired career path or learning goal, and we'll generate a personalized roadmap for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">What do you want to learn or become?</Label>
                    <Input
                      id="prompt"
                      placeholder="e.g., Become a UX Designer, Learn machine learning, Master web development"
                      value={prompt}
                      onChange={handlePromptChange}
                      className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500">
                      Be specific about your goal. This helps us generate a more accurate roadmap.
                    </p>
                  </div>
                </div>
              </form>

              {/* Similar prompts */}
              {similarPrompts.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Similar roadmaps already exist:</h3>
                  <div className="space-y-2">
                    {similarPrompts.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 border border-emerald-100 rounded-lg hover:bg-emerald-50 cursor-pointer"
                        onClick={() => handleSelectSimilarPrompt(item.id, item.roadmap_id)}
                      >
                        <p className="font-medium text-emerald-800">{item.text}</p>
                        {item.roadmap_id && (
                          <p className="text-xs text-emerald-600 mt-1">Click to view this existing roadmap</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchingForSimilar && (
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Loader2 className="h-3 w-3 animate-spin mr-2" />
                  Searching for similar roadmaps...
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-emerald-700 hover:bg-emerald-800" disabled={loading}>
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

          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-medium text-emerald-900">Popular Career Paths</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  className="justify-start border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={() => setPrompt(`Become a ${suggestion}`)}
                  disabled={loading}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
