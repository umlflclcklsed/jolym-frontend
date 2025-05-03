"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, User, Loader2, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { getCultureStyle } from "@/lib/culture-styles"
import { CulturalAvatar } from "@/components/cultural-avatar"
import { AudioPlayer } from "@/components/audio-player"
import type { Message, CultureInfo } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"
import { saveChatHistory, loadChatHistory, clearChatHistory } from "@/lib/chat-storage"

type CultureChatbotProps = {
  cultureName: string
  cultureInfo: CultureInfo
  onAudioLoaded?: () => void
}

export default function CultureChatbot({ cultureName, cultureInfo, onAudioLoaded }: CultureChatbotProps) {
  const style = getCultureStyle(cultureName)

  const [messages, setMessages] = useState<Message[]>(() => {
    // Пытаемся загрузить историю чата
    const savedMessages = loadChatHistory(cultureName)

    // Если есть сохраненная история, используем ее
    if (savedMessages.length > 0) {
      return savedMessages
    }

    // Иначе используем стандартные приветственные сообщения
    return [
      {
        id: "welcome-original",
        content: style.greeting,
        sender: "bot",
        timestamp: new Date(),
        originalLanguage: true,
      },
      {
        id: "welcome-translation",
        content: style.greetingTranslation || `Hello! I am a representative of ${cultureName} culture.`,
        sender: "bot",
        timestamp: new Date(),
      },
    ]
  })

  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Генерация приветственного аудио
  useEffect(() => {
    const generateWelcomeAudio = async () => {
      try {
        // Генерируем аудио через ElevenLabs API
        const speechResponse = await fetch("/api/speech", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: style.greetingTranslation || `Hello! I am a representative of ${cultureName} culture.`,
            cultureName,
          }),
        })

        if (!speechResponse.ok) {
          throw new Error("Failed to get response from speech API")
        }

        // Создаем Blob из аудио-данных
        const audioBlob = await speechResponse.blob()

        // Создаем URL для аудио
        const audioUrl = URL.createObjectURL(audioBlob)

        // Обновляем приветственное сообщение с аудио
        setMessages((prev) =>
          prev.map((msg, index) =>
            index === 1
              ? {
                  ...msg,
                  audioUrl,
                }
              : msg,
          ),
        )

        if (onAudioLoaded) {
          onAudioLoaded()
        }
      } catch (error) {
        console.error("Error generating welcome audio:", error)
      }
    }

    generateWelcomeAudio()
  }, [cultureName, style.greetingTranslation, onAudioLoaded])

  // Автоматическое воспроизведение приветственного аудио
  useEffect(() => {
    const welcomeMessage = messages.find((msg) => msg.id === "welcome-translation")
    if (welcomeMessage?.audioUrl && !playingAudioId) {
      // Небольшая задержка перед воспроизведением
      const timer = setTimeout(() => {
        setPlayingAudioId("welcome-translation")
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [messages, playingAudioId])

  // Сохраняем историю чата при изменении сообщений
  useEffect(() => {
    if (messages.length > 0) {
      saveChatHistory(cultureName, messages)
    }
  }, [messages, cultureName])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Check if scroll button should be shown
  useEffect(() => {
    const checkScroll = () => {
      if (!messagesContainerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
      const isScrollable = scrollHeight > clientHeight
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100

      setShowScrollButton(isScrollable && isScrolledUp)
    }

    const container = messagesContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScroll)
      return () => container.removeEventListener("scroll", checkScroll)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (messageText: string = inputValue) => {
    if (!messageText.trim() || isProcessing) return

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: uuidv4(),
      content: messageText.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Добавляем временное сообщение бота с индикатором загрузки
    const tempBotMessageId = uuidv4()
    setMessages((prev) => [
      ...prev,
      {
        id: tempBotMessageId,
        content: "",
        sender: "bot",
        timestamp: new Date(),
        isProcessing: true,
      },
    ])

    setIsProcessing(true)

    try {
      // Отправляем запрос к API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage.content,
          cultureName,
          cultureInfo,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from chat API")
      }

      const { response: botResponse } = await response.json()

      // Генерируем аудио через ElevenLabs API
      const speechResponse = await fetch("/api/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: botResponse,
          cultureName,
        }),
      })

      if (!speechResponse.ok) {
        throw new Error("Failed to get response from speech API")
      }

      // Создаем Blob из аудио-данных
      const audioBlob = await speechResponse.blob()

      // Создаем URL для аудио
      const audioUrl = URL.createObjectURL(audioBlob)

      // Заменяем временное сообщение на настоящее
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempBotMessageId
            ? {
                id: tempBotMessageId,
                content: botResponse,
                sender: "bot",
                timestamp: new Date(),
                audioUrl,
                isProcessing: false,
              }
            : msg,
        ),
      )
    } catch (error) {
      console.error("Error in handleSendMessage:", error)

      // Заменяем временное сообщение на сообщение об ошибке
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempBotMessageId
            ? {
                id: tempBotMessageId,
                content: "Sorry, there was an error processing your request. Please try again.",
                sender: "bot",
                timestamp: new Date(),
                isProcessing: false,
              }
            : msg,
        ),
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const handleAudioPlayStateChange = (messageId: string, isPlaying: boolean) => {
    if (isPlaying) {
      setPlayingAudioId(messageId)
    } else if (playingAudioId === messageId) {
      setPlayingAudioId(null)
    }
  }

  const handleSpeechResult = (text: string) => {
    if (text.trim()) {
      handleSendMessage(text)
    }
  }

  return (
    <div className="flex flex-col h-[500px] bg-background rounded-lg overflow-hidden shadow-lg border border-border z-1000">
      {/* Chat header with cultural pattern */}
      <div className={`p-4 bg-gradient-to-r ${style.primaryColor} relative overflow-hidden`}>
        <div className={`absolute inset-0 opacity-10 ${style.patternClass}`} />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <div className="mr-3">
              <CulturalAvatar cultureName={cultureName} size="lg" />
            </div>
            <div>
                <h3 className="font-medium text-lg font-heading text-foreground">{cultureName} representative</h3>
                <p className="text-xs text-foreground/70">Virtual cultural assistant</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground/70 hover:text-foreground hover:bg-foreground/10"
            onClick={() => {
              if (window.confirm("Are you sure you want to clear your chat history?")) {
                clearChatHistory(cultureName)
                setMessages([
                  {
                    id: "welcome-original",
                    content: style.greeting,
                    sender: "bot",
                    timestamp: new Date(),
                    originalLanguage: true,
                  },
                  {
                    id: "welcome-translation",
                    content: style.greetingTranslation || `Hello! I am a representative of ${cultureName} culture.`,
                    sender: "bot",
                    timestamp: new Date(),
                  },
                ])
              }
            }}
          >
            Clear history
          </Button>
        </div>
      </div>

      {/* Messages area with cultural background */}
      <div
        ref={messagesContainerRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/30 relative`}
      >
        <div className={`absolute inset-0 opacity-5 ${style.patternClass}`} />

        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} relative z-10`}
            >
              <div
                className={cn(
                  "max-w-[80%] p-3 shadow-sm",
                  message.sender === "user"
                    ? `bg-gradient-to-r ${style.primaryColor} text-white rounded-2xl rounded-tr-none`
                    : `${style.secondaryColor} ${style.messageStyle} backdrop-blur-sm rounded-2xl rounded-tl-none`,
                  message.originalLanguage && "italic",
                )}
              >
                <div className="flex items-start gap-2">
                  {message.sender === "bot" && <CulturalAvatar cultureName={cultureName} size="sm" />}
                  <div className="flex-1">
                    {message.isProcessing ? (
                      <div className="flex space-x-1 items-center h-6 py-2">
                        <motion.div
                          className={`h-2 w-2 rounded-full ${style.accentColor}`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            times: [0, 0.5, 1],
                          }}
                        />
                        <motion.div
                          className={`h-2 w-2 rounded-full ${style.accentColor}`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            delay: 0.2,
                            times: [0, 0.5, 1],
                          }}
                        />
                        <motion.div
                          className={`h-2 w-2 rounded-full ${style.accentColor}`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            delay: 0.4,
                            times: [0, 0.5, 1],
                          }}
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed text-foreground">{message.content}</p>
                        <div className="flex justify-between items-center mt-1">
                          <div>
                            {message.audioUrl && message.sender === "bot" && !message.originalLanguage && (
                              <AudioPlayer
                                audioUrl={message.audioUrl}
                                className="scale-90 origin-left"
                                onPlayStateChange={(isPlaying) => handleAudioPlayStateChange(message.id, isPlaying)}
                              />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground text-right">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                        </div>
                      </>
                    )}
                  </div>
                  {message.sender === "user" && (
                    <div className={cn(
                        "p-1 rounded-full mt-0.5 flex-shrink-0",
                        isDark ? "bg-white/20" : "bg-primary/20"
                    )}>
                        <User className={cn(
                        "h-4 w-4",
                        isDark ? "text-white" : "text-primary"
                        )} />
                    </div>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-20 right-4 z-20"
          >
            <Button
              size="icon"
              variant="secondary"
              className={`rounded-full shadow-md ${style.borderColor} h-8 w-8`}
              onClick={scrollToBottom}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area with cultural styling */}
      <div className={`p-4 border-t ${style.borderColor} bg-background/80 backdrop-blur-sm`}>
        <div
          className={`flex items-center gap-2 ${style.secondaryColor} rounded-full pl-4 pr-1 py-1 ${style.borderColor}`}
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
            disabled={isProcessing}
          />


          <Button
            onClick={() => handleSendMessage()}
            size="icon"
            disabled={!inputValue.trim() || isProcessing}
            className={`bg-gradient-to-r ${style.primaryColor} hover:opacity-90 text-white rounded-full h-8 w-8`}
          >
            {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
