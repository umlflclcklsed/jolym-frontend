"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

interface CultureType {
    id: string
    name: string
    region: string
    image: string
    shortDescription: string
  }
  

// Данные о народах
const culturesData = {
  sami: {
    id: "sami",
    name: "Sámi",
    region: "Northern Europe",
    image: "/placeholder.svg?height=400&width=600",
    shortDescription:
      "Коренной народ северной Скандинавии и Кольского полуострова России, известный своим оленеводством и яркой культурой.",
  },
  hmong: {
    id: "hmong",
    name: "Hmong",
    region: "Southeast Asia",
    image: "/placeholder.svg?height=400&width=600",
    shortDescription:
      "Этническая группа из горных районов Китая, Вьетнама, Лаоса и Таиланда с богатыми традициями вышивки и устного творчества.",
  },
  maori: {
    id: "maori",
    name: "Māori",
    region: "New Zealand",
    image: "/placeholder.svg?height=400&width=600",
    shortDescription:
      "Коренной полинезийский народ Новой Зеландии с богатыми традициями резьбы, татуировки и исполнительского искусства.",
  },
  inuit: {
    id: "inuit",
    name: "Inuit",
    region: "Arctic",
    image: "/placeholder.svg?height=400&width=600",
    shortDescription:
      "Коренные жители арктических регионов Канады, Аляски и Гренландии, известные своими навыками выживания в суровых условиях.",
  },
  yanomami: {
    id: "yanomami",
    name: "Yanomami",
    region: "Amazon Rainforest",
    image: "/placeholder.svg?height=400&width=600",
    shortDescription: "Коренной народ Амазонии, проживающий в тропических лесах на границе Венесуэлы и Бразилии.",
  },
}
function getCultureOfTheDay(): CultureType {
    const cultures = Object.values(culturesData)
    const today = new Date()
    
    const start = new Date(today.getFullYear(), 0, 0).getTime()
    const current = today.getTime()
    
    const dayOfYear = Math.floor((current - start) / (1000 * 60 * 60 * 24))
    const cultureIndex = dayOfYear % cultures.length
    
    return cultures[cultureIndex]
  }
  
  export default function CultureOfTheDay() {
    const [culture, setCulture] = useState<CultureType | null>(null)
  
    useEffect(() => {
      setCulture(getCultureOfTheDay())
    }, [])
  
    if (!culture) {
      return <div className="text-center">Загрузка...</div>
    }
  
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={culture.image} 
                alt={culture.name} 
                className="w-full h-full object-cover" 
              />
            </div>
  
            <div className="flex flex-col p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
  
              <CardTitle className="text-2xl md:text-3xl mb-2">{culture.name}</CardTitle>
              <CardDescription className="text-lg mb-2">{culture.region}</CardDescription>
  
              <p className="mt-4 flex-grow">{culture.shortDescription}</p>
  
              <CardFooter className="px-0 pt-6">
                <Button asChild>
                  <Link href={`/cultures/${culture.id}`}>Узнать больше</Link>
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
    )
  }