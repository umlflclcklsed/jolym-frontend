import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, BarChart } from "lucide-react"

interface RoadmapCardProps {
  roadmap: any
}

export default function RoadmapCard({ roadmap }: RoadmapCardProps) {
  return (
    <Card className="border-emerald-100 hover:shadow-md transition-shadow overflow-hidden">
      <Link href={`/roadmap/${roadmap.id}`}>
        <div className={`h-2 ${getProgressColorClass(roadmap.progress)}`}></div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-lg text-emerald-900 mb-2">{roadmap.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{roadmap.description}</p>
            </div>
            <div className="bg-emerald-50 text-emerald-700 text-xs font-medium px-2 py-1 rounded">
              {roadmap.category || getCategoryFromTitle(roadmap.title)}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{roadmap.estimatedHours} hours</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full mx-0.5 ${
                      i < roadmap.difficulty ? "bg-emerald-500" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-emerald-700">{roadmap.progress}%</span>
            </div>
            <Progress
              value={roadmap.progress}
              className="h-2 bg-emerald-100"
              indicatorClassName={getProgressColorClass(roadmap.progress)}
            />
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-between items-center w-full">
            <span className="text-xs text-gray-500">Last updated: {formatDate(roadmap.updatedAt)}</span>
            <span className="text-xs font-medium text-emerald-700">{getProgressLabel(roadmap.progress)}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

function getProgressColorClass(progress: number): string {
  if (progress >= 100) return "bg-emerald-500"
  if (progress >= 75) return "bg-emerald-400"
  if (progress >= 50) return "bg-emerald-300"
  if (progress >= 25) return "bg-emerald-200"
  return "bg-emerald-100"
}

function getProgressLabel(progress: number): string {
  if (progress >= 100) return "Completed"
  if (progress >= 75) return "Almost there"
  if (progress >= 50) return "Halfway"
  if (progress >= 25) return "In progress"
  if (progress > 0) return "Just started"
  return "Not started"
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function getCategoryFromTitle(title: string): string {
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
