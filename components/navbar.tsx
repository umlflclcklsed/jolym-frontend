"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, User, LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-emerald-700" />
          <span className="text-xl font-bold text-emerald-800">Jolym</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-emerald-700">
            Home
          </Link>
          <Link href="#features" className="text-sm font-medium hover:text-emerald-700">
            Features
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-emerald-700">
            About
          </Link>
          {isLoggedIn && (
            <Link href="/roadmap" className="text-sm font-medium hover:text-emerald-700">
              My Roadmap
            </Link>
          )}
        </nav>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-emerald-700 border-emerald-200 hover:bg-emerald-50 flex gap-2">
                  <User size={16} />
                  <span>{user?.name || 'Профиль'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/roadmap" className="cursor-pointer">Мой роадмап</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">Настройки</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 flex gap-2 items-center">
                  <LogOut size={16} />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="text-emerald-700 border-emerald-200 hover:bg-emerald-50">
                  Войти
                </Button>
              </Link>
              <Link href="/register" className="hidden md:block">
                <Button className="bg-emerald-700 hover:bg-emerald-800">Регистрация</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
