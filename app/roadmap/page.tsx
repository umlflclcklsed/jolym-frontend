"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Share2, Clock, Filter, RefreshCw, CheckCircle2 } from "lucide-react"
import RoadmapGraph from "@/components/roadmap-graph"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen } from "lucide-react"
import { CalendarIcon } from "@radix-ui/react-icons"

export default function RoadmapPage() {
  const searchParams = useSearchParams()
  const [career, setCareer] = useState("AI Researcher")
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null)
  const [progress, setProgress] = useState(0)
  const [completedNodes, setCompletedNodes] = useState<string[]>([])
  const [currentDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  )

  useEffect(() => {
    const careerParam = searchParams.get("career")
    if (careerParam) {
      setCareer(careerParam)
    }
  }, [searchParams])

  const handleNodeClick = (node: RoadmapNode) => {
    setSelectedNode(node)
  }

  const handleCloseModal = () => {
    setSelectedNode(null)
  }

  const handleMarkCompleted = (nodeId: string) => {
    const newCompletedNodes = [...completedNodes]

    if (completedNodes.includes(nodeId)) {
      // Remove from completed
      const index = newCompletedNodes.indexOf(nodeId)
      newCompletedNodes.splice(index, 1)
    } else {
      // Add to completed
      newCompletedNodes.push(nodeId)
    }

    setCompletedNodes(newCompletedNodes)
    setProgress(Math.round((newCompletedNodes.length / 5) * 100))
    setSelectedNode(null)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <motion.div
        className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1B5E20]">Roadmap to become {career}</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center text-sm text-gray-600 gap-1">
              <CalendarIcon className="h-4 w-4 text-[#66BB6A]" />
              <span>Generated on {currentDate}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 gap-1">
              <Clock className="h-4 w-4 text-[#66BB6A]" />
              <span>~1-2 years</span>
            </div>
            <Badge className="bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9]">6 stages</Badge>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-[#A5D6A7] text-[#2E7D32] hover:bg-[#E8F5E9]">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="gap-2 border-[#A5D6A7] text-[#2E7D32] hover:bg-[#E8F5E9]">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="gap-2 border-[#A5D6A7] text-[#2E7D32] hover:bg-[#E8F5E9]">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-[#A5D6A7] shadow-md rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[600px] w-full bg-white">
                <RoadmapGraph onNodeClick={handleNodeClick} completedNodes={completedNodes} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-[#A5D6A7]">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#1B5E20] mb-2">Your Progress</h3>
                <Progress value={progress} className="h-2 bg-[#E8F5E9]" indicatorClassName="bg-[#2E7D32]" />
                <p className="text-sm text-gray-600 mt-2">{progress}% completed</p>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full gap-2 border-[#A5D6A7] text-[#2E7D32] hover:bg-[#E8F5E9]">
                  <RefreshCw className="h-4 w-4" />
                  <span>Regenerate Roadmap</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#A5D6A7]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">Difficulty Levels</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-300"></div>
                  <span className="text-sm text-gray-600">Beginner</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">Intermediate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-700"></div>
                  <span className="text-sm text-gray-600">Advanced</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#A5D6A7]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-[#E8F5E9] p-1 mt-0.5 flex-shrink-0">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#2E7D32]"></div>
                  </div>
                  <span>Click on any node to see detailed information and resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-[#E8F5E9] p-1 mt-0.5 flex-shrink-0">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#2E7D32]"></div>
                  </div>
                  <span>Mark steps as completed to track your progress</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-[#E8F5E9] p-1 mt-0.5 flex-shrink-0">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#2E7D32]"></div>
                  </div>
                  <span>Export your roadmap to PDF or share it with others</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {selectedNode && (
        <Dialog open={!!selectedNode} onOpenChange={handleCloseModal}>
          <DialogContent className="sm:max-w-[550px] border-[#A5D6A7] p-0 overflow-hidden">
            <div className="bg-[#E8F5E9] px-6 py-4">
              <DialogHeader>
                <DialogTitle className="text-[#1B5E20] text-xl">{selectedNode.title}</DialogTitle>
                <DialogDescription className="text-gray-700">{selectedNode.description}</DialogDescription>
              </DialogHeader>
            </div>

            <div className="px-6 py-4 space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-[#2E7D32] flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Recommended Resources
                </h4>
                <ul className="space-y-4">
                  {selectedNode.resources.map((resource, index) => (
                    <li key={index} className="flex items-start gap-3 bg-[#F9FDF9] p-3 rounded-lg">
                      <div className="rounded-full bg-[#E8F5E9] p-1.5 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-[#2E7D32]"></div>
                      </div>
                      <div>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2E7D32] hover:underline font-medium"
                        >
                          {resource.title}
                        </a>
                        <p className="text-sm text-gray-600">{resource.source}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  className={`gap-2 ${
                    completedNodes.includes(selectedNode.id)
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : "bg-[#2E7D32] hover:bg-[#1B5E20]"
                  }`}
                  onClick={() => handleMarkCompleted(selectedNode.id)}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{completedNodes.includes(selectedNode.id) ? "Mark as Incomplete" : "Mark as Completed"}</span>
                </Button>
              </div>
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
}

interface RoadmapNode {
  id: string
  title: string
  description: string
  resources: Resource[]
}
