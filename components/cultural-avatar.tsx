"use client"

import { motion } from "framer-motion"
import { getCultureStyle } from "@/lib/culture-styles"

type CulturalAvatarProps = {
  cultureName: string
  size?: "sm" | "md" | "lg"
}

export function CulturalAvatar({ cultureName, size = "md" }: CulturalAvatarProps) {
  const style = getCultureStyle(cultureName)

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  return (
    <motion.div
      className={`relative rounded-full overflow-hidden border-2 ${style.borderColor} ${sizeClasses[size]}`}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${style.primaryColor} opacity-30`} />
      <img
        src={style.avatarImage || "/placeholder.svg"}
        alt={`${cultureName} representative`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center text-lg">{style.symbolElement}</div>
    </motion.div>
  )
}
