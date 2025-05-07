"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Paperclip, Mic, ThumbsUp, ThumbsDown } from "lucide-react"
import { PaperPlaneIcon, PersonIcon } from "@radix-ui/react-icons"

// Sample coach data
const coaches = [
  {
    id: "coach-1",
    name: "Sarah Johnson",
    title: "Career Development Coach",
    specialties: ["Career Transitions", "Tech Industry", "Interview Preparation"],
    experience: "10+ years",
    rating: 4.9,
    reviews: 128,
    availability: "Available now",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "coach-2",
    name: "Michael Chen",
    title: "Technical Career Coach",
    specialties: ["Software Development", "Data Science", "Technical Interviews"],
    experience: "8+ years",
    rating: 4.8,
    reviews: 94,
    availability: "Available in 2 hours",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "coach-3",
    name: "Priya Patel",
    title: "Leadership & Management Coach",
    specialties: ["Leadership Development", "Executive Coaching", "Team Management"],
    experience: "12+ years",
    rating: 4.9,
    reviews: 156,
    availability: "Available tomorrow",
    image: "/placeholder.svg?height=200&width=200",
  },
]

// Sample chat messages
const initialMessages = [
  {
    id: "1",
    sender: "bot",
    content: "Hi there! I'm your AI career coach. How can I help you today?",
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
]

export default function CoachPage() {
  const [activeTab, setActiveTab] = useState("ai-coach")
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null)
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "That's a great question about your career path. Based on your interests in technology and problem-solving, you might want to explore roles in software development or data analysis.",
        "I understand your concerns about changing careers. Many people successfully transition to new fields by leveraging their transferable skills and gaining relevant experience through projects or courses.",
        "For your resume, I'd recommend highlighting your achievements with specific metrics and tailoring it to each job application. Would you like me to review your current resume?",
        "Interview preparation is crucial. I suggest researching the company, practicing common questions, and preparing stories that demonstrate your skills and experience. Would you like to do a mock interview?",
        "Based on your background in marketing and interest in technology, roles like Product Marketing Manager or Digital Marketing Analyst could be great fits for your next career move.",
      ]
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        content: randomResponse,
        timestamp: new Date().toISOString(),
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }
  
  // Handle pressing Enter to send message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
              <span className="gradient-text">Career Coaching</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get personalized guidance from our AI coach or schedule a session with a human career expert
            </p>
          </motion.div>
          
          <Tabs defaultValue="ai-coach" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="ai-coach"
                className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400"
              >
                AI Coach
              </TabsTrigger>
              <TabsTrigger
                value="human-coach"
                className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400"
              >
                Human Coach
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai-coach">
              <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-emerald-200 dark:border-emerald-800">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Coach" />
                      <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-gray-900 dark:text-gray-100">AI Career Coach</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Available 24/7 for career guidance</p>
                    </div>
                  </div>
                </CardHeader>
                
                <div className="flex flex-col h-[600px]">
                  {/* Chat messages */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className="flex gap-3 max-w-[80%]">
                            {message.sender === "bot" && (
                              <Avatar className="h-8 w-8 mt-1 border border-emerald-200 dark:border-emerald-800">
                                <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                                  <Bot className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            
                            <div>
                              <div
                                className={`p-3 rounded-lg ${
                                  message.sender === "user"
                                    ? "bg-emerald-500 text-white dark:bg-emerald-600"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                }`}
                              >
                                <p>{message.content}</p>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">
                                {formatTime(message.timestamp)}
                              </p>
                              
                              {message.sender === "bot" && (
                                <div className="flex items-center gap-2 mt-1 ml-1">
                                  <Button variant="ghost" size="sm" className="h-6 px-2">
                                    <ThumbsUp className="h-3 w-3 text-gray-500" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 px-2">
                                    <ThumbsDown className="h-3 w-3 text-gray-500" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            
                            {message.sender === "user" && (
                              <Avatar className="h-8 w-8 mt-1 border border-emerald-200 dark:border-emerald-800">
                                <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                                  <PersonIcon className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex gap-3 max-w-[80%]">
                            <Avatar className="h-8 w-8 mt-1 border border-emerald-200 dark:border-emerald-800">
                              <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="p-3 rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                              <div className="flex space-x-2">
                                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  
                  {/* Chat input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex items-end gap-2">
                      <Button variant="outline" size="icon" className="rounded-full h-9 w-9 border-gray-200 dark:border-gray-800">
                        <Paperclip className="h-4 w-4 text-gray-500" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type your message..."
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleKeyPress}
                          className="pr-10 border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500"
                        >
                          <Mic className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="rounded-full h-9 w-9 p-0 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                      >
                        <PaperPlaneIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                      AI responses are generated for demonstration purposes and may not reflect professional advice.
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="human-coach">
              {!selectedCoach ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coaches.map((coach) => (
                    <motion.div
                      key={coach.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="border-gray-200 dark:border-gray-800 h-full hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center mb-4">
                            <Avatar className="h-24 w-24 border-4 border-emerald-100 dark:border-emerald-900 mb-4">
                              <AvatarImage src={coach.image || "/placeholder.svg"} alt={coach.name} />
                              <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                                {coach.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{coach.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{coach.title}</p>
                            
                            <div className="flex items-center mt-2">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(coach.rating)
                                        ? "text-yellow-400"
                                        : i < coach.rating
                                        ? "text-yellow-400/50"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="ml-2 text-gray-600 dark:text-gray-400">
                                {coach.rating} ({coach.reviews} reviews)
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Specialties</h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {coach.specialties.map((specialty) => (
                                  <span
                                    key={specialty}
                                    className="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience</h4>
                              <p className="text-gray-600 dark:text-gray-400">{coach.experience}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Availability</h4>
                              <p className="text-gray-600 dark:text-gray-400">{coach.availability}</p>
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => setSelectedCoach(coach.id)}
                            className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                          >
                            Book a Session
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCoach(null)}
                          className="text-gray-500"
                        >
                          ← Back to coaches
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="max-w-md mx-auto">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                          Book a Coaching Session
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Schedule a one-on-one session with {coaches.find(c => c.id === selectedCoach)?.name}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="session-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Session Type
                          </label>
                          <select
                            id="session-type"
                            className="w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 px-3 py-2"
                          >
                            <option value="initial">Initial Consultation (30 min)</option>
                            <option value="standard">Standard Session (60 min)</option>
                            <option value="deep-dive">Deep Dive Session (90 min)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="session-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Date
                          </label>
                          <Input
                            id="session-date"
                            type="date"
                            className="border-gray-200 dark:border-gray-800"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="session-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Time
                          </label>
                          <Input
                            id="session-time"
                            type="time"
                            className="border-gray-200 dark:border-gray-800"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="session-notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Session Notes (Optional)
                          </label>
                          <textarea
                            id="session-notes"
                            rows={4}
                            className="w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 px-3 py-2"
                            placeholder="Share any specific topics or questions you'd like to discuss..."
                          ></textarea>
                        </div>
                        
                        <Button className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                          Confirm Booking
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
