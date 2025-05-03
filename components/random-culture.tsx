"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Shuffle } from "lucide-react"

interface Culture {
  id: string
  name: string
  region: string
  image: string
}

// Данные о народах
const cultures: Culture[] = [
  {
    id: "sami",
    name: "Sámi",
    region: "Northern Europe",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "hmong",
    name: "Hmong",
    region: "Southeast Asia",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "maori",
    name: "Māori",
    region: "New Zealand",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "inuit",
    name: "Inuit",
    region: "Arctic",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "yanomami",
    name: "Yanomami",
    region: "Amazon Rainforest",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "aboriginals",
    name: "Aboriginal Australians",
    region: "Australia",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "ainu",
    name: "Ainu",
    region: "Japan",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "san",
    name: "San",
    region: "Southern Africa",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "berber",
    name: "Berber",
    region: "North Africa",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "quechua",
    name: "Quechua",
    region: "Andes Mountains",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "navajo",
    name: "Navajo",
    region: "Southwestern United States",
    image: "/placeholder.svg?height=300&width=400",
  },
]

function getRandomCulture(): Culture {
  const randomIndex = Math.floor(Math.random() * cultures.length)
  return cultures[randomIndex]
}

export default function RandomCulture() {
  const [randomCultures, setRandomCultures] = useState<Culture[]>(() => [
    getRandomCulture(),
    getRandomCulture(),
    getRandomCulture(),
  ])

  // Убедимся, что все три культуры разные (с типизацией параметров)
  const ensureUniqueCultures = (cultures: Culture[]): Culture[] => {
    const uniqueCultures = [...new Map(cultures.map((item) => [item.id, item])).values()]

    while (uniqueCultures.length < 3) {
      const newCulture = getRandomCulture()
      if (!uniqueCultures.some((c) => c.id === newCulture.id)) {
        uniqueCultures.push(newCulture)
      }
    }

    return uniqueCultures
  }

  // Обработчик для кнопки "Показать другие"
  const handleShuffle = () => {
    const newRandomCultures = [getRandomCulture(), getRandomCulture(), getRandomCulture()]
    setRandomCultures(ensureUniqueCultures(newRandomCultures))
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {randomCultures.map((culture) => (
          <Card key={culture.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={culture.image || "/placeholder.svg"}
                alt={culture.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <CardHeader className="pb-2">
              <h3 className="text-xl font-semibold">{culture.name}</h3>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-muted-foreground">{culture.region}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/cultures/${culture.id}`}>Узнать больше</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button onClick={handleShuffle} variant="outline" size="lg">
          <Shuffle className="mr-2 h-4 w-4" />
          Показать другие народы
        </Button>
      </div>
    </div>
  )
}
