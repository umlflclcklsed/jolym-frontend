"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { getCultureStyle } from "@/lib/culture-styles"

type Culture = {
  id: string
  key: string
  name: string
  region: string
  continent: string
  images: string[]
}

type CultureCardProps = {
  culture: Culture
}

export function CultureCard({ culture }: CultureCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [autoplayEnabled, setAutoplayEnabled] = useState(false)
  const style = getCultureStyle(culture.name)

  // Убедимся, что у нас есть хотя бы одно изображение
  const images = culture.images.length > 0 ? culture.images : ["/placeholder.svg?height=300&width=400"]

  // Автоматическая смена изображений при наведении
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isHovered && images.length > 1 && autoplayEnabled) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 2000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isHovered, images.length, autoplayEnabled])

  // Включаем автоплей через небольшую задержку после наведения
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    if (isHovered && images.length > 1) {
      timeout = setTimeout(() => {
        setAutoplayEnabled(true)
      }, 500)
    } else {
      setAutoplayEnabled(false)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isHovered, images.length])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }
  }

  return (
    <Link href={`/cultures/${culture.key}`} passHref>
      <div
        className="group relative overflow-hidden rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-lg h-full flex flex-col"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Декоративный элемент */}
        <div
          className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full opacity-20 transition-all duration-500 group-hover:opacity-30 bg-gradient-to-br ${style.primaryColor}`}
        />

        {/* Контейнер для изображений */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`${culture.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </div>

        {/* Информация о культуре */}
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-xl font-heading font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
            {culture.name}
          </h3>
          <p className="text-muted-foreground mb-4">{culture.region}</p>

          <div className="mt-auto">
            <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform duration-300">
              Discover
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </div>
          </div>
        </div>

        {/* Декоративный элемент для культурного стиля */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 ${style.accentColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
        />
      </div>
    </Link>
  )
}
