"use client"

import { useState } from "react"
import { CheckCircle2, ExternalLink, Terminal, Code, Database, Server, Globe, Lock, Cpu, Cloud } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"

interface Resource {
  title: string
  url: string
  source: string
  description?: string
}

interface RoadmapStep {
  id: string
  title: string
  description: string
  icon: React.ElementType
  iconColor: string
  iconBg: string
  timeToComplete: string
  difficulty: number
  resources: Resource[]
  tips?: string
}

interface RoadmapSectionProps {
  title: string
  description: string
  steps: RoadmapStep[]
  onStepClick: (step: RoadmapStep) => void
  completedSteps: string[]
}

const RoadmapSection = ({ title, description, steps, onStepClick, completedSteps }: RoadmapSectionProps) => {
  return (
    <div className="mb-16" id={title.toLowerCase().replace(/\s+/g, '-')}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-emerald-900">{title}</h2>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      <div className="space-y-4">
        {steps.map((step) => (
          <RoadmapStep 
            key={step.id} 
            step={step} 
            onClick={onStepClick} 
            isCompleted={completedSteps.includes(step.id)} 
          />
        ))}
      </div>
    </div>
  )
}

interface RoadmapStepProps {
  step: RoadmapStep
  onClick: (step: RoadmapStep) => void
  isCompleted?: boolean
}

