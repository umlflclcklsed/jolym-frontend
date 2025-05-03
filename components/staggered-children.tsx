"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

type StaggeredChildrenProps = {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
}

export function StaggeredChildren({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  direction = "up",
  distance = 30,
}: StaggeredChildrenProps) {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref as any}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
