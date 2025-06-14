"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Profession Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The profession you're looking for doesn't exist or has been removed.
      </p>
      <Button onClick={() => router.push('/professions')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Professions
      </Button>
    </div>
  )
}