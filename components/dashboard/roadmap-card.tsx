import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface RoadmapCardProps {
  roadmap: any
}

export default function RoadmapCard({ roadmap }: RoadmapCardProps) {
  const progressPercentage =
    roadmap.total_steps > 0 ? Math.round((roadmap.completed_steps / roadmap.total_steps) * 100) : 0

  return (
    <Link href={`/roadmap/${roadmap.id}`}>
      <Card
        className={cn(
          "card-3d border-gray-200 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 overflow-hidden transition-all duration-300",
          progressPercentage === 100 ? "bg-emerald-50/50 dark:bg-emerald-900/20" : "bg-white dark:bg-gray-950",
        )}
      >
        <div className={`h-2 ${getProgressColorClass(progressPercentage)}`}></div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100 mb-2 line-clamp-1">{roadmap.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">{roadmap.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{roadmap.total_steps} steps</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span>{roadmap.completed_steps} completed</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-medium text-emerald-700 dark:text-emerald-400">{progressPercentage}%</span>
            </div>
            <Progress
              value={progressPercentage}
              className="h-2 bg-gray-100 dark:bg-gray-800"
              indicatorClassName={getProgressColorClass(progressPercentage)}
            />
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center w-full">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {roadmap.completed_steps} of {roadmap.total_steps} steps completed
            </span>
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              {getProgressLabel(progressPercentage)}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

function getProgressColorClass(progress: number): string {
  if (progress >= 100) return "bg-emerald-500 dark:bg-emerald-400"
  if (progress >= 75) return "bg-emerald-400 dark:bg-emerald-500"
  if (progress >= 50) return "bg-emerald-300 dark:bg-emerald-600"
  if (progress >= 25) return "bg-emerald-200 dark:bg-emerald-700"
  return "bg-emerald-100 dark:bg-emerald-800"
}

function getProgressLabel(progress: number): string {
  if (progress >= 100) return "Completed"
  if (progress >= 75) return "Almost there"
  if (progress >= 50) return "Halfway"
  if (progress >= 25) return "In progress"
  if (progress > 0) return "Just started"
  return "Not started"
}
