import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, LineChart, BookOpen } from "lucide-react"
import RoadmapPreview from "@/components/roadmap-preview"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-emerald-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-emerald-900 max-w-3xl mx-auto">
                  Map Your Future, One Step at a Time
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Describe your dream career. Jolym will generate a personalized roadmap.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <div className="flex w-full max-w-md items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="e.g. Become a Data Scientist"
                    className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 h-12 text-base"
                  />
                  <Button className="bg-emerald-700 hover:bg-emerald-800 h-12 px-6">
                    <span>Generate</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Preview */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <RoadmapPreview />
              <div className="mt-6 text-center">
                <Link href="/roadmap">
                  <Button className="bg-emerald-700 hover:bg-emerald-800">View Full Roadmap</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-emerald-900">Features</h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Discover how Jolym can help you plan your career journey
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-12">
              <Card className="border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <BrainCircuit className="h-12 w-12 text-emerald-700 mb-2" />
                  <CardTitle className="text-emerald-800">AI-Powered</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Our advanced AI analyzes thousands of career paths to create personalized roadmaps tailored to your
                    goals and skills.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <LineChart className="h-12 w-12 text-emerald-700 mb-2" />
                  <CardTitle className="text-emerald-800">Visual Career Paths</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    See your entire career journey visualized with clear milestones, helping you understand each step
                    toward your goal.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <BookOpen className="h-12 w-12 text-emerald-700 mb-2" />
                  <CardTitle className="text-emerald-800">Step-by-Step Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Get detailed information for each step, including resources, courses, and practical advice to help you
                    progress.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-emerald-900">Success Stories</h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  See how Jolym has helped people achieve their career goals
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Data Scientist at Tech Co",
                  quote:
                    "Jolym's roadmap helped me transition from marketing to data science in just 18 months. The step-by-step guidance was invaluable.",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Michael Chen",
                  role: "Full-Stack Developer",
                  quote:
                    "As a self-taught developer, I was missing key skills. Jolym identified my gaps and helped me become job-ready.",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Priya Patel",
                  role: "UX Designer",
                  quote:
                    "The resources Jolym recommended were spot-on. I went from beginner to professional in less time than I expected.",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
              ].map((testimonial, i) => (
                <Card key={i} className="border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-20 w-20 rounded-full mb-4 border-2 border-emerald-100"
                      />
                      <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                      <h4 className="font-medium text-emerald-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-emerald-700">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                  Ready to Start Your Journey?
                </h2>
                <p className="mx-auto max-w-[700px] text-emerald-100 md:text-xl">
                  Create your account today and get your personalized career roadmap.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button className="bg-white text-emerald-700 hover:bg-emerald-50 h-12 px-8 text-base">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="text-white border-white hover:bg-emerald-600 h-12 px-8 text-base">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