const RoadmapStep = ({ step, onClick, isCompleted = false }: RoadmapStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        relative flex items-center gap-4 p-4 rounded-lg border border-emerald-100 
        ${isCompleted ? "bg-emerald-50" : "bg-white"} 
        shadow-sm hover:shadow-md transition-all cursor-pointer
        hover:border-emerald-300 group
      `}
      onClick={() => onClick(step)}
    >
      <div className={`p-3 rounded-lg ${step.iconBg}`}>
        <step.icon className={`h-5 w-5 ${step.iconColor}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-emerald-900 group-hover:text-emerald-700">{step.title}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              {step.timeToComplete}
            </Badge>
            {isCompleted && (
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                Completed
              </Badge>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">{step.description}</p>
        
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">Difficulty:</span>
            <div className="flex">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full mx-0.5 ${
                    i < step.difficulty 
                      ? "bg-emerald-500" 
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <span className="text-xs text-emerald-700 flex items-center gap-1">
            <ExternalLink className="h-3 w-3" />
            {step.resources.length} resources
          </span>
        </div>
      </div>
    </motion.div>
  )
}

interface VerticalRoadmapProps {
  onStepClick: (step: RoadmapStep) => void
  completedSteps: string[]
}

export default function VerticalRoadmap({ onStepClick, completedSteps }: VerticalRoadmapProps) {
  const [activeSection, setActiveSection] = useState("fundamentals")

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const fundamentalsSteps: RoadmapStep[] = [
    {
      id: "1-1",
      title: "Computer Science Basics",
      description: "Learn fundamental computer science concepts like algorithms, data structures, and computational thinking.",
      icon: Cpu,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      timeToComplete: "4-6 weeks",
      difficulty: 2,
      resources: [
        {
          title: "CS50: Introduction to Computer Science",
          url: "https://cs50.harvard.edu/",
          source: "Harvard University",
          description: "A comprehensive introduction to computer science and programming"
        },
        {
          title: "Data Structures and Algorithms",
          url: "#",
          source: "Coursera",
          description: "Learn essential data structures and algorithms"
        },
        {
          title: "Computational Thinking for Problem Solving",
          url: "#",
          source: "edX",
          description: "Develop a systematic approach to solving problems"
        }
      ],
      tips: "Focus on understanding core concepts rather than memorizing. Practice implementing basic data structures and algorithms from scratch."
    },
    {
      id: "1-2",
      title: "Programming Fundamentals",
      description: "Master a programming language like Python, JavaScript, or Java and understand programming concepts.",
      icon: Code,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      timeToComplete: "6-8 weeks",
      difficulty: 2,
      resources: [
        {
          title: "The Modern JavaScript Tutorial",
          url: "https://javascript.info/",
          source: "JavaScript.info",
          description: "Comprehensive JavaScript guide from basics to advanced topics"
        },
        {
          title: "Python for Everybody",
          url: "#",
          source: "University of Michigan",
          description: "A complete introduction to Python programming"
        },
        {
          title: "Java Programming and Software Engineering Fundamentals",
          url: "#",
          source: "Duke University",
          description: "Master Java basics and software engineering principles"
        }
      ],
      tips: "Choose one programming language and master it before moving to others. Practice by building small projects."
    },
    {
      id: "1-3",
      title: "Command Line & Git",
      description: "Learn to navigate the command line interface and use Git for version control.",
      icon: Terminal,
      iconColor: "text-gray-700",
      iconBg: "bg-gray-100",
      timeToComplete: "2-3 weeks",
      difficulty: 1,
      resources: [
        {
          title: "The Missing Semester of Your CS Education",
          url: "https://missing.csail.mit.edu/",
          source: "MIT CSAIL",
          description: "Course on command line, Git, and other developer tools"
        },
        {
          title: "Pro Git Book",
          url: "https://git-scm.com/book/en/v2",
          source: "Git Community",
          description: "Complete guide to Git version control"
        },
        {
          title: "Bash Guide for Beginners",
          url: "#",
          source: "Linux Documentation Project",
          description: "Introduction to Bash scripting and command line"
        }
      ],
      tips: "Practice Git commands by creating a personal project and making regular commits. Use the command line for daily tasks to build muscle memory."
    }
  ]

  const backendBasicsSteps: RoadmapStep[] = [
    {
      id: "2-1",
      title: "Web Development Basics",
      description: "Learn the fundamentals of how the web works, including HTTP, URLs, and basic client-server architecture.",
      icon: Globe,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      timeToComplete: "3-4 weeks",
      difficulty: 1,
      resources: [
        {
          title: "MDN Web Docs - Learn web development",
          url: "https://developer.mozilla.org/en-US/docs/Learn",
          source: "Mozilla",
          description: "Comprehensive guide to web technologies"
        },
        {
          title: "How the Web Works",
          url: "#",
          source: "W3Schools",
          description: "Introduction to web architecture and protocols"
        },
        {
          title: "HTTP Fundamentals",
          url: "#",
          source: "Codecademy",
          description: "Learn about HTTP requests, responses, and methods"
        }
      ],
      tips: "Build a simple static website to understand how HTML, CSS, and JavaScript work together."
    },
    {
      id: "2-2",
      title: "Backend Languages",
      description: "Choose a backend language (Node.js, Python, Java, C#, etc.) and learn it thoroughly.",
      icon: Code,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      timeToComplete: "8-10 weeks",
      difficulty: 2,
      resources: [
        {
          title: "Node.js Tutorial",
          url: "https://nodejs.dev/learn",
          source: "Node.js Foundation",
          description: "Official guide to Node.js development"
        },
        {
          title: "Django for Beginners",
          url: "#",
          source: "Django Project",
          description: "Learn Python backend development with Django"
        },
        {
          title: "Spring Boot Reference Documentation",
          url: "#",
          source: "Spring",
          description: "Guide to Java backend development with Spring Boot"
        }
      ],
      tips: "Choose a language based on your previous experience and job market demand. Build a CRUD API to practice."
    },
    {
      id: "2-3",
      title: "APIs and RESTful Services",
      description: "Learn how to design, build, and consume APIs using RESTful principles.",
      icon: Server,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
      timeToComplete: "4-6 weeks",
      difficulty: 2,
      resources: [
        {
          title: "RESTful Web Services",
          url: "#",
          source: "O'Reilly",
          description: "Complete guide to designing RESTful APIs"
        },
        {
          title: "API Design Patterns",
          url: "#",
          source: "Manning Publications",
          description: "Best practices for API design"
        },
        {
          title: "Building Web APIs with Node.js",
          url: "#",
          source: "Pluralsight",
          description: "Practical guide to building APIs with Node.js"
        }
      ],
      tips: "Practice by creating a small API project and document it with tools like Swagger or Postman."
    }
  ]

  const databasesSteps: RoadmapStep[] = [
    {
      id: "3-1",
      title: "Database Fundamentals",
      description: "Learn database concepts, design principles, and SQL basics.",
      icon: Database,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      timeToComplete: "4-6 weeks",
      difficulty: 2,
      resources: [
        {
          title: "Introduction to Databases",
          url: "https://www.edx.org/learn/databases",
          source: "Stanford Online",
          description: "Comprehensive introduction to database systems"
        },
        {
          title: "SQL for Beginners",
          url: "#",
          source: "Mode Analytics",
          description: "Interactive SQL tutorials for beginners"
        },
        {
          title: "Database Design",
          url: "#",
          source: "FreeCodeCamp",
          description: "Learn database design principles and normalization"
        }
      ],
      tips: "Practice writing SQL queries regularly and try designing a database for a real-world scenario."
    },
    {
      id: "3-2",
      title: "SQL Databases",
      description: "Learn how to work with relational database systems like PostgreSQL, MySQL, or SQL Server.",
      icon: Database,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      timeToComplete: "6-8 weeks",
      difficulty: 2,
      resources: [
        {
          title: "PostgreSQL Tutorial",
          url: "https://www.postgresqltutorial.com/",
          source: "PostgreSQL Tutorial",
          description: "Complete guide to PostgreSQL database"
        },
        {
          title: "MySQL Documentation",
          url: "#",
          source: "MySQL",
          description: "Official documentation and tutorials for MySQL"
        },
        {
          title: "SQL Performance Tuning",
          url: "#",
          source: "Pragmatic Bookshelf",
          description: "Learn how to optimize SQL queries"
        }
      ],
      tips: "Set up a local database server and practice creating tables, relationships, and queries. Experiment with indexing and query optimization."
    },
    {
      id: "3-3",
      title: "NoSQL Databases",
      description: "Explore non-relational databases like MongoDB, Redis, or Firebase and understand their use cases.",
      icon: Database,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      timeToComplete: "4-6 weeks",
      difficulty: 2,
      resources: [
        {
          title: "MongoDB University",
          url: "https://university.mongodb.com/",
          source: "MongoDB",
          description: "Free courses on MongoDB from basics to advanced topics"
        },
        {
          title: "Redis Documentation",
          url: "#",
          source: "Redis",
          description: "Official documentation and tutorials for Redis"
        },
        {
          title: "Firebase Guides",
          url: "#",
          source: "Google Firebase",
          description: "Learn how to use Firebase as a backend database"
        }
      ],
      tips: "Build a small project using a NoSQL database to understand when and why you might choose NoSQL over SQL databases."
    }
  ]

  const advancedSteps: RoadmapStep[] = [
    {
      id: "4-1",
      title: "Authentication & Security",
      description: "Learn about authentication, authorization, and security best practices for backend applications.",
      icon: Lock,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      timeToComplete: "6-8 weeks",
      difficulty: 3,
      resources: [
        {
          title: "Web Security Academy",
          url: "https://portswigger.net/web-security",
          source: "PortSwigger",
          description: "Free online web security training with interactive labs"
        },
        {
          title: "OAuth 2.0 Simplified",
          url: "#",
          source: "Aaron Parecki",
          description: "Guide to understanding and implementing OAuth 2.0"
        },
        {
          title: "OWASP Top 10",
          url: "#",
          source: "OWASP",
          description: "Learn about the most critical web application security risks"
        }
      ],
      tips: "Implement authentication in a project using industry standards like JWT, OAuth, or social logins. Regularly review OWASP security guidelines."
    },
    {
      id: "4-2",
      title: "Cloud Services",
      description: "Learn about cloud platforms (AWS, Azure, GCP) and how to deploy and manage applications in the cloud.",
      icon: Cloud,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      timeToComplete: "8-10 weeks",
      difficulty: 3,
      resources: [
        {
          title: "AWS Training and Certification",
          url: "https://aws.amazon.com/training/",
          source: "Amazon Web Services",
          description: "Official training resources for AWS"
        },
        {
          title: "Azure Fundamentals",
          url: "#",
          source: "Microsoft Learn",
          description: "Introduction to Microsoft Azure cloud services"
        },
        {
          title: "Google Cloud Training",
          url: "#",
          source: "Google Cloud",
          description: "Learning paths for Google Cloud Platform"
        }
      ],
      tips: "Start with one cloud provider and learn it thoroughly before exploring others. Deploy a simple application to gain hands-on experience."
    },
    {
      id: "4-3",
      title: "Microservices",
      description: "Learn about microservice architecture, its benefits, challenges, and implementation strategies.",
      icon: Server,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      timeToComplete: "6-8 weeks",
      difficulty: 3,
      resources: [
        {
          title: "Microservices.io",
          url: "https://microservices.io/",
          source: "Chris Richardson",
          description: "Patterns and best practices for microservices"
        },
        {
          title: "Building Microservices",
          url: "#",
          source: "O'Reilly",
          description: "Comprehensive guide to designing microservices"
        },
        {
          title: "Docker and Kubernetes for Microservices",
          url: "#",
          source: "LinkedIn Learning",
          description: "Learn how to containerize and orchestrate microservices"
        }
      ],
      tips: "Start by breaking down a monolithic application into microservices to understand the challenges and benefits firsthand."
    }
  ]

  return (
    <div>
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 sticky top-0 bg-white z-10 pt-4">
        {["fundamentals", "backend-basics", "databases", "advanced"].map((section) => (
          <Button
            key={section}
            variant="outline"
            className={`whitespace-nowrap ${
              activeSection === section
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "border-gray-200"
            }`}
            onClick={() => scrollToSection(section)}
          >
            {section === "fundamentals" && "Fundamentals"}
            {section === "backend-basics" && "Backend Basics"}
            {section === "databases" && "Databases"}
            {section === "advanced" && "Advanced Topics"}
          </Button>
        ))}
      </div>

      <div className="space-y-8">
        <RoadmapSection
          title="Fundamentals"
          description="Master the core computer science and programming concepts that serve as the foundation for backend development."
          steps={fundamentalsSteps}
          onStepClick={onStepClick}
          completedSteps={completedSteps}
        />

        <Separator className="bg-emerald-100" />

        <RoadmapSection
          title="Backend Basics"
          description="Learn the essential concepts and technologies for building backend applications."
          steps={backendBasicsSteps}
          onStepClick={onStepClick}
          completedSteps={completedSteps}
        />

        <Separator className="bg-emerald-100" />

        <RoadmapSection
          title="Databases"
          description="Master various database technologies and learn how to effectively design and query data storage systems."
          steps={databasesSteps}
          onStepClick={onStepClick}
          completedSteps={completedSteps}
        />

        <Separator className="bg-emerald-100" />

        <RoadmapSection
          title="Advanced Topics"
          description="Explore advanced backend development concepts to take your skills to the next level."
          steps={advancedSteps}
          onStepClick={onStepClick}
          completedSteps={completedSteps}
        />
      </div>
    </div>
  )
} 