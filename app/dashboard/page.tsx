"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { dashboardAPI } from "@/lib/api"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import RoadmapCard from "@/components/dashboard/roadmap-card"
import StatsOverview from "@/components/dashboard/stats-overview"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [roadmaps, setRoadmaps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch user dashboard data
        const dashboardResponse = await dashboardAPI.getUserDashboard()
        const dashboardData = dashboardResponse.data

        // Set roadmaps from the dashboard data
        setRoadmaps(dashboardData.tracked_roadmaps || [])

        setError(null)
      } catch (err: any) {
        console.error("Error fetching dashboard data:", err)

        if (err.response?.status === 401) {
          // If unauthorized, redirect to login
          router.push("/login")
        } else {
          setError(err.response?.data?.detail || "Failed to load dashboard data")
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
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <StatsOverview
          totalRoadmaps={roadmaps.length}
          completedRoadmaps={roadmaps.filter((r) => r.completed_steps === r.total_steps && r.total_steps > 0).length}
          totalSteps={roadmaps.reduce((acc, r) => acc + r.total_steps, 0)}
          completedSteps={roadmaps.reduce((acc, r) => acc + r.completed_steps, 0)}
        />

        <Tabs defaultValue="roadmaps" className="mt-8">
          <TabsList className="mb-6">
            <TabsTrigger value="roadmaps">My Roadmaps</TabsTrigger>
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
