"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Code,
  Database,
  Server,
  Globe,
  Lock,
  Cpu,
  Cloud,
  Layers,
  Zap,
  BarChart,
  Wrench,
  FileCode,
  HardDrive,
  Network,
  Workflow,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { RoadmapData, RoadmapNode, RoadmapSection } from "@/lib/groq-service"
import { RocketIcon, GearIcon } from "@radix-ui/react-icons"

interface RoadmapNodeProps {
  node: RoadmapNode
  onClick: (node: RoadmapNode) => void
  isCompleted?: boolean
}

const RoadmapNodeComponent = ({ node, onClick, isCompleted = false }: RoadmapNodeProps) => {
  // Map icon string to component
  const icons: Record<string, React.ElementType> = {
    Code,
    Database,
    Server,
    Globe,
    Terminal,
    Lock,
    Cpu,
    Cloud,
    Layers,
    Zap,
    BarChart,
    Wrench,
    FileCode,
    Settings,
    HardDrive,
    Network,
    Workflow,
    CheckCircle2,
  }

  const IconComponent = icons[node.icon] || Database

  return (
    <div
      className={`
        relative flex items-center gap-4 p-4 rounded-lg border border-emerald-100 
        ${isCompleted ? "bg-emerald-50" : "bg-white"} 
        shadow-sm hover:shadow-md transition-all cursor-pointer
        hover:border-emerald-300 group
      `}
      onClick={() => onClick(node)}
    >
      <div className={`p-3 rounded-lg ${node.iconBg}`}>
        <IconComponent className={`h-5 w-5 ${node.iconColor}`} />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-emerald-900 group-hover:text-emerald-700">{node.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{node.description}</p>
      </div>
      {isCompleted && (
        <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
          Completed
        </Badge>
      )}
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-emerald-700 text-white rounded-full p-1">
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)

interface RoadmapSectionProps {
  section: RoadmapSection
  index: number
  onNodeClick: (node: RoadmapNode) => void
}

const RoadmapSectionComponent = ({ section, index, onNodeClick }: RoadmapSectionProps) => {
  return (
    <div className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-emerald-900">{`${index + 1}. ${section.title}`}</h2>
        <p className="text-gray-600">{section.description}</p>
      </div>
      <div className="space-y-4">
        {section.nodes.map((node) => (
          <RoadmapNodeComponent key={node.id} node={node} onClick={onNodeClick} />
        ))}
      </div>
    </div>
  )
}

interface BackendRoadmapProps {
  roadmapData?: RoadmapData
  onNodeClick: (node: RoadmapNode) => void
}

export default function BackendRoadmap({ roadmapData, onNodeClick }: BackendRoadmapProps) {
  const [activeSection, setActiveSection] = useState("")
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    if (!roadmapData || roadmapData.sections.length === 0) return

    // Set initial active section
    setActiveSection(roadmapData.sections[0].id)
  }, [roadmapData])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsScrolling(true)

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }

    // Reset scrolling state after animation completes
    setTimeout(() => setIsScrolling(false), 1000)
  }

  // Update active section based on scroll position
  useEffect(() => {
    if (isScrolling || !roadmapData) return

    const handleScroll = () => {
      const sections = roadmapData.sections.map((section) => section.id)

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolling, roadmapData])

  if (!roadmapData) {
    return <div>No roadmap data available</div>
  }

  return (
    <div className="relative">
      {/* Navigation sidebar */}
      <div className="hidden lg:block fixed left-8 top-1/3 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-md border border-emerald-100 z-10">
        <div className="space-y-2">
          <h3 className="font-medium text-emerald-800 mb-3">Roadmap Sections</h3>
          {roadmapData.sections.map((section, index) => (
            <Button
              key={section.id}
              variant="ghost"
              className={`w-full justify-start ${
                activeSection === section.id
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
              }`}
              onClick={() => scrollToSection(section.id)}
            >
              {`${index + 1}. ${section.title}`}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="lg:hidden mb-8 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {roadmapData.sections.map((section, index) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              className={
                activeSection === section.id
                  ? "bg-emerald-700 text-white"
                  : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              }
              onClick={() => scrollToSection(section.id)}
            >
              {`${index + 1}`}
            </Button>
          ))}
        </div>
      </div>

      {/* Roadmap content */}
      <div className="relative pl-0 lg:pl-48">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-emerald-100 rounded-full hidden md:block"></div>

        {/* Sections */}
        {roadmapData.sections.map((section, index) => (
          <div id={section.id} key={section.id} className="relative">
            <RoadmapSectionComponent section={section} index={index} onNodeClick={onNodeClick} />
          </div>
        ))}
      </div>
    </div>
  )
}
