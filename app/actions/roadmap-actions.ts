"use server"

import { generateRoadmap, type RoadmapData } from "@/lib/groq-service"

export async function generateRoadmapAction(career: string): Promise<RoadmapData> {
  try {
    // Generate roadmap using Groq
    const roadmapData = await generateRoadmap(career)

    // Save to backend (optional, can be implemented later)
    // await roadmapsAPI.createRoadmap(roadmapData);

    return roadmapData
  } catch (error) {
    console.error("Error in roadmap action:", error)
    throw new Error("Failed to generate roadmap")
  }
}
