"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  BrainCircuit,
  LineChart,
  BookOpen,
  Code,
  Database,
  Palette,
  Briefcase,
  Microscope,
  Heart,
  DollarSign,
  ArrowUpRight,
  CheckCircle,
  Lightbulb,
  Compass,
} from "lucide-react"
import { motion } from "framer-motion"
import { ArrowRightIcon, ChevronDownIcon } from "@radix-ui/react-icons"

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
                Discover your ideal career path with personalized roadmaps and expert guidance
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 h-12 px-6 transition-all duration-300"
                  onClick={() => window.location.href = '/professions'}
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  <span>Explore Professions</span>
                </Button>
              </motion.div>
              <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/30 h-12 px-6 transition-all duration-300"
                  onClick={() => window.location.href = '/personality-test'}
                >
                  <Compass className="mr-2 h-5 w-5" />
                  <span>Take the Test</span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-12 pt-4 w-full max-w-5xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="border-emerald-100 dark:border-emerald-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-4">
                        <Compass className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Discover Your Path</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Take our personality test to find careers that match your strengths and interests
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="border-emerald-100 dark:border-emerald-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-4">
                        <LineChart className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Follow Your Roadmap</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Get a detailed, step-by-step plan to achieve your career goals
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="border-emerald-100 dark:border-emerald-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-4">
                        <BrainCircuit className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Get Expert Guidance</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Chat with career coaches who can answer questions and provide advice
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
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
                            <Link
                              href={`/professions/${encodeURIComponent(career.toLowerCase().replace(/\s+/g, "-"))}`}
                            >
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
            <Link href="/professions">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-all duration-300">
                  Explore All Career Paths
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
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
                <span className="gradient-text">How It Works</span>
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl">
                Our systematic approach helps you find and pursue your ideal career path
              </p>
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-8 bottom-8 w-1 bg-emerald-200 dark:bg-emerald-800 -translate-x-1/2 rounded-full hidden md:block"></div>

            <div className="space-y-16 relative">
              {[
                {
                  title: "Discover Your Strengths",
                  description:
                    "Take our comprehensive personality test to identify your natural talents, interests, and work preferences.",
                  icon: Compass,
                  image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  link: "/personality-test",
                  linkText: "Take the Test",
                },
                {
                  title: "Explore Matching Careers",
                  description:
                    "Review a personalized list of professions that align with your personality type and strengths.",
                  icon: Briefcase,
                  image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  link: "/professions",
                  linkText: "Browse Professions",
                },
                {
                  title: "Follow Your Roadmap",
                  description:
                    "Get a detailed, multi-level plan with specific steps, resources, and milestones to achieve your career goals.",
                  icon: LineChart,
                  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  link: "/roadmap/create",
                  linkText: "Create Roadmap",
                },
                {
                  title: "Track Your Progress",
                  description:
                    "Check off completed tasks, monitor your advancement, and celebrate milestones along your journey.",
                  icon: CheckCircle,
                  image: "https://images.unsplash.com/photo-1598257006460-4cd5d043cf49?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  link: "/dashboard",
                  linkText: "View Dashboard",
                },
                {
                  title: "Get Expert Guidance",
                  description:
                    "Chat with career coaches who can answer your questions and provide personalized advice.",
                  icon: Lightbulb,
                  image: "https://images.unsplash.com/photo-1507494924047-60b8ee826ca9?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  link: "/coach",
                  linkText: "Chat with Coach",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className={`md:w-1/2 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                      <div className="relative">
                        {/* Number indicator */}
                        <div className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold z-10">
                          {i + 1}
                        </div>
                        <div className="rounded-lg overflow-hidden border border-emerald-100 dark:border-emerald-800">
                          <img
                            src={step.image || "/placeholder.svg"}
                            alt={step.title}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                        <step.icon className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{step.description}</p>
                      <Link href={step.link}>
                        <Button className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                          {step.linkText}
                          <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Circle on the timeline */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full hidden md:block"></div>
                </motion.div>
              ))}
            </div>
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
                Ready to Discover Your Ideal Career Path?
              </h2>
              <p className="mx-auto max-w-[700px] text-emerald-100 md:text-xl">
                Take our personality test today and get a personalized roadmap to your dream career
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/personality-test">
                <Button className="bg-white text-emerald-700 hover:bg-gray-100 h-12 px-8 text-base transition-all duration-300">
                  Take the Test
                </Button>
              </Link>
              <Link href="/professions">
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-emerald-600 h-12 px-8 text-base transition-all duration-300"
                >
                  Browse Professions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
