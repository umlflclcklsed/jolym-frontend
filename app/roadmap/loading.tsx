import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function RoadmapLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Career Goal Card Skeleton */}
        <Card className="border-emerald-100 dark:border-emerald-800 shadow-md bg-white dark:bg-gray-800 mb-8 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-4 w-full md:w-2/3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-24" />
                </div>

                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-20 w-full" />

                <div className="flex flex-wrap gap-6 pt-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-32 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <Skeleton className="w-32 h-32 rounded-full" />
                <Skeleton className="w-32 h-2" />
              </div>
            </div>
          </div>
        </Card>

        {/* Roadmap Skeleton */}
        <Card className="border-emerald-100 dark:border-emerald-800 shadow-md bg-white dark:bg-gray-800">
          <div className="p-6">
            {/* Phase navigation skeleton */}
            <div className="mb-8 overflow-x-auto pb-2">
              <div className="flex space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-28" />
                ))}
              </div>
            </div>

            {/* Phases skeleton */}
            <div className="space-y-12">
              {Array.from({ length: 3 }).map((_, phaseIndex) => (
                <div key={phaseIndex} className="relative">
                  {/* Phase header skeleton */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="h-8 w-64" />
                    </div>
                    <Skeleton className="h-4 w-full max-w-2xl ml-11" />
                  </div>

                  {/* Milestones skeleton */}
                  <div className="space-y-6 ml-4 pl-8">
                    {Array.from({ length: 2 }).map((_, milestoneIndex) => (
                      <div key={milestoneIndex}>
                        <Skeleton className="h-16 w-full rounded-lg" />
                      </div>
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
