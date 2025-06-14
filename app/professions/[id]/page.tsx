"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Briefcase,
  Heart,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowLeft,
  GraduationCap,
  CheckCircle,
  BookOpen,
} from "lucide-react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

// Import the profession data from the parent page
// This is the same data used in the professions page
const professionCategories = [
  {
    id: "technology",
    name: "Technology",
    icon: Code,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    professions: [
      {
        id: "software-engineer",
        title: "Software Engineer",
        description: "Design, develop, and maintain software systems and applications",
        salary: "$70,000 - $150,000",
        growth: "22% (Much faster than average)",
        timeToMastery: "3-5 years",
        skills: ["Programming", "Problem Solving", "Algorithms", "Data Structures"],
        education: "Bachelor's in Computer Science or related field",
        trending: true,
      },
      {
        id: "data-scientist",
        title: "Data Scientist",
        description: "Analyze and interpret complex data to help organizations make better decisions",
        salary: "$95,000 - $165,000",
        growth: "36% (Much faster than average)",
        timeToMastery: "4-6 years",
        skills: ["Statistics", "Machine Learning", "Programming", "Data Visualization"],
        education: "Master's or PhD in Computer Science, Statistics, or related field",
        trending: true,
      },
      {
        id: "ux-designer",
        title: "UX Designer",
        description: "Design user-friendly interfaces and experiences for digital products",
        salary: "$65,000 - $130,000",
        growth: "13% (Faster than average)",
        timeToMastery: "2-4 years",
        skills: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
        education: "Bachelor's in Design, HCI, or related field",
        trending: true,
      },
      {
        id: "cybersecurity-analyst",
        title: "Cybersecurity Analyst",
        description: "Protect computer systems and networks from security breaches",
        salary: "$75,000 - $140,000",
        growth: "33% (Much faster than average)",
        timeToMastery: "3-5 years",
        skills: ["Network Security", "Threat Analysis", "Security Tools", "Risk Management"],
        education: "Bachelor's in Cybersecurity, Computer Science, or related field",
        trending: true,
      },
    ],
  },
  {
    id: "business",
    name: "Business",
    icon: Briefcase,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    professions: [
      {
        id: "product-manager",
        title: "Product Manager",
        description: "Oversee the development and marketing of products throughout their lifecycle",
        salary: "$80,000 - $160,000",
        growth: "10% (Faster than average)",
        timeToMastery: "4-6 years",
        skills: ["Strategic Planning", "Market Analysis", "Leadership", "Communication"],
        education: "Bachelor's in Business, Engineering, or related field",
        trending: true,
      },
      {
        id: "marketing-manager",
        title: "Marketing Manager",
        description: "Plan and execute marketing strategies to promote products or services",
        salary: "$65,000 - $135,000",
        growth: "10% (Faster than average)",
        timeToMastery: "3-5 years",
        skills: ["Digital Marketing", "Analytics", "Content Creation", "Campaign Management"],
        education: "Bachelor's in Marketing, Business, or related field",
        trending: false,
      },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Heart,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    professions: [
      {
        id: "nurse-practitioner",
        title: "Nurse Practitioner",
        description: "Provide advanced nursing care and can prescribe medication",
        salary: "$90,000 - $130,000",
        growth: "45% (Much faster than average)",
        timeToMastery: "6-8 years",
        skills: ["Patient Care", "Diagnostics", "Treatment Planning", "Medical Knowledge"],
        education: "Master's in Nursing and certification",
        trending: true,
      },
      {
        id: "physical-therapist",
        title: "Physical Therapist",
        description: "Help patients improve movement and manage pain after injuries or illnesses",
        salary: "$75,000 - $110,000",
        growth: "18% (Much faster than average)",
        timeToMastery: "7 years",
        skills: ["Anatomy", "Exercise Science", "Patient Assessment", "Treatment Planning"],
        education: "Doctoral Degree in Physical Therapy",
        trending: false,
      },
    ],
  },
]

// Helper function to find a profession by ID
const findProfessionById = (id: string) => {
  for (const category of professionCategories) {
    const profession = category.professions.find((p) => p.id === id)
    if (profession) {
      return {
        ...profession,
        category: category.name,
        categoryId: category.id,
        categoryIcon: category.icon,
        categoryColor: category.color,
        categoryBgColor: category.bgColor,
      }
    }
  }
  return null
}

export default function ProfessionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [profession, setProfession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [categoryIcon, setCategoryIcon] = useState<any>(null)

  useEffect(() => {
    if (params.id) {
      const professionId = Array.isArray(params.id) ? params.id[0] : params.id
      
      // Find the profession
      for (const category of professionCategories) {
        const foundProfession = category.professions.find(p => p.id === professionId)
        if (foundProfession) {
          setProfession({
            ...foundProfession,
            category: category.name,
            categoryId: category.id,
            categoryColor: category.color,
            categoryBgColor: category.bgColor
          })
          setCategoryIcon(category.icon)
          break
        }
      }
      
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!profession) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Profession Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The profession you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push('/professions')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Professions
        </Button>
      </div>
    )
  }

  const CategoryIcon = categoryIcon

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <Button
          variant="ghost"
          className="mb-8 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          onClick={() => router.push('/professions')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Professions
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg mr-4 ${profession.categoryBgColor}`}>
                  {CategoryIcon && <CategoryIcon className={`h-6 w-6 ${profession.categoryColor}`} />}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{profession.title}</h1>
                  <div className="flex items-center mt-2">
                    <Badge className="mr-2 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                      {profession.category}
                    </Badge>
                    {profession.trending && (
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
                        <TrendingUp className="mr-1 h-3 w-3" /> Trending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Overview</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{profession.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center mb-2">
                        <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Salary Range</span>
                      </div>
                      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{profession.salary}</span>
                    </div>

                    <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Growth</span>
                      </div>
                      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{profession.growth}</span>
                    </div>

                    <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Time to Master</span>
                      </div>
                      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {profession.timeToMastery}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                      Key Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profession.skills.map((skill: string, i: number) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="bg-gray-50 dark:bg-gray-800 py-1.5 px-3 text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                      Education Requirements
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">{profession.education}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Career Path</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Here's a typical career progression for a {profession.title}:
                  </p>

                  <div className="relative pl-8 pb-8 border-l-2 border-emerald-200 dark:border-emerald-800">
                    <div className="mb-8 relative">
                      <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">1</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold mb-2">Entry Level</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          Begin your career with foundational skills and knowledge. Focus on building practical experience
                          and learning from senior professionals.
                        </p>
                      </div>
                    </div>

                    <div className="mb-8 relative">
                      <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">2</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold mb-2">Mid-Level</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          With 2-5 years of experience, you'll take on more responsibility and complex projects. Continue
                          developing specialized skills and industry knowledge.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">3</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold mb-2">Senior Level</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          After 5+ years, you'll lead projects, mentor junior team members, and contribute to strategic
                          decisions. Consider specializing or moving into management roles.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="sticky top-24 mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Get Started</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Ready to explore a career as a {profession.title}? Generate a personalized roadmap to help you
                    achieve your goals.
                  </p>

                  <Button 
                    className="w-full mb-4 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                    onClick={() => {}}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Generate Career Roadmap
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
                    onClick={() => router.push('/professions')}
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    View Similar Careers
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Related Resources</h2>
                  <ul className="space-y-4">
                    <li>
                      <button
                        onClick={() => {}}
                        className="flex items-center text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                      >
                        <ArrowRightIcon className="mr-2 h-4 w-4" />
                        <span>Top Universities for {profession.title}s</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {}}
                        className="flex items-center text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                      >
                        <ArrowRightIcon className="mr-2 h-4 w-4" />
                        <span>Industry Certifications Guide</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {}}
                        className="flex items-center text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                      >
                        <ArrowRightIcon className="mr-2 h-4 w-4" />
                        <span>Networking Tips for {profession.category} Professionals</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {}}
                        className="flex items-center text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                      >
                        <ArrowRightIcon className="mr-2 h-4 w-4" />
                        <span>Interview Preparation for {profession.title}s</span>
                      </button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}