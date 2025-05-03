"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type AudioVisualizerProps = {
  isPlaying: boolean
  className?: string
  color?: string
}

export function AudioVisualizer({ isPlaying, className, color = "#D97706" }: AudioVisualizerProps) {
  const bars = [0, 1, 2, 3]

  return (
    <div className={cn("flex items-center gap-[2px] h-3", className)}>
      {bars.map((i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-current rounded-full"
          initial={{ height: "30%" }}
          animate={{
            height: isPlaying ? ["30%", "80%", "40%", "70%", "30%"] : "30%",
          }}
          transition={{
            duration: 1.2,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
            repeatType: "loop",
            delay: i * 0.2,
            ease: "easeInOut",
          }}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}
