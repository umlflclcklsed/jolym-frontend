"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { generateRoadmapAction } from "@/app/actions/roadmap-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons"

export default function CreateRoadmapPage() {
  const router = useRouter()
  const [career, setCareer] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!career.trim()) {
      setError("Please enter a career path")
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Generate roadmap using Groq
      const roadmapData = await generateRoadmapAction(career)

      // Redirect to the new roadmap
      // In a real app, you'd save this to the database first and get an ID
      // For now, we'll just use a mock ID
      router.push(`/roadmap/new-${Date.now()}`)
    } catch (err: any) {
      console.error("Error generating roadmap:", err)
      setError(err.message || "Failed to generate roadmap. Please try again.")
    } finally {
      setLoading(false)
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
                Enter your desired career path and we'll generate a personalized roadmap for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="career">Career Path</Label>
                    <Input
                      id="career"
                      placeholder="e.g., UX Designer, Data Scientist, Marketing Manager"
                      value={career}
                      onChange={(e) => setCareer(e.target.value)}
                      className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500">
                      Be specific about the career you want to pursue. This helps us generate a more accurate roadmap.
                    </p>
                  </div>
                </div>
              </form>
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
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
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
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  className="justify-start border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={() => setCareer(suggestion)}
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
