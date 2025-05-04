import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export interface RoadmapData {
  title: string
  description: string
  estimatedHours: number
  difficulty: number
  prerequisites: string[]
  careerLevel: string
  sections: RoadmapSection[]
}

export interface RoadmapSection {
  id: string
  title: string
  description: string
  nodes: RoadmapNode[]
}

export interface RoadmapNode {
  id: string
  title: string
  description: string
  icon: string
  iconColor: string
  iconBg: string
  timeToComplete: string
  difficulty: number
  resources: Resource[]
  tips?: string
}

export interface Resource {
  title: string
  url: string
  source: string
  description?: string
}

export async function generateRoadmap(career: string): Promise<RoadmapData> {
  const prompt = `
    Create a detailed career roadmap for becoming a ${career}.
    
    The response should be a valid JSON object with the following structure:
    {
      "title": "Career title",
      "description": "Brief description of the career",
      "estimatedHours": Total hours to complete (number),
      "difficulty": Difficulty level from 1-5 (number),
      "prerequisites": ["Prerequisite 1", "Prerequisite 2"],
      "careerLevel": "Entry to Senior",
      "sections": [
        {
          "id": "section-id",
          "title": "Section title",
          "description": "Section description",
          "nodes": [
            {
              "id": "node-id",
              "title": "Node title",
              "description": "Detailed description",
              "icon": "Icon name (choose from: Code, Database, Server, Globe, Terminal, Lock, Cpu, Cloud, Layers, Zap, BarChart, Wrench, FileCode, Settings, HardDrive, Network, Workflow, CheckCircle2, Palette, PenTool, LineChart, BookOpen, Briefcase, Building, Users, Heart, Microscope, Leaf, Music, Camera, Film, Lightbulb, DollarSign, TrendingUp, Smartphone, Shield, Truck)",
              "iconColor": "text-color-class (e.g., text-blue-600, text-green-600, text-purple-600, text-red-600, text-yellow-600, text-orange-600, text-indigo-600, text-pink-600, text-emerald-600)",
              "iconBg": "bg-color-class (e.g., bg-blue-100, bg-green-100, bg-purple-100, bg-red-100, bg-yellow-100, bg-orange-100, bg-indigo-100, bg-pink-100, bg-emerald-100)",
              "timeToComplete": "Estimated time (e.g., '4-6 weeks')",
              "difficulty": Difficulty level from 1-5 (number),
              "resources": [
                {
                  "title": "Resource title",
                  "url": "Resource URL",
                  "source": "Source name",
                  "description": "Brief description"
                }
              ],
              "tips": "Optional tips for this step"
            }
          ]
        }
      ]
    }
    
    Make sure to include 4-6 sections with 3-5 nodes each. Each node should have 2-4 resources.
    Choose appropriate icons that match the content of each node.
    Be specific, practical, and comprehensive.
    Tailor the roadmap specifically for the ${career} profession.
  `

  try {
    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt,
      temperature: 0.7,
      maxTokens: 4000,
    })

    // Parse the JSON response
    const roadmapData = JSON.parse(text) as RoadmapData
    return roadmapData
  } catch (error) {
    console.error("Error generating roadmap with Groq:", error)
    throw new Error("Failed to generate roadmap. Please try again later.")
  }
}
