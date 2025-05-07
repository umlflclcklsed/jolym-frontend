"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Users,
  Hammer,
  Award,
  Palette,
  ClipboardList,
  Download,
  Share2,
  Briefcase,
  LineChart,
} from "lucide-react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

// Personality type definitions
const personalityTypes = {
  analytical: {
    name: "Analytical Thinker",
    icon: Brain,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    description:
      "You enjoy solving complex problems, analyzing data, and understanding how things work. You have a logical mind and prefer to make decisions based on facts and evidence. You excel in environments that require critical thinking and technical expertise.",
    strengths: ["Problem-solving", "Critical thinking", "Attention to detail", "Technical aptitude"],
    careers: ["Data Scientist", "Software Engineer", "Financial Analyst", "Research Scientist"],
  },
  social: {
    name: "Social Connector",
    icon: Users,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    description:
      "You enjoy working with people, building relationships, and helping others. You have strong communication skills and empathy. You thrive in collaborative environments and are good at resolving conflicts and understanding others' perspectives.",
    strengths: ["Communication", "Empathy", "Teamwork", "Relationship building"],
    careers: ["Teacher", "Counselor", "HR Manager", "Social Worker"],
  },
  practical: {
    name: "Practical Doer",
    icon: Hammer,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    description:
      "You prefer hands-on work and practical solutions. You enjoy building, fixing, and working with tangible results. You're reliable, pragmatic, and good at implementing ideas and seeing projects through to completion.",
    strengths: ["Hands-on skills", "Reliability", "Practicality", "Implementation"],
    careers: ["Engineer", "Tradesperson", "Chef", "Physical Therapist"],
  },
  leadership: {
    name: "Natural Leader",
    icon: Award,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    description:
      "You enjoy taking charge, making decisions, and influencing others. You have vision, confidence, and the ability to motivate teams. You excel in roles where you can drive initiatives and lead people toward common goals.",
    strengths: ["Decision-making", "Strategic thinking", "Persuasion", "Confidence"],
    careers: ["Executive", "Entrepreneur", "Project Manager", "Sales Director"],
  },
  creative: {
    name: "Creative Innovator",
    icon: Palette,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    description:
      "You enjoy expressing yourself, thinking outside the box, and creating new things. You have imagination, originality, and artistic sensibility. You thrive in environments that allow for innovation and self-expression.",
    strengths: ["Imagination", "Innovation", "Artistic ability", "Original thinking"],
    careers: ["Designer", "Writer", "Marketing Creative", "Architect"],
  },
  organized: {
    name: "Structured Planner",
    icon: ClipboardList,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    description:
      "You enjoy planning, organizing, and creating systems. You have attention to detail, reliability, and methodical thinking. You excel in roles that require precision, consistency, and careful management of resources or information.",
    strengths: ["Organization", "Planning", "Attention to detail", "Reliability"],
    careers: ["Project Coordinator", "Accountant", "Operations Manager", "Administrative Director"],
  },
}

// Sample career matches based on personality types
const careerMatches = [
  {
    id: "data-scientist",
    title: "Data Scientist",
    match: 95,
    primaryType: "analytical",
    secondaryType: "creative",
    description: "Analyze complex data sets to help organizations make better decisions",
    skills: ["Statistics", "Programming", "Machine Learning", "Data Visualization"],
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    match: 92,
    primaryType: "creative",
    secondaryType: "social",
    description: "Design user-friendly interfaces and experiences for digital products",
    skills: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
  },
  {
    id: "project-manager",
    title: "Project Manager",
    match: 88,
    primaryType: "leadership",
    secondaryType: "organized",
    description: "Plan, execute, and oversee projects from conception to completion",
    skills: ["Planning", "Team Leadership", "Risk Management", "Communication"],
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    match: 85,
    primaryType: "analytical",
    secondaryType: "practical",
    description: "Design and develop software applications and systems",
    skills: ["Programming", "Problem Solving", "Algorithms", "System Design"],
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    match: 82,
    primaryType: "creative",
    secondaryType: "leadership",
    description: "Develop and implement marketing strategies to promote products or services",
    skills: ["Strategic Planning", "Campaign Management", "Market Analysis", "Brand Development"],
  },
]

