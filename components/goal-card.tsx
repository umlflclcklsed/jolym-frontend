"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock } from "lucide-react"
import { goalsAPI } from "@/lib/api"
import { CalendarIcon } from "@radix-ui/react-icons"

interface GoalCardProps {
  goal: any
}

export default function GoalCard({ goal }: GoalCardProps) {
  const [isCompleted, setIsCompleted] = useState(goal.completed)
  const [isUpdating, setIsUpdating] = useState(false)

  const toggleCompletion = async () => {
    try {
      setIsUpdating(true)
      const newStatus = !isCompleted
      await goalsAPI.updateGoalProgress(goal.id, newStatus ? 100 : 0)
      setIsCompleted(newStatus)
    } catch (error) {
      console.error("Error updating goal:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const daysRemaining = getDaysRemaining(goal.dueDate)
  const isOverdue = daysRemaining < 0 && !isCompleted

  return (
    <Card
      className={`border-emerald-100 hover:shadow-md transition-shadow ${
        isCompleted ? "bg-emerald-50/50" : isOverdue ? "bg-red-50/50" : ""
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={toggleCompletion}
            disabled={isUpdating}
            className={`mt-1 ${isCompleted ? "bg-emerald-500 text-white border-emerald-500" : ""}`}
          />
          <div className="flex-1">
            <h3
              className={`font-medium text-lg mb-1 ${
                isCompleted
                  ? "text-emerald-700 line-through opacity-70"
                  : isOverdue
                    ? "text-red-700"
                    : "text-emerald-900"
              }`}
            >
              {goal.title}
            </h3>
            <p
              className={`text-sm mb-3 ${
                isCompleted ? "text-gray-500 line-through opacity-70" : isOverdue ? "text-red-600" : "text-gray-600"
              }`}
            >
              {goal.description}
            </p>

            <div className="flex flex-wrap gap-3 text-xs">
              {goal.dueDate && (
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                    isOverdue ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <CalendarIcon className="h-3 w-3" />
                  <span>{formatDate(goal.dueDate)}</span>
                  {daysRemaining > 0 && <span>({daysRemaining} days left)</span>}
                  {daysRemaining === 0 && <span>(Due today)</span>}
                  {daysRemaining < 0 && <span>(Overdue)</span>}
                </div>
              )}

              {goal.estimatedHours && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                  <Clock className="h-3 w-3" />
                  <span>{goal.estimatedHours} hours</span>
                </div>
              )}

              {goal.category && (
                <div className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">{goal.category}</div>
              )}
            </div>
          </div>
        </div>

        {goal.progress !== undefined && !isCompleted && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-emerald-700">{goal.progress}%</span>
            </div>
            <Progress
              value={goal.progress}
              className={`h-1.5 bg-emerald-100 ${isOverdue ? "[&>div]:bg-red-500" : "[&>div]:bg-emerald-500"}`}
            />
          </div>
        )}
      </CardContent>

      {goal.relatedRoadmap && (
        <CardFooter className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          <div className="w-full">
            <span className="text-xs text-gray-500">Related to roadmap:</span>
            <a
              href={`/roadmap/${goal.relatedRoadmap.id}`}
              className="block text-sm font-medium text-emerald-700 hover:underline"
            >
              {goal.relatedRoadmap.title}
            </a>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

function getDaysRemaining(dateString: string): number {
  if (!dateString) return 0

  const dueDate = new Date(dateString)
  const today = new Date()

  // Reset time part for accurate day calculation
  dueDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}
