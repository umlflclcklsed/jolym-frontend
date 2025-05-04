"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, LogOut, Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PersonIcon, GearIcon, Cross2Icon } from "@radix-ui/react-icons"

interface DashboardHeaderProps {
  user: any
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    // Clear auth token
    localStorage.removeItem("auth_token")
    // Redirect to login
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-30 border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-emerald-700" />
            <span className="text-xl font-bold text-emerald-800">Jolym</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:text-emerald-700">
            Dashboard
          </Link>
          <Link href="/roadmap/explore" className="text-sm font-medium hover:text-emerald-700">
            Explore Roadmaps
          </Link>
          <Link href="/community" className="text-sm font-medium hover:text-emerald-700">
            Community
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  {user?.name?.charAt(0) || <PersonIcon className="h-4 w-4" />}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {user?.name && <p className="font-medium">{user.name}</p>}
                  {user?.email && <p className="text-sm text-gray-500">{user.email}</p>}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <PersonIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <GearIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <Cross2Icon className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col py-2">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/roadmap/explore"
              className="px-4 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Roadmaps
            </Link>
            <Link
              href="/community"
              className="px-4 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
