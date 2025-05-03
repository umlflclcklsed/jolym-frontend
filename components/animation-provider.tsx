"use client"

import { createContext, useContext, type ReactNode } from "react"
import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

type AnimationContextType = {
  exitAnimation: boolean
}

const AnimationContext = createContext<AnimationContextType>({
  exitAnimation: false,
})

export const useAnimation = () => useContext(AnimationContext)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimationContext.Provider value={{ exitAnimation: false }}>
      <AnimatePresence mode="wait" initial={false}>
        <div key={pathname}>{children}</div>
      </AnimatePresence>
    </AnimationContext.Provider>
  )
}
