import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  BrainCircuit,
  LineChart,
  BookOpen,
  ArrowRight,
  Code,
  Database,
  Palette,
  Briefcase,
  Microscope,
  Building,
  Heart,
  Camera,
  Music,
  DollarSign,
  Users,
  Smartphone,
  Shield,
  Leaf,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-emerald-50 to-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-emerald-500"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.3,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-emerald-900 max-w-3xl mx-auto">
                Map Your Future, One Step at a Time
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Describe your dream career. Jolym will generate a personalized roadmap with expert-curated resources.
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <div className="flex w-full max-w-md items-center space-x-2">
                <Input
                  type="text"
                  placeholder="e.g. Become a Data Scientist"
                  className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 h-12 text-base"
                />
                <Link href="/roadmap/create">
                  <Button className="bg-emerald-700 hover:bg-emerald-800 h-12 px-6">
                    <span>Generate</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Link href="/roadmap/create?q=Data%20Science">
                <Button variant="outline" className="text-xs border-emerald-200 hover:bg-emerald-50">
                  Data Science
                </Button>
              </Link>
              <Link href="/roadmap/create?q=Web%20Development">
                <Button variant="outline" className="text-xs border-emerald-200 hover:bg-emerald-50">
                  Web Development
                </Button>
              </Link>
              <Link href="/roadmap/create?q=UX%20Design">
                <Button variant="outline" className="text-xs border-emerald-200 hover:bg-emerald-50">
                  UX Design
                </Button>
              </Link>
              <Link href="/roadmap/create?q=Machine%20Learning">
                <Button variant="outline" className="text-xs border-emerald-200 hover:bg-emerald-50">
                  Machine Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Career Categories Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-emerald-900">Explore Career Paths</h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Discover roadmaps for hundreds of career paths across various industries
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Technology",
                icon: Code,
                color: "text-blue-600",
                bgColor: "bg-blue-100",
                careers: ["Software Engineer", "Full Stack Developer", "DevOps Engineer", "Mobile Developer"],
              },
              {
                title: "Data",
                icon: Database,
                color: "text-purple-600",
                bgColor: "bg-purple-100",
                careers: ["Data Scientist", "Data Analyst", "Data Engineer", "Machine Learning Engineer"],
              },
              {
                title: "Design",
                icon: Palette,
                color: "text-pink-600",
                bgColor: "bg-pink-100",
                careers: ["UX Designer", "UI Designer", "Graphic Designer", "Product Designer"],
              },
              {
                title: "Business",
                icon: Briefcase,
                color: "text-amber-600",
                bgColor: "bg-amber-100",
                careers: ["Product Manager", "Business Analyst", "Marketing Manager", "Project Manager"],
              },
              {
                title: "Science",
                icon: Microscope,
                color: "text-emerald-600",
                bgColor: "bg-emerald-100",
                careers: ["Research Scientist", "Bioinformatician", "Chemist", "Physicist"],
              },
              {
                title: "Finance",
                icon: DollarSign,
                color: "text-green-600",
                bgColor: "bg-green-100",
                careers: ["Financial Analyst", "Investment Banker", "Accountant", "Financial Planner"],
              },
              {
                title: "Healthcare",
                icon: Heart,
                color: "text-red-600",
                bgColor: "bg-red-100",
                careers: ["Physician", "Nurse", "Healthcare Administrator", "Medical Researcher"],
              },
              {
                title: "Education",
                icon: BookOpen,
                color: "text-orange-600",
                bgColor: "bg-orange-100",
                careers: ["Teacher", "Professor", "Educational Technologist", "Curriculum Developer"],
              },
              {
                title: "Media",
                icon: Camera,
                color: "text-indigo-600",
                bgColor: "bg-indigo-100",
                careers: ["Content Creator", "Journalist", "Filmmaker", "Social Media Manager"],
              },
              {
                title: "Arts",
                icon: Music,
                color: "text-violet-600",
                bgColor: "bg-violet-100",
                careers: ["Musician", "Visual Artist", "Writer", "Actor"],
              },
              {
                title: "Human Resources",
                icon: Users,
                color: "text-teal-600",
                bgColor: "bg-teal-100",
                careers: ["HR Manager", "Recruiter", "Talent Acquisition", "Training Specialist"],
              },
              {
                title: "Engineering",
                icon: Building,
                color: "text-gray-600",
                bgColor: "bg-gray-100",
                careers: ["Civil Engineer", "Mechanical Engineer", "Electrical Engineer", "Chemical Engineer"],
              },
              {
                title: "Mobile",
                icon: Smartphone,
                color: "text-cyan-600",
                bgColor: "bg-cyan-100",
                careers: ["iOS Developer", "Android Developer", "Mobile UX Designer", "App Architect"],
              },
              {
                title: "Security",
                icon: Shield,
                color: "text-rose-600",
                bgColor: "bg-rose-100",
                careers: ["Cybersecurity Analyst", "Security Engineer", "Ethical Hacker", "Security Consultant"],
              },
              {
                title: "AI & ML",
                icon: BrainCircuit,
                color: "text-fuchsia-600",
                bgColor: "bg-fuchsia-100",
                careers: ["AI Researcher", "ML Engineer", "NLP Specialist", "Computer Vision Engineer"],
              },
              {
                title: "Sustainability",
                icon: Leaf,
                color: "text-lime-600",
                bgColor: "bg-lime-100",
                careers: ["Environmental Scientist", "Sustainability Consultant", "Renewable Energy Specialist"],
              },
            ].map((category, i) => (
              <Card key={i} className="border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-3 rounded-full ${category.bgColor}`}>
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <h3 className="font-medium text-lg text-emerald-900">{category.title}</h3>
                    <ul className="space-y-2 w-full">
                      {category.careers.map((career, j) => (
                        <li key={j}>
                          <Link href={`/roadmap/create?q=${encodeURIComponent(career)}`}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 p-2 h-auto"
                            >
                              {career}
                            </Button>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
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
              <CardContent className="p-6">
                <BrainCircuit className="h-12 w-12 text-emerald-700 mb-4" />
                <h3 className="text-xl font-bold text-emerald-800 mb-2">AI-Powered</h3>
                <p className="text-gray-600">
                  Our advanced AI analyzes thousands of career paths to create personalized roadmaps tailored to your
                  goals and skills.
                </p>
              </CardContent>
            </Card>
            <Card className="border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <LineChart className="h-12 w-12 text-emerald-700 mb-4" />
                <h3 className="text-xl font-bold text-emerald-800 mb-2">Visual Career Paths</h3>
                <p className="text-gray-600">
                  See your entire career journey visualized with clear milestones, helping you understand each step
                  toward your goal.
                </p>
              </CardContent>
            </Card>
            <Card className="border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <BookOpen className="h-12 w-12 text-emerald-700 mb-4" />
                <h3 className="text-xl font-bold text-emerald-800 mb-2">Step-by-Step Guidance</h3>
                <p className="text-gray-600">
                  Get detailed information for each step, including resources, courses, and practical advice to help you
                  progress.
                </p>
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
  )
}