// Define the career type for better type safety
interface Career {
  id: string;
  title: string;
  match: number;
  primaryType: string;
  secondaryType: string;
  description: string;
  skills: string[];
}

export default function TestResultsPage() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState<Record<string, number>>({})
  const [dominantTypes, setDominantTypes] = useState<string[]>([])
  const [recommendedCareers, setRecommendedCareers] = useState<Career[]>([])

  useEffect(() => {
    // Parse results from URL parameters
    const parsedResults: Record<string, number> = {}

    if (searchParams) {
      for (const [key, value] of searchParams.entries()) {
        parsedResults[key] = Number.parseFloat(value)
      }
    }

    // If no results in URL, use sample results
    if (Object.keys(parsedResults).length === 0) {
      // Sample results for demonstration
      parsedResults.analytical = 4.2
      parsedResults.social = 3.5
      parsedResults.practical = 3.8
      parsedResults.leadership = 4.0
      parsedResults.creative = 4.5
      parsedResults.organized = 3.2
    }

    setResults(parsedResults)

    // Determine dominant personality types (top 2)
    const sortedTypes = Object.entries(parsedResults)
      .sort((a, b) => b[1] - a[1])
      .map(([type]) => type)
      .slice(0, 2)

    setDominantTypes(sortedTypes)

    // Filter career matches based on dominant types
    const filteredCareers = careerMatches
      .filter((career) => sortedTypes.includes(career.primaryType) || sortedTypes.includes(career.secondaryType))
      .sort((a, b) => b.match - a.match)

    setRecommendedCareers(filteredCareers)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
              <span className="gradient-text">Your Personality Profile</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Based on your responses, we've analyzed your personality traits and identified your ideal career matches
            </p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400"
              >
                Personality Profile
              </TabsTrigger>
              <TabsTrigger
                value="careers"
                className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400"
              >
                Career Matches
              </TabsTrigger>
              <TabsTrigger
                value="next-steps"
                className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400"
              >
                Next Steps
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="border-gray-200 dark:border-gray-800 mb-8">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-gray-100">Your Personality Traits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(results).map(([type, score], index) => {
                      const personalityType = personalityTypes[type as keyof typeof personalityTypes]
                      const percentage = (score / 5) * 100

                      return (
                        <motion.div
                          key={type}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className={`p-2 rounded-lg ${personalityType.bgColor} mr-3`}>
                                <personalityType.icon className={`h-5 w-5 ${personalityType.color}`} />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">{personalityType.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{score.toFixed(1)} / 5.0</p>
                              </div>
                            </div>
                            <Badge
                              className={
                                dominantTypes.includes(type)
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                              }
                            >
                              {dominantTypes.includes(type) ? "Dominant" : "Secondary"}
                            </Badge>
                          </div>
                          <Progress
                            value={percentage}
                            className={`h-2 mb-4 bg-gray-100 dark:bg-gray-800 ${
                              dominantTypes.includes(type) 
                                ? "[&>div]:bg-emerald-500" 
                                : "[&>div]:bg-gray-400 dark:[&>div]:bg-gray-600"
                            }`}
                          />
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {dominantTypes.map((type, index) => {
                  const personalityType = personalityTypes[type as keyof typeof personalityTypes]

                  return (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                    >
                      <Card className="border-gray-200 dark:border-gray-800 h-full">
                        <CardHeader
                          className={`${personalityType.bgColor} border-b border-gray-200 dark:border-gray-800`}
                        >
                          <div className="flex items-center">
                            <personalityType.icon className={`h-6 w-6 ${personalityType.color} mr-2`} />
                            <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                              {personalityType.name}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="text-gray-600 dark:text-gray-400 mb-6">{personalityType.description}</p>

                          <div className="mb-6">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Key Strengths</h4>
                            <div className="flex flex-wrap gap-2">
                              {personalityType.strengths.map((strength, i) => (
                                <Badge key={i} variant="outline" className="bg-gray-50 dark:bg-gray-800">
                                  {strength}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Recommended Careers</h4>
                            <ul className="space-y-1">
                              {personalityType.careers.map((career, i) => (
                                <li key={i} className="text-gray-600 dark:text-gray-400">
                                  • {career}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="careers">
              <div className="space-y-6">
                {recommendedCareers.map((career, index) => {
                  const primaryType = personalityTypes[career.primaryType as keyof typeof personalityTypes]
                  const secondaryType = personalityTypes[career.secondaryType as keyof typeof personalityTypes]

                  return (
                    <motion.div
                      key={career.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="border-gray-200 dark:border-gray-800">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="md:w-1/4 flex items-center">
                              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mr-4">
                                <Briefcase className="h-8 w-8 text-emerald-700 dark:text-emerald-400" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{career.title}</h3>
                                <div className="flex items-center mt-1">
                                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                                    <div
                                      className="bg-emerald-500 h-2 rounded-full"
                                      style={{ width: `${career.match}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                                    {career.match}% Match
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="md:w-2/4">
                              <p className="text-gray-600 dark:text-gray-400 mb-3">{career.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {career.skills.map((skill: string, i: number) => (
                                  <Badge key={i} variant="outline" className="bg-gray-50 dark:bg-gray-800">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="md:w-1/4 flex flex-col md:items-end">
                              <div className="flex items-center mb-3">
                                <div className={`p-1.5 rounded-lg ${primaryType.bgColor} mr-2`}>
                                  <primaryType.icon className={`h-3.5 w-3.5 ${primaryType.color}`} />
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{primaryType.name}</span>
                              </div>
                              <div className="flex items-center mb-4">
                                <div className={`p-1.5 rounded-lg ${secondaryType.bgColor} mr-2`}>
                                  <secondaryType.icon className={`h-3.5 w-3.5 ${secondaryType.color}`} />
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{secondaryType.name}</span>
                              </div>
                              <Link href={`/professions/${career.id}`}>
                                <Button className="w-full md:w-auto bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                                  View Career
                                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-8 text-center">
                <Link href="/professions">
                  <Button
                    variant="outline"
                    className="border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
                  >
                    Explore All Professions
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="next-steps">
              <Card className="border-gray-200 dark:border-gray-800 mb-8">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                    Your Personalized Action Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col md:flex-row gap-6"
                    >
                      <div className="md:w-1/4 flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                          <Briefcase className="h-8 w-8 text-emerald-700 dark:text-emerald-400" />
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                          1. Explore Your Career Matches
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Review your top career matches and learn more about each profession. Consider how they align
                          with your interests, values, and lifestyle preferences.
                        </p>
                        <Link href="/professions">
                          <Button className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                            Browse Professions
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex flex-col md:flex-row gap-6"
                    >
                      <div className="md:w-1/4 flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                          <LineChart className="h-8 w-8 text-emerald-700 dark:text-emerald-400" />
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                          2. Create Your Career Roadmap
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Once you've chosen a career path, generate a detailed roadmap with step-by-step guidance on
                          how to achieve your goals, including education, skills, and experience needed.
                        </p>
                        <Link href="/roadmap/create">
                          <Button className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                            Create Roadmap
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex flex-col md:flex-row gap-6"
                    >
                      <div className="md:w-1/4 flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                          <Users className="h-8 w-8 text-emerald-700 dark:text-emerald-400" />
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                          3. Connect with a Career Coach
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Get personalized advice and guidance from our career coaches who can answer your questions and
                          help you navigate your career journey.
                        </p>
                        <Link href="/coach">
                          <Button className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                            Chat with Coach
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button variant="outline" className="gap-2 border-gray-200 dark:border-gray-800">
                  <Download className="h-4 w-4" />
                  Download Results
                </Button>
                <Button variant="outline" className="gap-2 border-gray-200 dark:border-gray-800">
                  <Share2 className="h-4 w-4" />
                  Share Results
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
