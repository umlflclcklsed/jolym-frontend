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
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { PersonIcon, GearIcon, Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons"

interface DashboardHeaderProps {
  user: any
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const handleLogout = () => {
    // Clear auth token
    localStorage.removeItem("auth_token")
    // Redirect to login
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-all duration-300">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="relative">
              <MapPin className="h-6 w-6 text-emerald-700 dark:text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute -inset-1 bg-emerald-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </div>
            <span className="text-xl font-bold gradient-text">Jolym</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full hover:text-emerald-700 dark:hover:text-emerald-400"
          >
            Dashboard
          </Link>
          <Link
            href="/roadmap/explore"
            className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full hover:text-emerald-700 dark:hover:text-emerald-400"
          >
            Explore Roadmaps
          </Link>
          <Link
            href="/roadmap/create"
            className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full hover:text-emerald-700 dark:hover:text-emerald-400"
          >
            Create Roadmap
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            {searchOpen ? (
              <div className="absolute right-0 top-0 w-64 flex items-center">
                <Input
                  type="text"
                  placeholder="Search roadmaps..."
                  className="h-9 border-emerald-200 dark:border-emerald-800 focus:ring-emerald-500"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="text-gray-500 hover:text-emerald-700 dark:hover:text-emerald-400"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-500 hover:text-emerald-700 dark:hover:text-emerald-400"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full overflow-hidden group">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 transition-colors group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800">
                  {user?.name?.charAt(0) || <PersonIcon className="h-4 w-4" />}
                </div>
                <span className="absolute inset-0 rounded-full bg-emerald-500/20 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-emerald-100 dark:border-emerald-800">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {user?.name && <p className="font-medium">{user.name}</p>}
                  {user?.email && <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <PersonIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <GearIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-500 hover:text-emerald-700 dark:hover:text-emerald-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Cross2Icon className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t dark:border-gray-800 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col py-4 px-4 space-y-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
            <div className="px-4 py-2 mb-2">
              <Input
                type="text"
                placeholder="Search roadmaps..."
                className="h-9 border-emerald-200 dark:border-emerald-800 focus:ring-emerald-500"
              />
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/roadmap/explore"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Roadmaps
            </Link>
            <Link
              href="/roadmap/create"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Roadmap
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
