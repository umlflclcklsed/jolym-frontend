"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

type AnimatedSectionProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 50,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 })

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance }
      case "down":
        return { y: -distance }
      case "left":
        return { x: distance }
      case "right":
        return { x: -distance }
      case "none":
        return {}
      default:
        return { y: distance }
    }
  }

  const variants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: delay,
      },
    },
  }

  return (
    <motion.section
      ref={ref as any}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.section>
  )
}
