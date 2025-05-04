"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { roadmapsAPI, goalsAPI, authAPI } from "@/lib/api"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import RoadmapCard from "@/components/dashboard/roadmap-card"
import GoalCard from "@/components/dashboard/goal-card"
import StatsOverview from "@/components/dashboard/stats-overview"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [roadmaps, setRoadmaps] = useState<any[]>([])
  const [goals, setGoals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch current user
        const userResponse = await authAPI.getCurrentUser()
        setUser(userResponse.data)

        // Fetch user's roadmaps
        const roadmapsResponse = await roadmapsAPI.getUserRoadmaps()
        setRoadmaps(roadmapsResponse.data)

        // Fetch user's goals
        const goalsResponse = await goalsAPI.getUserGoals()
        setGoals(goalsResponse.data)

        setError(null)
      } catch (err: any) {
        console.error("Error fetching dashboard data:", err)
        setError(err.response?.data?.message || "Failed to load dashboard data")

        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          router.push("/login")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [router])

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <DashboardHeader user={user} />

      <div className="container px-4 py-8 md:px-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <StatsOverview
          totalRoadmaps={roadmaps.length}
          completedRoadmaps={roadmaps.filter((r) => r.progress === 100).length}
          totalGoals={goals.length}
          completedGoals={goals.filter((g) => g.completed).length}
        />

        <Tabs defaultValue="roadmaps" className="mt-8">
          <TabsList className="mb-6">
            <TabsTrigger value="roadmaps">My Roadmaps</TabsTrigger>
            <TabsTrigger value="goals">My Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmaps">
            {roadmaps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmaps.map((roadmap) => (
                  <RoadmapCard key={roadmap.id} roadmap={roadmap} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No roadmaps yet"
                description="Create your first career roadmap to get started on your journey."
                actionLabel="Create Roadmap"
                actionHref="/roadmap/create"
              />
            )}
          </TabsContent>

          <TabsContent value="goals">
            {goals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No goals yet"
                description="Set your first goal to track your progress."
                actionLabel="Create Goal"
                actionHref="/goals/create"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="h-16 border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      <div className="container px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>

        <Skeleton className="h-10 w-48 mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string
  description: string
  actionLabel: string
  actionHref: string
}) {
  return (
    <Card className="border-dashed border-emerald-200 bg-emerald-50/50">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <h3 className="text-xl font-medium text-emerald-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 text-center max-w-md">{description}</p>
        <a
          href={actionHref}
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-md transition-colors"
        >
          {actionLabel}
        </a>
      </CardContent>
    </Card>
  )
}
