"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function CultureLoader() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="relative flex flex-col items-center">
        <div className="relative w-32 h-32">
          {/* Outer circle */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Spinning arc */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Inner spinning arc */}
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-transparent border-t-primary/70 border-r-primary/70"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 -ml-2 -mt-2 bg-primary rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Pulsing dots around */}
          {[0, 60, 120, 180, 240, 300].map((degree, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{
                top: `calc(50% + ${Math.sin((degree * Math.PI) / 180) * 60}px)`,
                left: `calc(50% + ${Math.cos((degree * Math.PI) / 180) * 60}px)`,
                marginLeft: "-4px",
                marginTop: "-4px",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
                repeatType: "loop",
              }}
            />
          ))}
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-2xl font-heading font-bold mb-2">Loading Culture</h2>
          <p className="text-muted-foreground">Opening a world of traditions and heritage...</p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -z-10">
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </div>
      </div>
    </div>
  )
}
