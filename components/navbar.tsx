"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin, Menu, X, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("auth_token")
    setIsLoggedIn(!!token)

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    setIsLoggedIn(false)
    router.push("/")
  }

  // Check if we're on the dashboard page to avoid double navbar
  const isDashboardPage = pathname?.startsWith("/dashboard")

  if (isDashboardPage) {
    return null
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "navbar-blur py-2" : "bg-transparent py-4 border-transparent",
      )}
    >
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <MapPin className="h-6 w-6 text-emerald-700 dark:text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute -inset-1 bg-emerald-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </div>
          <span className="text-xl font-bold gradient-text">Jolym</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full",
              pathname === "/"
                ? "text-emerald-700 dark:text-emerald-400 after:w-full"
                : "hover:text-emerald-700 dark:hover:text-emerald-400",
            )}
          >
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full",
                  pathname === "/dashboard"
                    ? "text-emerald-700 dark:text-emerald-400 after:w-full"
                    : "hover:text-emerald-700 dark:hover:text-emerald-400",
                )}
              >
                Dashboard
              </Link>
              <Link
                href="/roadmap/create"
                className={cn(
                  "text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full",
                  pathname === "/roadmap/create"
                    ? "text-emerald-700 dark:text-emerald-400 after:w-full"
                    : "hover:text-emerald-700 dark:hover:text-emerald-400",
                )}
              >
                Create Roadmap
              </Link>
              <Link
                href="/profile"
                className={cn(
                  "text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full",
                  pathname === "/profile"
                    ? "text-emerald-700 dark:text-emerald-400 after:w-full"
                    : "hover:text-emerald-700 dark:hover:text-emerald-400",
                )}
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/features"
                className={cn(
                  "text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full",
                  pathname === "/features"
                    ? "text-emerald-700 dark:text-emerald-400 after:w-full"
                    : "hover:text-emerald-700 dark:hover:text-emerald-400",
                )}
              >
                Features
              </Link>
              <Link
                href="/#testimonials"
                className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full hover:text-emerald-700 dark:hover:text-emerald-400"
              >
                Testimonials
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full overflow-hidden group">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 transition-colors group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="absolute inset-0 rounded-full bg-emerald-500/20 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-emerald-100 dark:border-emerald-800">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 transition-all duration-300"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register" className="hidden md:block">
                <Button className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-all duration-300">
                  Register
                </Button>
              </Link>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t dark:border-gray-800 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col py-4 px-4 space-y-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/roadmap/create"
                  className="px-4 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Roadmap
                </Link>
                <Link
                  href="/profile"
                  className="px-4 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/features"
                  className="px-4 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/#testimonials"
                  className="px-4 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
