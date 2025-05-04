"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Server, BookOpen, CheckCircle2 } from "lucide-react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

export default function RoadmapPreview() {
  return (
    <Card className="border-emerald-100 shadow-md overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-emerald-900">Backend Developer Roadmap</h3>
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Preview</Badge>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-emerald-100 rounded-full"></div>

          {/* Steps */}
          <div className="space-y-8">
            {[
              {
                title: "Programming Fundamentals",
                description: "Master a programming language like Python, JavaScript, or Java",
                icon: Code,
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600",
              },
              {
                title: "Web Servers & Frameworks",
                description: "Learn to build web applications with frameworks like Express, Django, or Spring",
                icon: Server,
                iconBg: "bg-red-100",
                iconColor: "text-red-600",
              },
              {
                title: "Databases",
                description: "Understand SQL, NoSQL, and database design principles",
                icon: Database,
                iconBg: "bg-purple-100",
                iconColor: "text-purple-600",
              },
              {
                title: "Advanced Concepts",
                description: "Explore caching, microservices, and message queues",
                icon: BookOpen,
                iconBg: "bg-yellow-100",
                iconColor: "text-yellow-600",
              },
            ].map((step, index) => (
              <div key={index} className="relative pl-12">
                {/* Circle on the line */}
                <div className="absolute left-4 top-1.5 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-500 border-4 border-emerald-100"></div>

                {/* Content */}
                <div className="flex items-start gap-4 p-4 rounded-lg border border-emerald-100 bg-white shadow-sm">
                  <div className={`p-3 rounded-lg ${step.iconBg}`}>
                    <step.icon className={`h-5 w-5 ${step.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-900">{step.title}</h4>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Final step */}
            <div className="relative pl-12">
              <div className="absolute left-4 top-1.5 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-700 border-4 border-emerald-100"></div>
              <div className="flex items-center gap-2 p-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                <span className="font-medium text-emerald-800">Backend Developer</span>
                <ArrowRightIcon className="h-4 w-4 text-emerald-700 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
