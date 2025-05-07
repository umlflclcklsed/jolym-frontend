"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Briefcase, Heart, DollarSign, TrendingUp, Clock } from "lucide-react"
import { MagnifyingGlassIcon, ArrowRightIcon } from "@radix-ui/react-icons"

// Sample profession data
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

export default function ProfessionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredProfessions, setFilteredProfessions] = useState<any[]>([])
  const [trendingOnly, setTrendingOnly] = useState(false)

  // Flatten all professions for search and filtering
  const allProfessions = professionCategories.flatMap((category) =>
    category.professions.map((profession) => ({
      ...profession,
      category: category.name,
      categoryId: category.id,
      categoryColor: category.color,
      categoryBgColor: category.bgColor,
    })),
  )

  // Filter professions based on search query, category, and trending filter
  useEffect(() => {
    let result = allProfessions

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (profession) =>
          profession.title.toLowerCase().includes(query) ||
          profession.description.toLowerCase().includes(query) ||
          profession.category.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((profession) => profession.categoryId === activeCategory)
    }

    // Filter by trending
    if (trendingOnly) {
      result = result.filter((profession) => profession.trending)
    }

    setFilteredProfessions(result)
  }, [searchQuery, activeCategory, trendingOnly])

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            <span className="gradient-text">Explore Professions</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Discover detailed information about various career paths and find the perfect match for your skills and
            interests
          </p>

          <div className="relative max-w-xl mx-auto mb-8">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search professions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              className={
                activeCategory === "all"
                  ? "bg-emerald-700 hover:bg-emerald-800"
                  : "border-gray-200 dark:border-gray-800"
              }
              onClick={() => setActiveCategory("all")}
            >
              All Categories
            </Button>

            {professionCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={
                  activeCategory === category.id
                    ? "bg-emerald-700 hover:bg-emerald-800"
                    : "border-gray-200 dark:border-gray-800"
                }
                onClick={() => setActiveCategory(category.id)}
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-center mb-8">
            <Button
              variant="outline"
              className={`gap-2 ${trendingOnly ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800" : "border-gray-200 dark:border-gray-800"}`}
              onClick={() => setTrendingOnly(!trendingOnly)}
            >
              <TrendingUp className="h-4 w-4" />
              {trendingOnly ? "Showing Trending Only" : "Show Trending Only"}
            </Button>
          </div>
        </motion.div>

        {filteredProfessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessions.map((profession, index) => (
              <motion.div
                key={profession.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/professions/${profession.id}`}>
                  <Card className="h-full border-gray-200 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2 rounded-lg ${profession.categoryBgColor}`}>
                          <profession.category.icon className={`h-5 w-5 ${profession.categoryColor}`} />
                        </div>
                        {profession.trending && (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
                            <TrendingUp className="mr-1 h-3 w-3" /> Trending
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{profession.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{profession.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">{profession.salary}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">{profession.growth}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Time to master: {profession.timeToMastery}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {profession.skills.slice(0, 3).map((skill: string, i: number) => (
                          <Badge key={i} variant="outline" className="bg-gray-50 dark:bg-gray-800">
                            {skill}
                          </Badge>
                        ))}
                        {profession.skills.length > 3 && (
                          <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">
                            +{profession.skills.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{profession.category}</span>
                        <Button variant="ghost" size="sm" className="gap-1 text-emerald-700 dark:text-emerald-400">
                          View Details
                          <ArrowRightIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">No professions found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filters to find what you're looking for
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("all")
                setTrendingOnly(false)
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
