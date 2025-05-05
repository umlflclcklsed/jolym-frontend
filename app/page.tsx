"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
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
  Heart,
  DollarSign,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  // Refs for animation
  const heroRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Handle scroll animations
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Animate sections on scroll
      const sections = [
        { ref: heroRef, delay: 0 },
        { ref: categoriesRef, delay: 100 },
        { ref: featuresRef, delay: 200 },
        { ref: testimonialsRef, delay: 300 },
        { ref: ctaRef, delay: 400 },
      ]

      sections.forEach(({ ref, delay }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.8) {
            setTimeout(() => {
              ref.current?.classList.add("visible")
            }, delay)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)

    // Trigger initial animations
    setTimeout(() => {
      heroRef.current?.classList.add("visible")
    }, 100)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/roadmap/create?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="w-full py-20 md:py-28 lg:py-36 bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden fade-in-up"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-emerald-500 dark:bg-emerald-400"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: Math.random() * 0.3,
                  x: [0, Math.random() * 20 - 10],
                  y: [0, Math.random() * 20 - 10],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: Math.random() * 2,
                }}
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-8 text-center">
            <motion.div
              className="space-y-4 max-w-4xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-gray-100">
                <motion.span
                  className="gradient-text inline-block"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  Map Your Future,
                </motion.span>{" "}
                <motion.span
                  className="inline-block"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  One Step at a Time
                </motion.span>
              </h1>
              <motion.p
                className="mx-auto max-w-[800px] text-gray-600 dark:text-gray-400 md:text-xl lg:text-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                Describe your dream career. Jolym will generate a personalized roadmap with expert-curated resources.
              </motion.p>
            </motion.div>

            <motion.div
              className="w-full max-w-md space-y-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <form onSubmit={handleSearch} className="flex w-full max-w-md items-center space-x-2">
                <Input
                  type="text"
                  placeholder="e.g. Become a Data Scientist"
                  className="border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 h-12 px-6 transition-all duration-300"
                  >
                    <span>Generate</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-2 pt-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            >
              {["Data Science", "Web Development", "UX Design", "Machine Learning"].map((item, i) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                >
                  <Link href={`/roadmap/create?q=${encodeURIComponent(item)}`}>
                    <Button
                      variant="outline"
                      className="text-xs border-gray-200 dark:border-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-200"
                    >
                      {item}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-8 pt-8 w-full max-w-5xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            >
              <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-emerald-500/5 dark:from-emerald-900/20 dark:to-emerald-900/10 backdrop-blur-sm"></div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
                >
                  <div className="w-full max-w-4xl p-4">
                    <motion.img
                      src="/placeholder.svg?height=400&width=800"
                      alt="Roadmap Preview"
                      className="w-full h-auto rounded-lg shadow-lg"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ChevronDown className="h-8 w-8 text-emerald-500 dark:text-emerald-400" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Career Categories Section */}
      <section ref={categoriesRef} className="w-full py-20 md:py-28 bg-white dark:bg-gray-950 fade-in-up">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-gray-100">
                <span className="gradient-text">Explore Career Paths</span>
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl">
                Discover roadmaps for hundreds of career paths across various industries
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Technology",
                icon: Code,
                color: "text-blue-600 dark:text-blue-400",
                bgColor: "bg-blue-100 dark:bg-blue-900/30",
                careers: ["Software Engineer", "Full Stack Developer", "DevOps Engineer", "Mobile Developer"],
              },
              {
                title: "Data",
                icon: Database,
                color: "text-purple-600 dark:text-purple-400",
                bgColor: "bg-purple-100 dark:bg-purple-900/30",
                careers: ["Data Scientist", "Data Analyst", "Data Engineer", "Machine Learning Engineer"],
              },
              {
                title: "Design",
                icon: Palette,
                color: "text-pink-600 dark:text-pink-400",
                bgColor: "bg-pink-100 dark:bg-pink-900/30",
                careers: ["UX Designer", "UI Designer", "Graphic Designer", "Product Designer"],
              },
              {
                title: "Business",
                icon: Briefcase,
                color: "text-amber-600 dark:text-amber-400",
                bgColor: "bg-amber-100 dark:bg-amber-900/30",
                careers: ["Product Manager", "Business Analyst", "Marketing Manager", "Project Manager"],
              },
              {
                title: "Science",
                icon: Microscope,
                color: "text-emerald-600 dark:text-emerald-400",
                bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
                careers: ["Research Scientist", "Bioinformatician", "Chemist", "Physicist"],
              },
              {
                title: "Finance",
                icon: DollarSign,
                color: "text-green-600 dark:text-green-400",
                bgColor: "bg-green-100 dark:bg-green-900/30",
                careers: ["Financial Analyst", "Investment Banker", "Accountant", "Financial Planner"],
              },
              {
                title: "Healthcare",
                icon: Heart,
                color: "text-red-600 dark:text-red-400",
                bgColor: "bg-red-100 dark:bg-red-900/30",
                careers: ["Physician", "Nurse", "Healthcare Administrator", "Medical Researcher"],
              },
              {
                title: "Education",
                icon: BookOpen,
                color: "text-orange-600 dark:text-orange-400",
                bgColor: "bg-orange-100 dark:bg-orange-900/30",
                careers: ["Teacher", "Professor", "Educational Technologist", "Curriculum Developer"],
              },
            ].map((category, i) => (
              <motion.div
                key={i}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="card-3d border-gray-200 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 bg-white dark:bg-gray-900 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <motion.div
                        className={`p-3 rounded-full ${category.bgColor}`}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <category.icon className={`h-6 w-6 ${category.color}`} />
                      </motion.div>
                      <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">{category.title}</h3>
                      <ul className="space-y-2 w-full">
                        {category.careers.map((career, j) => (
                          <motion.li key={j} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                            <Link href={`/roadmap/create?q=${encodeURIComponent(career)}`}>
                              <Button
                                variant="ghost"
                                className="w-full justify-between text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 p-2 h-auto transition-all duration-200"
                              >
                                {career}
                                <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
                                  <ArrowUpRight className="h-3 w-3" />
                                </motion.div>
                              </Button>
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link href="/roadmap/create">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-all duration-300">
                  Explore All Career Paths
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="w-full py-20 md:py-28 bg-gray-50 dark:bg-gray-900 fade-in-up">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-gray-100">
                <span className="gradient-text">Features</span>
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl">
                Discover how Jolym can help you plan your career journey
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            <Card className="card-3d border-gray-200 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 bg-white dark:bg-gray-900 transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                  <BrainCircuit className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">AI-Powered</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our advanced AI analyzes thousands of career paths to create personalized roadmaps tailored to your
                  goals and skills.
                </p>
              </CardContent>
            </Card>
            <Card className="card-3d border-gray-200 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 bg-white dark:bg-gray-900 transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                  <LineChart className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Visual Career Paths</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  See your entire career journey visualized with clear milestones, helping you understand each step
                  toward your goal.
                </p>
              </CardContent>
            </Card>
            <Card className="card-3d border-gray-200 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 bg-white dark:bg-gray-900 transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                  <BookOpen className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Step-by-Step Guidance</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get detailed information for each step, including resources, courses, and practical advice to help you
                  progress.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="w-full py-20 md:py-28 bg-white dark:bg-gray-950 fade-in-up">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-gray-100">
                <span className="gradient-text">Success Stories</span>
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl">
                See how Jolym has helped people achieve their career goals
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <Card
                key={i}
                className="card-3d border-gray-200 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 bg-white dark:bg-gray-900 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-600 dark:to-emerald-400 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="relative h-20 w-20 rounded-full border-2 border-white dark:border-gray-800"
                      />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 italic mb-4">"{testimonial.quote}"</p>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="w-full py-20 md:py-28 bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 dark:from-emerald-900 dark:via-emerald-800 dark:to-emerald-900 fade-in-up"
      >
        <div className="container px-4 md:px-6 relative">
          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white dark:bg-gray-100 animate-float"
                style={{
                  width: `${Math.random() * 8 + 2}px`,
                  height: `${Math.random() * 8 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.3,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 10 + 5}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                Ready to Start Your Journey?
              </h2>
              <p className="mx-auto max-w-[700px] text-emerald-100 md:text-xl">
                Create your account today and get your personalized career roadmap.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button className="bg-white text-emerald-700 hover:bg-gray-100 h-12 px-8 text-base transition-all duration-300">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-emerald-600 h-12 px-8 text-base transition-all duration-300"
                >
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
