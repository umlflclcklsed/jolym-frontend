import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, CheckCircle, Target, Award } from "lucide-react"

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
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Completed Roadmaps",
      value: completedRoadmaps,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Total Steps",
      value: totalSteps,
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Completed Steps",
      value: completedSteps,
      icon: Award,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-emerald-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-emerald-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
