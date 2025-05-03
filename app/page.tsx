"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BrainCircuit, LineChart, BookOpen } from "lucide-react"
import RoadmapPreview from "@/components/roadmap-preview"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Home() {
  const [careerInput, setCareerInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (careerInput.trim()) {
      window.location.href = `/roadmap?career=${encodeURIComponent(careerInput)}`
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#E8F5E9] to-white overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <motion.div
            className="flex flex-col items-center space-y-8 text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.div className="space-y-4 max-w-3xl" variants={fadeIn}>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-[#1B5E20]">
                Your Career. Visualized.
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-2xl">
                Type your dream job. We'll show you how to get there.
              </p>
            </motion.div>

            <motion.div className="w-full max-w-xl space-y-4" variants={fadeIn}>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full gap-3">
                <Input
                  type="text"
                  placeholder="e.g. AI Researcher, UX Designer, Data Scientist..."
                  className="border-[#A5D6A7] focus:border-[#2E7D32] focus:ring-[#2E7D32] text-lg py-6 px-4"
                  value={careerInput}
                  onChange={(e) => setCareerInput(e.target.value)}
                />
                <Button type="submit" className="bg-[#2E7D32] hover:bg-[#1B5E20] text-lg py-6 px-6">
                  Generate Roadmap
                </Button>
              </form>
            </motion.div>

            <motion.div
              className="absolute right-10 top-10 hidden lg:block"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Image
                src="/placeholder.svg?height=300&width=300"
                width={300}
                height={300}
                alt="Career illustration"
                className="opacity-80"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Jolym Section */}
      <section className="w-full py-16 md:py-24 bg-[#F1F8E9]">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#1B5E20]">Why Jolym</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Our platform helps you visualize and achieve your career goals
            </p>
          </motion.div>

          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="flex flex-col items-center text-center space-y-4" variants={fadeIn}>
              <div className="rounded-full bg-[#A5D6A7] p-4">
                <BrainCircuit className="h-8 w-8 text-[#2E7D32]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2E7D32]">Powered by AI</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes thousands of career paths to create personalized roadmaps tailored to your
                goals.
              </p>
            </motion.div>

            <motion.div className="flex flex-col items-center text-center space-y-4" variants={fadeIn}>
              <div className="rounded-full bg-[#A5D6A7] p-4">
                <LineChart className="h-8 w-8 text-[#2E7D32]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2E7D32]">Clear Paths</h3>
              <p className="text-gray-600">
                Visualize your entire career journey with clear milestones, helping you understand each step.
              </p>
            </motion.div>

            <motion.div className="flex flex-col items-center text-center space-y-4" variants={fadeIn}>
              <div className="rounded-full bg-[#A5D6A7] p-4">
                <BookOpen className="h-8 w-8 text-[#2E7D32]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2E7D32]">Resources That Matter</h3>
              <p className="text-gray-600">
                Get curated resources for each step, including courses, books, and practical advice to help you
                progress.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#1B5E20]">How It Works</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Three simple steps to map your career journey
            </p>
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-16 left-[calc(16.67%+8px)] right-[calc(16.67%+8px)] h-0.5 bg-[#A5D6A7]"></div>

              <motion.div
                className="flex flex-col items-center text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="rounded-full bg-[#2E7D32] text-white w-10 h-10 flex items-center justify-center text-lg font-bold mb-2 z-10">
                  1
                </div>
                <h3 className="text-xl font-semibold text-[#2E7D32]">Enter Your Dream Job</h3>
                <p className="text-gray-600">
                  Tell us what career you aspire to have, and our AI will analyze the best path to get there.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="rounded-full bg-[#2E7D32] text-white w-10 h-10 flex items-center justify-center text-lg font-bold mb-2 z-10">
                  2
                </div>
                <h3 className="text-xl font-semibold text-[#2E7D32]">Get Your Roadmap</h3>
                <p className="text-gray-600">
                  Receive a personalized, step-by-step visual roadmap tailored to your specific career goal.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="rounded-full bg-[#2E7D32] text-white w-10 h-10 flex items-center justify-center text-lg font-bold mb-2 z-10">
                  3
                </div>
                <h3 className="text-xl font-semibold text-[#2E7D32]">Track Your Progress</h3>
                <p className="text-gray-600">
                  Follow your roadmap, access resources, and track your progress as you advance toward your goal.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-24 bg-[#F1F8E9]">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#1B5E20]">What Our Users Say</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Hear from professionals who have used Jolym to advance their careers
            </p>
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    "Jolym helped me visualize my path to becoming a data scientist. The roadmap was incredibly detailed
                    and the resources were spot on."
                  </p>
                  <div className="flex items-center space-x-3 pt-4">
                    <div className="w-10 h-10 rounded-full bg-[#A5D6A7] flex items-center justify-center">
                      <span className="text-[#2E7D32] font-semibold">JD</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Jamie Davis</p>
                      <p className="text-sm text-gray-500">Data Scientist</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    "As a career changer, I was lost on how to transition to UX design. Jolym gave me a clear path and
                    saved me months of research."
                  </p>
                  <div className="flex items-center space-x-3 pt-4">
                    <div className="w-10 h-10 rounded-full bg-[#A5D6A7] flex items-center justify-center">
                      <span className="text-[#2E7D32] font-semibold">SL</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sarah Lee</p>
                      <p className="text-sm text-gray-500">UX Designer</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-md md:col-span-2 lg:col-span-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    "The resources provided with each step were invaluable. I'm now halfway through my roadmap to
                    becoming a full-stack developer."
                  </p>
                  <div className="flex items-center space-x-3 pt-4">
                    <div className="w-10 h-10 rounded-full bg-[#A5D6A7] flex items-center justify-center">
                      <span className="text-[#2E7D32] font-semibold">MJ</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Michael Johnson</p>
                      <p className="text-sm text-gray-500">Web Developer</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-[#2E7D32]">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Ready to Map Your Career Journey?
            </h2>
            <p className="mx-auto max-w-[700px] text-[#A5D6A7] md:text-xl">
              Join thousands of professionals who have transformed their careers with Jolym.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/register">
                <Button className="bg-white text-[#2E7D32] hover:bg-gray-100 text-lg px-8 py-6">Get Started</Button>
              </Link>
              <Link href="/roadmaps">
                <Button variant="outline" className="text-white border-white hover:bg-[#1B5E20] text-lg px-8 py-6">
                  Explore Roadmaps
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
