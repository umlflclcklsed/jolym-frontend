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

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("auth_token")
    setIsLoggedIn(!!token)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    setIsLoggedIn(false)
    router.push("/")
  }

  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-emerald-700" />
          <span className="text-xl font-bold text-emerald-800">Jolym</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className={`text-sm font-medium ${pathname === "/" ? "text-emerald-700" : "hover:text-emerald-700"}`}
          >
            Home
          </Link>
          <Link
            href="/roadmap/create"
            className={`text-sm font-medium ${pathname === "/roadmap/create" ? "text-emerald-700" : "hover:text-emerald-700"}`}
          >
            Create Roadmap
          </Link>
          {isLoggedIn && (
            <Link
              href="/dashboard"
              className={`text-sm font-medium ${pathname === "/dashboard" ? "text-emerald-700" : "hover:text-emerald-700"}`}
            >
              Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    <User className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="text-emerald-700 border-emerald-700 hover:bg-emerald-50">
                  Login
                </Button>
              </Link>
              <Link href="/register" className="hidden md:block">
                <Button className="bg-emerald-700 hover:bg-emerald-800">Register</Button>
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
        <div className="md:hidden border-t">
          <nav className="flex flex-col py-2">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/roadmap/create"
              className="px-4 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Roadmap
            </Link>
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
