"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CheckCircle2, Clock, BookOpen, ExternalLink, Award, Lightbulb } from "lucide-react"
import { ChevronDownIcon } from "@radix-ui/react-icons"

interface Resource {
  id: string
  title: string
  url: string
  type: "article" | "video" | "course" | "book" | "tool"
  duration: string
  free: boolean
}

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  resources: Resource[]
}

interface Milestone {
  id: string
  title: string
  description: string
  tasks: Task[]
  completed: boolean
}

interface Phase {
  id: string
  title: string
  description: string
  completed: boolean
  milestones: {
    id: string
    title: string
    description: string
    completed: boolean
    tasks: {
      id: string
      title: string
      description: string
      completed: boolean
      resources: {
        id: string
        title: string
        url: string
        type: "article" | "video" | "course" | "book" | "tool"
        duration: string
        free: boolean
      }[]
    }[]
  }[]
}

interface RoadmapProps {
  roadmap: {
    id: string
    title: string
    description: string
    estimatedTime: string
    difficulty: number
    phases: Phase[]
  }
  onUpdateProgress: (phaseId: string, milestoneId: string, taskId: string, completed: boolean) => void
}

export default function MultiLevelRoadmap({ roadmap, onUpdateProgress }: RoadmapProps) {
  const [activePhase, setActivePhase] = useState<string | null>(roadmap.phases[0]?.id || null)
  const [activeMilestone, setActiveMilestone] = useState<string | null>(null)
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({})

  const phaseRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Calculate overall progress
  const totalTasks = roadmap.phases.reduce(
    (total, phase) =>
      total + phase.milestones.reduce((phaseTotal, milestone) => phaseTotal + milestone.tasks.length, 0),
    0,
  )

  const completedTasks = roadmap.phases.reduce(
    (total, phase) =>
      total +
      phase.milestones.reduce(
        (phaseTotal, milestone) => phaseTotal + milestone.tasks.filter((task) => task.completed).length,
        0,
      ),
    0,
  )

  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Handle task completion toggle
  const handleTaskToggle = (phaseId: string, milestoneId: string, taskId: string, completed: boolean) => {
    onUpdateProgress(phaseId, milestoneId, taskId, completed)
  }

  // Scroll to phase when active phase changes
  useEffect(() => {
    if (activePhase && phaseRefs.current[activePhase]) {
      phaseRefs.current[activePhase]?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [activePhase])

  // Toggle task expansion
  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }))
  }

  // Resource type icons
  const resourceTypeIcons = {
    article: BookOpen,
    video: ExternalLink,
    course: BookOpen,
    book: BookOpen,
    tool: ExternalLink,
  }

  return (
    <div className="relative">
      {/* Overall progress */}
      <Card className="mb-8 border-emerald-100 dark:border-emerald-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Your Progress</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {completedTasks} of {totalTasks} tasks completed ({progressPercentage}%)
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-gray-700 dark:text-gray-300">{roadmap.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-700 dark:text-gray-300 mr-1">Difficulty:</span>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      i < roadmap.difficulty ? "bg-emerald-500" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <Progress
            value={progressPercentage}
            className="h-2 bg-emerald-100 dark:bg-emerald-900/30 [&>div]:bg-emerald-500"
          />
        </CardContent>
      </Card>

      {/* Phase navigation */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {roadmap.phases.map((phase, index) => (
            <Button
              key={phase.id}
              variant={activePhase === phase.id ? "default" : "outline"}
              className={`
                ${activePhase === phase.id ? "bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700" : "border-gray-200 dark:border-gray-800"}
                ${phase.completed ? "border-emerald-200 dark:border-emerald-800" : ""}
                min-w-[120px] flex-shrink-0
              `}
              onClick={() => setActivePhase(phase.id)}
            >
              {phase.completed && <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />}
              <span>Phase {index + 1}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Phases and milestones */}
      <div className="space-y-12">
        {roadmap.phases.map((phase, phaseIndex) => (
          <div
            key={phase.id}
            ref={(el) => {
              phaseRefs.current[phase.id] = el;
              return undefined;
            }}
            className={`relative ${activePhase === phase.id ? "" : "opacity-70"}`}
          >
            {/* Phase header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 font-bold">
                  {phaseIndex + 1}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{phase.title}</h2>
                {phase.completed && (
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 ml-11">{phase.description}</p>
            </div>

            {/* Milestones */}
            <div className="space-y-6 ml-4 pl-8 border-l-2 border-emerald-100 dark:border-emerald-900/50">
              {phase.milestones.map((milestone, milestoneIndex) => (
                <div key={milestone.id}>
                  <Collapsible
                    open={activeMilestone === milestone.id}
                    onOpenChange={() => setActiveMilestone(activeMilestone === milestone.id ? null : milestone.id)}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 font-medium text-sm">
                              {phaseIndex + 1}.{milestoneIndex + 1}
                            </div>
                            {milestone.completed && (
                              <CheckCircle2 className="absolute -top-1 -right-1 h-3 w-3 text-emerald-500 dark:text-emerald-400" />
                            )}
                          </div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">{milestone.title}</h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {milestone.tasks.filter((task) => task.completed).length}/{milestone.tasks.length} tasks
                          </div>
                          <ChevronDownIcon
                            className={`h-5 w-5 text-gray-500 transition-transform ${activeMilestone === milestone.id ? "transform rotate-180" : ""}`}
                          />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30">
                        <p className="text-gray-600 dark:text-gray-400 mb-4 mt-4">{milestone.description}</p>

                        {/* Tasks */}
                        <div className="space-y-4">
                          {milestone.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                            >
                              <div className="p-4">
                                <div className="flex items-start gap-3">
                                  <Checkbox
                                    id={task.id}
                                    checked={task.completed}
                                    onCheckedChange={(checked) =>
                                      handleTaskToggle(phase.id, milestone.id, task.id, checked as boolean)
                                    }
                                    className="mt-1 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white data-[state=checked]:border-emerald-500"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <label
                                        htmlFor={task.id}
                                        className={`font-medium cursor-pointer ${task.completed ? "text-gray-500 dark:text-gray-400 line-through" : "text-gray-900 dark:text-gray-100"}`}
                                      >
                                        {task.title}
                                      </label>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleTaskExpansion(task.id)}
                                        className="h-8 px-2"
                                      >
                                        <ChevronDownIcon
                                          className={`h-4 w-4 transition-transform ${expandedTasks[task.id] ? "transform rotate-180" : ""}`}
                                        />
                                      </Button>
                                    </div>

                                    {expandedTasks[task.id] && (
                                      <AnimatePresence>
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3 }}
                                        >
                                          <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">
                                            {task.description}
                                          </p>

                                          {task.resources.length > 0 && (
                                            <div className="mt-3">
                                              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                                                Resources
                                              </h4>
                                              <div className="space-y-2">
                                                {task.resources.map((resource) => {
                                                  const IconComponent = resourceTypeIcons[resource.type]
                                                  return (
                                                    <a
                                                      key={resource.id}
                                                      href={resource.url}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                    >
                                                      <div className="p-1 rounded bg-emerald-100 dark:bg-emerald-900/50 mt-0.5">
                                                        <IconComponent className="h-3 w-3 text-emerald-700 dark:text-emerald-400" />
                                                      </div>
                                                      <div className="flex-1">
                                                        <div className="text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:underline">
                                                          {resource.title}
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-1">
                                                          <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {resource.type}
                                                          </span>
                                                          <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {resource.duration}
                                                          </span>
                                                          {resource.free && (
                                                            <Badge
                                                              variant="outline"
                                                              className="text-xs py-0 h-4 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                                                            >
                                                              Free
                                                            </Badge>
                                                          )}
                                                        </div>
                                                      </div>
                                                      <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                                    </a>
                                                  )
                                                })}
                                              </div>
                                            </div>
                                          )}

                                          <div className="mt-4 flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-100 dark:border-amber-900/30">
                                            <Lightbulb className="h-5 w-5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                            <div className="text-sm text-amber-800 dark:text-amber-300">
                                              <strong>Pro Tip:</strong>{" "}
                                              {task.completed
                                                ? "Great job completing this task! Move on to the next one to continue your progress."
                                                : "Focus on understanding the concepts rather than just completing the task. Take notes and practice regularly."}
                                            </div>
                                          </div>
                                        </motion.div>
                                      </AnimatePresence>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Milestone completion badge */}
                        {milestone.completed && (
                          <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-md border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-3">
                            <Award className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            <div>
                              <h4 className="font-medium text-emerald-800 dark:text-emerald-300">
                                Milestone Completed!
                              </h4>
                              <p className="text-sm text-emerald-700 dark:text-emerald-400">
                                You've completed all tasks in this milestone. Keep up the good work!
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>

            {/* Phase completion badge */}
            {phase.completed && (
              <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-4">
                <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                  <Award className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">
                    Phase {phaseIndex + 1} Completed!
                  </h3>
                  <p className="text-emerald-700 dark:text-emerald-400">
                    Congratulations on completing this phase! You're making great progress on your journey.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Roadmap completion */}
      {progressPercentage === 100 && (
        <div className="mt-12 p-8 bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-700 dark:to-emerald-900 rounded-lg text-white text-center">
          <div className="mb-4">
            <Award className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Roadmap Completed!</h2>
            <p className="text-emerald-100 max-w-lg mx-auto">
              Congratulations on completing your roadmap! You've mastered all the necessary skills and knowledge for
              your chosen career path.
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button className="bg-white text-emerald-700 hover:bg-gray-100">Download Certificate</Button>
            <Button variant="outline" className="border-white text-white hover:bg-emerald-600">
              Share Achievement
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
