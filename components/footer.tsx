import Link from "next/link"
import { MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-emerald-700" />
          <span className="text-lg font-bold text-emerald-800">Jolym</span>
        </div>
        <nav className="flex gap-4 md:gap-6">
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-emerald-700">
            About
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-emerald-700">
            Contact
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-emerald-700">
            Privacy Policy
          </Link>
        </nav>
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} Jolym. All rights reserved.</p>
      </div>
    </footer>
  )
}
