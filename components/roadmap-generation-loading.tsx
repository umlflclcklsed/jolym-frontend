"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface RoadmapGenerationLoadingProps {
  className?: string
  message?: string
}

export function RoadmapGenerationLoading({
  className,
  message = "Generating your roadmap...",
}: RoadmapGenerationLoadingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef([
    "Analyzing career requirements...",
    "Identifying key skills...",
    "Mapping learning path...",
    "Curating resources...",
    "Structuring roadmap steps...",
    "Finalizing your personalized journey...",
  ])
  const currentMessageRef = useRef(0)
  const messageElementRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Create particles animation
    const container = containerRef.current
    if (!container) return

    // Update messages
    const messageInterval = setInterval(() => {
      if (messageElementRef.current) {
        messageElementRef.current.classList.remove("opacity-100")
        messageElementRef.current.classList.add("opacity-0")

        setTimeout(() => {
          if (messageElementRef.current) {
            currentMessageRef.current = (currentMessageRef.current + 1) % messagesRef.current.length
            messageElementRef.current.textContent = messagesRef.current[currentMessageRef.current]
            messageElementRef.current.classList.remove("opacity-0")
            messageElementRef.current.classList.add("opacity-100")
          }
        }, 500)
      }
    }, 3000)

    // Create particles
    const createParticle = () => {
      const particle = document.createElement("div")
      particle.classList.add("generation-particle")

      // Random size between 3-8px
      const size = Math.random() * 5 + 3
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random position
      const posX = Math.random() * container.offsetWidth
      const posY = Math.random() * container.offsetHeight
      particle.style.left = `${posX}px`
      particle.style.top = `${posY}px`

      // Random opacity
      particle.style.opacity = (Math.random() * 0.5 + 0.3).toString()

      container.appendChild(particle)

      // Animate particle
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 2 + 1
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed

      let positionX = posX
      let positionY = posY

      const animate = () => {
        positionX += vx
        positionY += vy

        // Check boundaries
        if (positionX < 0 || positionX > container.offsetWidth || positionY < 0 || positionY > container.offsetHeight) {
          container.removeChild(particle)
          return
        }

        particle.style.left = `${positionX}px`
        particle.style.top = `${positionY}px`

        requestAnimationFrame(animate)
      }

      animate()
    }

    // Create lines
    const createLine = () => {
      const line = document.createElement("div")
      line.classList.add("generation-line")

      // Random position
      const posY = Math.random() * container.offsetHeight
      line.style.top = `${posY}px`

      container.appendChild(line)

      // Remove after animation completes
      setTimeout(() => {
        container.removeChild(line)
      }, 1500)
    }

    // Create particles and lines at intervals
    const particleInterval = setInterval(createParticle, 200)
    const lineInterval = setInterval(createLine, 1000)

    return () => {
      clearInterval(particleInterval)
      clearInterval(lineInterval)
      clearInterval(messageInterval)
    }
  }, [])

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[400px]", className)}>
      <Card className="relative w-full max-w-md h-64 overflow-hidden border-emerald-200 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div ref={containerRef} className="absolute inset-0"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
          <div className="w-16 h-16 mb-6">
            <svg viewBox="0 0 24 24" className="w-full h-full text-emerald-500 animate-spin">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>

          <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-2">{message}</h3>
          <p
            ref={messageElementRef}
            className="text-gray-600 dark:text-gray-300 text-center transition-opacity duration-500 opacity-100"
          >
            {messagesRef.current[0]}
          </p>
        </div>
      </Card>
    </div>
  )
}
