"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { dashboardAPI } from "@/lib/api"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import RoadmapCard from "@/components/dashboard/roadmap-card"
import StatsOverview from "@/components/dashboard/stats-overview"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ExclamationTriangleIcon, PlusIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [roadmaps, setRoadmaps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredRoadmaps, setFilteredRoadmaps] = useState<any[]>([])

  // Refs for animation
  const statsRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const roadmapsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch user dashboard data
        const dashboardResponse = await dashboardAPI.getUserDashboard()
        const dashboardData = dashboardResponse.data

        // Set roadmaps from the dashboard data
        setRoadmaps(dashboardData.tracked_roadmaps || [])
        setFilteredRoadmaps(dashboardData.tracked_roadmaps || [])

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

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRoadmaps(roadmaps)
    } else {
      const filtered = roadmaps.filter(
        (roadmap) =>
          roadmap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          roadmap.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredRoadmaps(filtered)
    }
  }, [searchQuery, roadmaps])

  // Scroll animations
  useEffect(() => {
    if (loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (statsRef.current) observer.observe(statsRef.current)
    if (tabsRef.current) observer.observe(tabsRef.current)
    if (roadmapsRef.current) observer.observe(roadmapsRef.current)

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current)
      if (tabsRef.current) observer.unobserve(tabsRef.current)
      if (roadmapsRef.current) observer.unobserve(roadmapsRef.current)
    }
  }, [loading])

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      <DashboardHeader user={user} />

      <div className="container px-4 py-8 md:px-6">
        {error && (
          <Alert variant="destructive" className="mb-6 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/30">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div ref={statsRef} className="fade-in-up">
          <StatsOverview
            totalRoadmaps={roadmaps.length}
            completedRoadmaps={roadmaps.filter((r) => r.completed_steps === r.total_steps && r.total_steps > 0).length}
            totalSteps={roadmaps.reduce((acc, r) => acc + r.total_steps, 0)}
            completedSteps={roadmaps.reduce((acc, r) => acc + r.completed_steps, 0)}
          />
        </div>

        <div ref={tabsRef} className="mt-8 fade-in-up" style={{ transitionDelay: "200ms" }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <Tabs defaultValue="roadmaps" className="w-full">
              <TabsList className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
                <TabsTrigger
                  value="roadmaps"
                  className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400"
                >
                  My Roadmaps
                </TabsTrigger>
                <TabsTrigger
                  value="recent"
                  className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400"
                >
                  Recent Activity
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-4 mt-6">
                <div className="relative flex-1 max-w-md">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search roadmaps..."
                    className="pl-10 border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Link href="/roadmap/create">
                  <Button className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-all duration-300">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    New Roadmap
                  </Button>
                </Link>
              </div>

              <div ref={roadmapsRef} className="fade-in-up" style={{ transitionDelay: "400ms" }}>
                <TabsContent value="roadmaps" className="mt-6">
                  {filteredRoadmaps.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredRoadmaps.map((roadmap) => (
                        <RoadmapCard key={roadmap.id} roadmap={roadmap} />
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <Card className="border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No results found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
                          We couldn't find any roadmaps matching "{searchQuery}"
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setSearchQuery("")}
                          className="border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                        >
                          Clear search
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <EmptyState
                      title="No roadmaps yet"
                      description="Create your first career roadmap to get started on your journey."
                      actionLabel="Create Roadmap"
                      actionHref="/roadmap/create"
                    />
                  )}
                </TabsContent>

                <TabsContent value="recent">
                  <Card className="border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Coming Soon</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                        We're working on activity tracking to help you monitor your progress.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <div className="h-16 border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Skeleton className="h-8 w-24" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg animate-pulse" />
          ))}
        </div>

        <Skeleton className="h-10 w-48 mb-6" />

        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-10 flex-1 max-w-md" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="relative overflow-hidden rounded-lg">
              <Skeleton className="h-64 w-full rounded-lg" />
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
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
    <Card className="border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-4">
          <PlusIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">{description}</p>
        <Link href={actionHref}>
          <Button className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-all duration-300">
            {actionLabel}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
