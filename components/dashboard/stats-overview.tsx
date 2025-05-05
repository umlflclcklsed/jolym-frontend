import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, CheckCircle, Target, Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsOverviewProps {
  totalRoadmaps: number
  completedRoadmaps: number
  totalSteps: number
  completedSteps: number
}

export default function StatsOverview({
  totalRoadmaps,
  completedRoadmaps,
  totalSteps,
  completedSteps,
}: StatsOverviewProps) {
  const stats = [
    {
      title: "Total Roadmaps",
      value: totalRoadmaps,
      icon: BookOpen,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      title: "Completed Roadmaps",
      value: completedRoadmaps,
      icon: CheckCircle,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      borderColor: "border-emerald-200 dark:border-emerald-800",
    },
    {
      title: "Total Steps",
      value: totalSteps,
      icon: Target,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      title: "Completed Steps",
      value: completedSteps,
      icon: Award,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
      borderColor: "border-amber-200 dark:border-amber-800",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={cn(
            "border-gray-200 dark:border-gray-800 hover:border-opacity-0 transition-all duration-300 overflow-hidden group",
            stat.borderColor,
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/30 dark:from-white/5 dark:to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{stat.value}</p>
              </div>
              <div
                className={`p-3 rounded-full ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
