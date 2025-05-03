import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#2E7D32]" />
              <span className="text-lg font-bold text-[#2E7D32]">Jolym</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Visualize your career path and get personalized roadmaps to achieve your professional goals.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-gray-900">Company</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-gray-600 hover:text-[#2E7D32]">
                  About
                </Link>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#2E7D32]">
                  Careers
                </Link>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#2E7D32]">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-gray-600 hover:text-[#2E7D32]">
                  Terms
                </Link>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#2E7D32]">
                  Privacy
                </Link>
                <Link href="#" className="text-sm text-gray-600 hover:text-[#2E7D32]">
                  Cookies
                </Link>
              </nav>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-900">Stay updated</h3>
            <p className="text-sm text-gray-600">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="border-gray-200 focus:border-[#2E7D32] focus:ring-[#2E7D32]"
              />
              <Button className="bg-[#2E7D32] hover:bg-[#1B5E20]">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-xs text-gray-500 text-center">© {new Date().getFullYear()} Jolym. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
