"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Download,
  Share2,
  Clock,
  BookOpen,
  Target,
  Code,
  Database,
  Server,
  Globe,
  Lock,
  Cpu,
  Cloud,
  Layers,
  Zap,
  BarChartIcon,
  Wrench,
  FileCode,
  HardDrive,
  Network,
  Workflow,
  CheckCircle2,
  Palette,
  PenTool,
  LineChart,
  Briefcase,
  Building,
  Users,
  Heart,
  Microscope,
  Leaf,
  Music,
  Camera,
  Film,
  Lightbulb,
  DollarSign,
  TrendingUp,
  Smartphone,
  Shield,
  Truck,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { roadmapsAPI } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import CareerRoadmap from "@/components/career-roadmap"
import type { RoadmapData, RoadmapNode } from "@/lib/groq-service"
import { ChevronDownIcon, RocketIcon, GearIcon } from "@radix-ui/react-icons"

export default function RoadmapPage() {
  const params = useParams()
  const roadmapId = params.id as string

  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null)
  const [showDetails, setShowDetails] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true)
        const response = await roadmapsAPI.getRoadmapById(roadmapId)
        setRoadmap(response.data)

        // Get user progress for this roadmap (if available)
        setProgress(response.data.userProgress || 0)

        setError(null)
      } catch (err: any) {
        console.error("Error fetching roadmap:", err)
        setError(err.response?.data?.message || "Failed to load roadmap")
      } finally {
        setLoading(false)
      }
    }

    fetchRoadmap()
  }, [roadmapId])

  const handleNodeClick = (node: RoadmapNode) => {
    setSelectedNode(node)
  }

  const handleCloseModal = () => {
    setSelectedNode(null)
  }

  if (loading) {
    return <RoadmapSkeleton />
  }

  if (error || !roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <Card className="border-red-100 bg-red-50 p-6">
            <h1 className="text-xl font-medium text-red-800 mb-2">Error Loading Roadmap</h1>
            <p className="text-red-700">{error || "Roadmap not found"}</p>
            <Button
              className="mt-4 bg-emerald-700 hover:bg-emerald-800"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    )
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
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 text-xs">
                    {getCategoryBadge(roadmap.title)}
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold text-emerald-900">{roadmap.title}</h1>

                <p className="text-gray-600 max-w-2xl">{roadmap.description}</p>

                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-700" />
                    <div>
                      <p className="text-sm text-gray-500">Estimated Time</p>
                      <p className="font-medium text-emerald-900">{roadmap.estimatedHours} hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <BarChartIcon className="h-5 w-5 text-emerald-700" />
                    <div>
                      <p className="text-sm text-gray-500">Difficulty</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-2 rounded-full ${i < roadmap.difficulty ? "bg-emerald-500" : "bg-gray-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-emerald-700" />
                    <div>
                      <p className="text-sm text-gray-500">Prerequisites</p>
                      <p className="font-medium text-emerald-900">{roadmap.prerequisites?.join(", ") || "None"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-emerald-700" />
                    <div>
                      <p className="text-sm text-gray-500">Career Level</p>
                      <p className="font-medium text-emerald-900">{roadmap.careerLevel}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-700">{progress}%</p>
                    <p className="text-xs text-emerald-600">Completed</p>
                  </div>
                </div>
                <Progress value={progress} className="w-32 h-2 bg-emerald-100" indicatorClassName="bg-emerald-500" />
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
                    {roadmap.sections
                      .flatMap((section) => section.nodes.slice(0, 2).map((node) => node.title))
                      .slice(0, 6)
                      .map((item, i) => (
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
                    {generateCareerOpportunities(roadmap.title).map((item, i) => (
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
            <CareerRoadmap roadmapData={roadmap} onNodeClick={handleNodeClick} />
          </div>
        </Card>
      </div>

      {selectedNode && (
        <Dialog open={!!selectedNode} onOpenChange={handleCloseModal}>
          <DialogContent className="sm:max-w-[550px] border-emerald-100">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${selectedNode.iconBg}`}>
                  <DynamicIcon iconName={selectedNode.icon} className={`h-5 w-5 ${selectedNode.iconColor}`} />
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
                    <BarChartIcon className="h-4 w-4 text-emerald-600" />
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full mx-0.5 ${
                            i < selectedNode.difficulty ? "bg-emerald-500" : "bg-gray-200"
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

function RoadmapSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Card className="border-emerald-100 shadow-md bg-white mb-8 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-4 w-full">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <div className="flex flex-wrap gap-6 pt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-16 w-32" />
                  ))}
                </div>
              </div>
              <Skeleton className="w-32 h-32 rounded-full" />
            </div>
          </div>
        </Card>

        <Card className="border-emerald-100 shadow-md bg-white/80 backdrop-blur-sm">
          <div className="p-6">
            <div className="space-y-12">
              {[1, 2, 3].map((section) => (
                <div key={section} className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((node) => (
                      <Skeleton key={node} className="h-24 w-full rounded-lg" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Dynamic icon component to render icons based on string name
function DynamicIcon({ iconName, className }: { iconName: string; className?: string }) {
  const icons = {
    Code,
    Database,
    Server,
    Globe,
    Terminal,
    Lock,
    Cpu,
    Cloud,
    Layers,
    Zap,
    BarChartIcon,
    Wrench,
    FileCode,
    Settings,
    HardDrive,
    Network,
    Workflow,
    CheckCircle2,
    Palette,
    PenTool,
    LineChart,
    BookOpen,
    Briefcase,
    Building,
    Users,
    Heart,
    Microscope,
    Leaf,
    Music,
    Camera,
    Film,
    Lightbulb,
    DollarSign,
    TrendingUp,
    Smartphone,
    Shield,
    Truck,
  }

  // @ts-ignore - Dynamic access
  const IconComponent = icons[iconName] || Briefcase // Default to Briefcase if icon not found

  return <IconComponent className={className} />
}

// Helper function to determine category badge based on career title
function getCategoryBadge(title: string): string {
  const lowerTitle = title.toLowerCase()

  if (lowerTitle.includes("developer") || lowerTitle.includes("engineer") || lowerTitle.includes("programmer")) {
    return "Technology"
  }
  if (lowerTitle.includes("design") || lowerTitle.includes("ux") || lowerTitle.includes("ui")) {
    return "Design"
  }
  if (lowerTitle.includes("market") || lowerTitle.includes("sales") || lowerTitle.includes("business")) {
    return "Business"
  }
  if (lowerTitle.includes("doctor") || lowerTitle.includes("nurse") || lowerTitle.includes("health")) {
    return "Healthcare"
  }
  if (lowerTitle.includes("teach") || lowerTitle.includes("professor") || lowerTitle.includes("education")) {
    return "Education"
  }
  if (lowerTitle.includes("finance") || lowerTitle.includes("account") || lowerTitle.includes("banking")) {
    return "Finance"
  }

  return "Professional"
}

// Helper function to generate career opportunities based on the roadmap title
function generateCareerOpportunities(title: string): string[] {
  const baseSalary = {
    entry: "$60,000 - $80,000",
    mid: "$80,000 - $120,000",
    senior: "$120,000 - $160,000",
    lead: "$140,000 - $180,000",
    manager: "$150,000 - $200,000",
    director: "$180,000 - $250,000",
  }

  const careerTitle = title.replace(/becoming a |how to become a /gi, "").trim()

  return [
    `${careerTitle} (${baseSalary.entry})`,
    `Senior ${careerTitle} (${baseSalary.senior})`,
    `Lead ${careerTitle} (${baseSalary.lead})`,
    `${careerTitle} Manager (${baseSalary.manager})`,
    `${careerTitle} Director (${baseSalary.director})`,
    `Consultant ${careerTitle} (${baseSalary.senior})`,
  ]
}
