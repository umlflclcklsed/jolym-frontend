"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Share2, Clock, BarChart, BookOpen, Target } from "lucide-react"
import BackendRoadmap from "@/components/backend-roadmap"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronDownIcon } from "@radix-ui/react-icons"

export default function RoadmapPage() {
  const [career] = useState("Backend Developer")
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null)
  const [showDetails, setShowDetails] = useState(true)

  const handleNodeClick = (node: any) => {
    setSelectedNode(node)
  }

  const handleCloseModal = () => {
    setSelectedNode(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Career Goal Card */}
        <Card className="border-emerald-100 shadow-md bg-white mb-8 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-3 py-1 text-xs">
                    Career Path
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 text-xs">Technology</Badge>
                </div>

                <h1 className="text-3xl font-bold text-emerald-900">{career}</h1>

                <p className="text-gray-600 max-w-2xl">
                  A backend developer creates and maintains the server-side of web applications, focusing on databases,
                  server logic, APIs, and application architecture to ensure smooth functionality and performance.
                </p>

                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-700" />
                    <div>
                      <p className="text-sm text-gray-500">Estimated Time</p>
                      <p className="font-medium text-emerald-900">600-800 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-emerald-700" />
                    <div>
                      <p className="text-sm text-gray-500">Difficulty</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className={`h-2 w-2 rounded-full ${i < 4 ? "bg-emerald-500" : "bg-gray-200"}`} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-emerald-700" />
                    <div>
                      <p className="text-sm text-gray-500">Prerequisites</p>
                      <p className="font-medium text-emerald-900">Basic programming knowledge</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-emerald-700" />
                    <div>
                      <p className="text-sm text-gray-500">Career Level</p>
                      <p className="font-medium text-emerald-900">Entry to Senior</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-700">0%</p>
                    <p className="text-xs text-emerald-600">Completed</p>
                  </div>
                </div>
                <Progress 
                  value={0} 
                  className="w-32 h-2 bg-emerald-100 [&>div]:bg-emerald-500" 
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              <Button
                variant="ghost"
                className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 gap-2"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "Hide Details" : "Show Details"}
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${showDetails ? "rotate-180" : ""}`} />
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="gap-2 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            {showDetails && (
              <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium text-emerald-800 mb-3">What You'll Learn</h3>
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
                        <div className="rounded-full bg-emerald-100 p-1 mt-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
                        </div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-emerald-800 mb-3">Career Opportunities</h3>
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
                        <div className="rounded-full bg-emerald-100 p-1 mt-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
                        </div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Roadmap */}
        <Card className="border-emerald-100 shadow-md bg-white/80 backdrop-blur-sm">
          <div className="p-6">
            <BackendRoadmap onNodeClick={handleNodeClick} />
          </div>
        </Card>
      </div>

      {selectedNode && (
        <Dialog open={!!selectedNode} onOpenChange={handleCloseModal}>
          <DialogContent className="sm:max-w-[550px] border-emerald-100">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${selectedNode.iconBg}`}>
                  <selectedNode.icon className={`h-5 w-5 ${selectedNode.iconColor}`} />
                </div>
                <DialogTitle className="text-xl text-emerald-800">{selectedNode.title}</DialogTitle>
              </div>
              <DialogDescription className="text-gray-600 mt-2">{selectedNode.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {selectedNode.timeToComplete && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    <span>{selectedNode.timeToComplete}</span>
                  </div>
                )}

                {selectedNode.difficulty && (
                  <div className="flex items-center gap-2 text-sm">
                    <BarChart className="h-4 w-4 text-emerald-600" />
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full mx-0.5 ${
                            i < (selectedNode.difficulty ?? 0) ? "bg-emerald-500" : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <h4 className="text-sm font-medium text-emerald-700 mb-3">Recommended Resources</h4>
                <ul className="space-y-3">
                  {selectedNode.resources.map((resource, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
                    >
                      <div className="rounded-full bg-white p-1.5 mt-0.5 border border-emerald-200">
                        <div className="h-2 w-2 rounded-full bg-emerald-700" />
                      </div>
                      <div>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:underline font-medium"
                        >
                          {resource.title}
                        </a>
                        <p className="text-sm text-gray-600">{resource.source}</p>
                        {resource.description && <p className="text-xs text-gray-500 mt-1">{resource.description}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedNode.tips && (
                <div className="pt-2">
                  <h4 className="text-sm font-medium text-emerald-700 mb-2">Pro Tips</h4>
                  <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    {selectedNode.tips}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button className="bg-emerald-700 hover:bg-emerald-800">Mark as Complete</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Types
interface Resource {
  title: string
  url: string
  source: string
  description?: string
}

interface RoadmapNode {
  id: string
  title: string
  description: string
  resources: Resource[]
  icon: string | React.ElementType // Allow icon to be either a string or component
  iconColor: string
  iconBg: string
  timeToComplete?: string
  difficulty?: number
  tips?: string
}
