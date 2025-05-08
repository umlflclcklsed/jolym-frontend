"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Share2, Clock, BarChart, BookOpen, Target, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import MultiLevelRoadmap from "@/components/multi-level-roadmap"
import { mockRoadmapData } from "@/data/mock-roadmap"

export default function RoadmapPage() {
  const [showDetails, setShowDetails] = useState(true)
  const [roadmapData, setRoadmapData] = useState(mockRoadmapData)

  // Function to update task completion status
  const handleUpdateProgress = (phaseId: string, milestoneId: string, taskId: string, completed: boolean) => {
    setRoadmapData((prevData) => {
      const newData = { ...prevData }

      // Find and update the specific task
      const phase = newData.phases.find((p) => p.id === phaseId)
      if (phase) {
        const milestone = phase.milestones.find((m) => m.id === milestoneId)
        if (milestone) {
          const task = milestone.tasks.find((t) => t.id === taskId)
          if (task) {
            task.completed = completed
          }

          // Update milestone completion status
          milestone.completed = milestone.tasks.every((t) => t.completed)
        }

        // Update phase completion status
        phase.completed = phase.milestones.every((m) => m.completed)
      }

      return newData
    })
  }

  // Calculate overall progress
  const totalTasks = roadmapData.phases.reduce(
    (total, phase) =>
      total + phase.milestones.reduce((phaseTotal, milestone) => phaseTotal + milestone.tasks.length, 0),
    0,
  )

  const completedTasks = roadmapData.phases.reduce(
    (total, phase) =>
      total +
      phase.milestones.reduce(
        (phaseTotal, milestone) => phaseTotal + milestone.tasks.filter((task) => task.completed).length,
        0,
      ),
    0,
  )

  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Career Goal Card */}
        <Card className="border-emerald-100 dark:border-emerald-800 shadow-md bg-white dark:bg-gray-800 mb-8 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-200 dark:border-emerald-800 px-3 py-1 text-xs">
                    Career Path
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-800 px-3 py-1 text-xs">
                    Technology
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">{roadmapData.title}</h1>

                <p className="text-gray-600 dark:text-gray-300 max-w-2xl">{roadmapData.description}</p>

                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Time</p>
                      <p className="font-medium text-emerald-900 dark:text-emerald-100">{roadmapData.estimatedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Difficulty</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-2 rounded-full ${
                              i < roadmapData.difficulty ? "bg-emerald-500" : "bg-gray-200 dark:bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Prerequisites</p>
                      <p className="font-medium text-emerald-900 dark:text-emerald-100">Basic programming knowledge</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Career Level</p>
                      <p className="font-medium text-emerald-900 dark:text-emerald-100">Entry to Senior</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border-4 border-emerald-100 dark:border-emerald-800 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">{progressPercentage}%</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-300">Completed</p>
                  </div>
                </div>
                <Progress
                  value={progressPercentage}
                  className="w-32 h-2 bg-emerald-100 dark:bg-emerald-900/50"
                  indicatorClassName="bg-emerald-500 dark:bg-emerald-400"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <Button
                variant="ghost"
                className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 gap-2"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "Hide Details" : "Show Details"}
                <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? "rotate-180" : ""}`} />
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="gap-2 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/50 dark:hover:text-emerald-300"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/50 dark:hover:text-emerald-300"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            {showDetails && (
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium text-emerald-800 dark:text-emerald-300 mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {[
                      "Server-side programming languages and frameworks",
                      "Database design, management, and optimization",
                      "API development and integration",
                      "Authentication and authorization systems",
                      "Server deployment and DevOps practices",
                      "Performance optimization and scaling strategies",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/50 p-1 mt-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-700 dark:bg-emerald-400" />
                        </div>
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-emerald-800 dark:text-emerald-300 mb-3">Career Opportunities</h3>
                  <ul className="space-y-2">
                    {[
                      "Backend Developer ($70,000 - $120,000)",
                      "Full Stack Developer ($80,000 - $140,000)",
                      "API Developer ($75,000 - $130,000)",
                      "Database Administrator ($80,000 - $130,000)",
                      "DevOps Engineer ($90,000 - $150,000)",
                      "Software Architect ($120,000 - $200,000)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/50 p-1 mt-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-700 dark:bg-emerald-400" />
                        </div>
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Multi-level Roadmap */}
        <Card className="border-emerald-100 dark:border-emerald-800 shadow-md bg-white dark:bg-gray-800 backdrop-blur-sm">
          <div className="p-6">
            <MultiLevelRoadmap roadmap={roadmapData} onUpdateProgress={handleUpdateProgress} />
          </div>
        </Card>
      </div>
    </div>
  )
}
