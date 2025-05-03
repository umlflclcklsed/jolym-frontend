"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-[#2E7D32]" />
          <span className="text-xl font-bold text-[#2E7D32]">Jolym</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${isActive("/") ? "text-[#2E7D32]" : "text-gray-600 hover:text-[#2E7D32]"}`}
          >
            Home
          </Link>
          <Link
            href="/roadmaps"
            className={`text-sm font-medium transition-colors ${isActive("/roadmaps") ? "text-[#2E7D32]" : "text-gray-600 hover:text-[#2E7D32]"}`}
          >
            Roadmaps
          </Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="outline" className="text-[#2E7D32] border-[#2E7D32] hover:bg-[#A5D6A7]/20">
              Login
            </Button>
          </Link>
          <Link href="/register" className="hidden md:block">
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20]">Register</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
