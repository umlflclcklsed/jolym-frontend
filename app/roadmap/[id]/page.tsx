"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
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
  Truck
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { dashboardAPI } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import MapRoadmap from "@/components/map-roadmap"
import { ChevronDownIcon, RocketIcon, GearIcon, ReloadIcon } from "@radix-ui/react-icons"

export default function RoadmapPage() {
  const params = useParams()
  const roadmapId = Number.parseInt(params.id as string)

  const [roadmap, setRoadmap] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStep, setSelectedStep] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(true)
  const [updatingProgress, setUpdatingProgress] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "map">("map")

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true)
        const response = await dashboardAPI.getRoadmapDetails(roadmapId)
        setRoadmap(response.data)
        setError(null)
      } catch (err: any) {
        console.error("Error fetching roadmap:", err)
        setError(err.response?.data?.detail || "Failed to load roadmap")
      } finally {
        setLoading(false)
      }
    }

    if (roadmapId) {
      fetchRoadmap()
    }
  }, [roadmapId])

  const handleStepClick = (step: any) => {
    setSelectedStep(step)
  }

  const handleCloseModal = () => {
    setSelectedStep(null)
  }

  const handleToggleStepCompletion = async (step: any) => {
    if (updatingProgress) return

    try {
      setUpdatingProgress(true)
      const newCompletionStatus = step.progress ? !step.progress.completed : true

      await dashboardAPI.updateStepProgress(roadmapId, step.id, newCompletionStatus)

      // Update local state
      setRoadmap((prevRoadmap) => {
        const updatedSteps = prevRoadmap.steps.map((s) => {
          if (s.id === step.id) {
            return {
              ...s,
              progress: {
                ...s.progress,
                completed: newCompletionStatus,
                completed_at: newCompletionStatus ? new Date().toISOString() : null,
              },
            }
          }
          return s
        })

        return {
          ...prevRoadmap,
          steps: updatedSteps,
        }
      })

      // If we're in the modal, update the selected step too
      if (selectedStep && selectedStep.id === step.id) {
        setSelectedStep({
          ...selectedStep,
          progress: {
            ...selectedStep.progress,
            completed: newCompletionStatus,
            completed_at: newCompletionStatus ? new Date().toISOString() : null,
          },
        })
      }
    } catch (err) {
      console.error("Error updating step progress:", err)
    } finally {
      setUpdatingProgress(false)
    }
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

  const completedSteps = roadmap.steps.filter((step) => step.progress?.completed).length
  const totalSteps = roadmap.steps.length
  const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0

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
                </div>

                <h1 className="text-3xl font-bold text-emerald-900">{roadmap.name}</h1>

                <p className="text-gray-600 max-w-2xl">{roadmap.description}</p>

                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-emerald-700" />
                    <div>
                      <p className="text-sm text-gray-500">Total Steps</p>
                      <p className="font-medium text-emerald-900">{totalSteps} steps</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                    <div>
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="font-medium text-emerald-900">{completedSteps} steps</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-700">{progressPercentage}%</p>
                    <p className="text-xs text-emerald-600">Completed</p>
                  </div>
                </div>
                <Progress
                  value={progressPercentage}
                  className="w-32 h-2 bg-emerald-100"
                  indicatorClassName="bg-emerald-500"
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
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Roadmap Map View */}
        <div className="mb-8">
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              className="gap-2 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-800 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400"
              onClick={() => setViewMode(viewMode === "map" ? "list" : "map")}
            >
              {viewMode === "map" ? "Switch to List View" : "Switch to Map View"}
            </Button>
          </div>

          {viewMode === "map" ? (
            <MapRoadmap
              roadmapData={{
                title: roadmap.name,
                description: roadmap.description,
                estimatedHours: 0,
                difficulty: 0,
                prerequisites: [],
                careerLevel: "",
                sections: [
                  {
                    id: "main-section",
                    title: roadmap.name,
                    description: roadmap.description,
                    nodes: roadmap.steps.map((step) => ({
                      ...step,
                      id: step.id,
                      title: step.title,
                      description: step.description,
                      icon: step.icon || "Code",
                      iconColor: step.icon_color || "text-emerald-600",
                      iconBg: step.icon_bg || "bg-emerald-100",
                      timeToComplete: step.time_to_complete || "",
                      difficulty: step.difficulty || 3,
                      resources: step.resources || [],
                      tips: step.tips || "",
                    })),
                  },
                ],
              }}
              onNodeClick={handleStepClick}
            />
          ) : (
            <Card className="border-emerald-100 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <div className="p-6">
                <div className="space-y-8">
                  {roadmap.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`
                        relative flex items-center gap-4 p-4 rounded-lg border 
                        ${step.progress?.completed ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/30" : "border-emerald-100 bg-white dark:border-gray-800 dark:bg-gray-800/50"} 
                        shadow-sm hover:shadow-md transition-all cursor-pointer
                      `}
                      onClick={() => handleStepClick(step)}
                    >
                      <div className={`p-3 rounded-lg ${step.icon_bg}`}>
                        <DynamicIcon iconName={step.icon} className={`h-5 w-5 ${step.icon_color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-emerald-900 dark:text-emerald-100">{step.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{step.description}</p>
                      </div>
                      {step.progress?.completed && (
                        <Badge
                          variant="outline"
                          className="bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-100 dark:border-emerald-700"
                        >
                          Completed
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {selectedStep && (
        <Dialog open={!!selectedStep} onOpenChange={handleCloseModal}>
          <DialogContent className="sm:max-w-[550px] border-emerald-100">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${selectedStep.icon_bg}`}>
                  <DynamicIcon iconName={selectedStep.icon} className={`h-5 w-5 ${selectedStep.icon_color}`} />
                </div>
                <DialogTitle className="text-xl text-emerald-800">{selectedStep.title}</DialogTitle>
              </div>
              <DialogDescription className="text-gray-600 mt-2">{selectedStep.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {selectedStep.time_to_complete && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    <span>{selectedStep.time_to_complete}</span>
                  </div>
                )}

                {selectedStep.difficulty && (
                  <div className="flex items-center gap-2 text-sm">
                    <BarChartIcon className="h-4 w-4 text-emerald-600" />
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full mx-0.5 ${
                            i < selectedStep.difficulty ? "bg-emerald-500" : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedStep.resources && selectedStep.resources.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-sm font-medium text-emerald-700 mb-3">Recommended Resources</h4>
                  <ul className="space-y-3">
                    {selectedStep.resources.map((resource, index) => (
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
              )}

              {selectedStep.tips && (
                <div className="pt-2">
                  <h4 className="text-sm font-medium text-emerald-700 mb-2">Pro Tips</h4>
                  <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    {selectedStep.tips}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                className={
                  selectedStep.progress?.completed
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "bg-emerald-700 hover:bg-emerald-800"
                }
                onClick={() => handleToggleStepCompletion(selectedStep)}
                disabled={updatingProgress}
              >
                {updatingProgress ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : selectedStep.progress?.completed ? (
                  "Mark as Incomplete"
                ) : (
                  "Mark as Complete"
                )}
              </Button>
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
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((node) => (
                <Skeleton key={node} className="h-24 w-full rounded-lg" />
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
    BarChart: BarChartIcon,
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
