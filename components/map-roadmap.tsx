"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, ZoomIn, ZoomOut, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { RoadmapData, RoadmapNode } from "@/lib/groq-service"

interface MapRoadmapProps {
  roadmapData: RoadmapData
  onNodeClick: (node: RoadmapNode) => void
}

export default function MapRoadmap({ roadmapData, onNodeClick }: MapRoadmapProps) {
  const [activeSection, setActiveSection] = useState(0)
  const [zoom, setZoom] = useState(1)
  const mapRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dragStartRef = useRef({ x: 0, y: 0 })
  const positionRef = useRef({ x: 0, y: 0 })

  // Handle section navigation
  const nextSection = () => {
    if (activeSection < roadmapData.sections.length - 1) {
      setActiveSection(activeSection + 1)
    }
  }

  const prevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1)
    }
  }

  // Handle zoom
  const zoomIn = () => {
    setZoom(Math.min(zoom + 0.2, 2))
  }

  const zoomOut = () => {
    setZoom(Math.max(zoom - 0.2, 0.5))
  }

  // Handle map dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    positionRef.current = { ...position }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y

    setPosition({
      x: positionRef.current.x + dx,
      y: positionRef.current.y + dy,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Reset position when section changes
  useEffect(() => {
    setPosition({ x: 0, y: 0 })
  }, [activeSection])

  // Add mouse events to document
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y

      setPosition({
        x: positionRef.current.x + dx,
        y: positionRef.current.y + dy,
      })
    }

    document.addEventListener("mouseup", handleGlobalMouseUp)
    document.addEventListener("mousemove", handleGlobalMouseMove)

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp)
      document.removeEventListener("mousemove", handleGlobalMouseMove)
    }
  }, [isDragging])

  if (!roadmapData || !roadmapData.sections.length) {
    return <div>No roadmap data available</div>
  }

  const currentSection = roadmapData.sections[activeSection]

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-lg border border-emerald-100 dark:border-emerald-800 bg-white dark:bg-gray-900">
      {/* Map controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button variant="outline" size="icon" onClick={zoomIn} className="bg-white dark:bg-gray-800">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={zoomOut} className="bg-white dark:bg-gray-800">
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Section navigation */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSection}
          disabled={activeSection === 0}
          className="bg-white dark:bg-gray-800"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100 px-3 py-1">
          {activeSection + 1} / {roadmapData.sections.length}
        </Badge>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSection}
          disabled={activeSection === roadmapData.sections.length - 1}
          className="bg-white dark:bg-gray-800"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Section title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <h3 className="text-lg font-bold px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-emerald-100 dark:border-emerald-800">
          {currentSection.title}
        </h3>
      </div>

      {/* Map area */}
      <div
        ref={mapRef}
        className={cn("w-full h-full relative", isDragging ? "cursor-grabbing" : "cursor-grab")}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: "center",
          }}
        >
          {/* Map background */}
          <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-950/20">
            {/* Grid lines */}
            <div className="absolute inset-0" style={{ backgroundSize: "40px 40px", opacity: 0.2 }}>
              <div
                className="absolute inset-0 bg-grid-pattern"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(16, 185, 129, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.2) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              ></div>
            </div>

            {/* Nodes */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                {/* Section description */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 max-w-md text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-emerald-100 dark:border-emerald-800">
                  <p className="text-gray-600 dark:text-gray-300">{currentSection.description}</p>
                </div>

                {/* Nodes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[800px] h-[400px]">
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                      {currentSection.nodes.map((node, i) => {
                        if (i === 0) return null
                        const prevNode = currentSection.nodes[i - 1]
                        return (
                          <line
                            key={`line-${node.id}`}
                            x1={(i - 1) * (800 / (currentSection.nodes.length - 1)) + 50}
                            y1="200"
                            x2={i * (800 / (currentSection.nodes.length - 1)) + 50}
                            y2="200"
                            stroke="#10b981"
                            strokeWidth="3"
                            strokeDasharray="5,5"
                            className="dark:stroke-emerald-600"
                          />
                        )
                      })}
                    </svg>

                    {currentSection.nodes.map((node, i) => {
                      const isCompleted = node.progress?.completed
                      const x = i * (800 / (currentSection.nodes.length - 1))
                      return (
                        <motion.div
                          key={node.id}
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                          className={cn(
                            "absolute transform -translate-x-1/2 -translate-y-1/2 w-[180px] h-[120px] rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:scale-105",
                            isCompleted
                              ? "bg-emerald-100 dark:bg-emerald-900/50 border-2 border-emerald-500"
                              : "bg-white dark:bg-gray-800 border border-emerald-100 dark:border-emerald-800",
                          )}
                          style={{ left: x + 50, top: 200 }}
                          onClick={() => onNodeClick(node)}
                        >
                          <div className="absolute -top-3 -right-3 z-10">
                            {isCompleted && (
                              <div className="bg-emerald-500 text-white rounded-full p-1">
                                <Check className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <div className="p-4 flex flex-col items-center justify-center h-full">
                            <div className={`p-2 rounded-lg ${node.iconBg} mb-2`}>
                              <DynamicIcon iconName={node.icon} className={`h-5 w-5 ${node.iconColor}`} />
                            </div>
                            <h4 className="font-medium text-center text-sm">{node.title}</h4>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component to render dynamic icons
function DynamicIcon({ iconName, className }: { iconName: string; className?: string }) {
  const icons: Record<string, React.ElementType> = {
    Code: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    Database: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>
    ),
    // Add more icons as needed
  }

  const IconComponent = icons[iconName] || icons.Code

  return <IconComponent className={className} />
}
