"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { detectLanguage } from "@/lib/language-detection"

type SpeechRecognitionProps = {
  onSpeechResult: (text: string) => void
  isDisabled?: boolean
  className?: string
}

export function SpeechRecognition({ onSpeechResult, isDisabled = false, className = "" }: SpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(true)
  const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Определяем язык распознавания на основе языка интерфейса
  const [recognitionLang, setRecognitionLang] = useState("ru-RU")

  const recognitionRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneStreamRef = useRef<MediaStream | null>(null)

  // Настройки для определения тишины
  const SILENCE_THRESHOLD = -65 // дБ
  const SILENCE_DURATION = 1500 // мс

  useEffect(() => {
    // Проверяем поддержку API распознавания речи
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = recognitionLang

        recognitionRef.current.onresult = (event: any) => {
          const current = event.resultIndex
          const result = event.results[current]
          const transcriptValue = result[0].transcript

          setTranscript(transcriptValue)

          // Если обнаружен новый текст, сбрасываем таймер тишины
          if (silenceTimer) {
            clearTimeout(silenceTimer)
          }

          // Устанавливаем новый таймер тишины
          const timer = setTimeout(() => {
            if (isListening && transcriptValue.trim()) {
              stopListening(transcriptValue)
            }
          }, SILENCE_DURATION)

          setSilenceTimer(timer)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error)
          if (event.error === "no-speech") {
            // Игнорируем ошибку "no-speech", так как мы сами определяем тишину
            return
          }
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          // Если распознавание закончилось, но мы все еще слушаем, перезапускаем его
          if (isListening) {
            recognitionRef.current.start()
          }
        }
      } else {
        setIsSupported(false)
      }
    }

    return () => {
      if (silenceTimer) {
        clearTimeout(silenceTimer)
      }

      if (recognitionRef.current) {
        recognitionRef.current.onend = null
        recognitionRef.current.onresult = null
        recognitionRef.current.onerror = null

        if (isListening) {
          recognitionRef.current.stop()
        }
      }

      if (microphoneStreamRef.current) {
        microphoneStreamRef.current.getTracks().forEach((track) => track.stop())
      }

      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close()
      }
    }
  }, [isListening, silenceTimer, recognitionLang])

  // Функция для анализа уровня звука
  const setupAudioAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      microphoneStreamRef.current = stream

      // Создаем аудио контекст
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256

      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      // Начинаем анализировать звук
      analyseAudio()
    } catch (error) {
      console.error("Error accessing microphone", error)
    }
  }

  // Функция для анализа уровня звука
  const analyseAudio = () => {
    if (!analyserRef.current || !isListening) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(dataArray)

    // Вычисляем средний уровень звука
    let sum = 0
    for (const value of dataArray) {
      sum += value
    }
    const average = sum / dataArray.length

    // Преобразуем в дБ (приблизительно)
    const dB = 20 * Math.log10(average / 255)

    // Если уровень звука ниже порога и есть текст, считаем это паузой
    if (dB < SILENCE_THRESHOLD && transcript.trim()) {
      if (!silenceTimer) {
        const timer = setTimeout(() => {
          if (isListening && transcript.trim()) {
            stopListening(transcript)
          }
        }, SILENCE_DURATION)

        setSilenceTimer(timer)
      }
    } else if (silenceTimer) {
      // Если звук выше порога, сбрасываем таймер тишины
      clearTimeout(silenceTimer)
      setSilenceTimer(null)
    }

    // Продолжаем анализировать звук
    if (isListening) {
      requestAnimationFrame(analyseAudio)
    }
  }

  const startListening = async () => {
    setTranscript("")
    setIsListening(true)

    // Определяем язык распознавания на основе языка интерфейса
    const userLanguage = navigator.language || "ru-RU"
    const recognitionLanguage = userLanguage.startsWith("ru") ? "ru-RU" : "en-US"
    setRecognitionLang(recognitionLanguage)

    if (recognitionRef.current) {
      recognitionRef.current.lang = recognitionLanguage
      recognitionRef.current.start()
    }

    // Настраиваем анализ звука
    await setupAudioAnalysis()
  }

  const stopListening = (finalTranscript: string) => {
    setIsProcessing(true)

    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }

    if (microphoneStreamRef.current) {
      microphoneStreamRef.current.getTracks().forEach((track) => track.stop())
    }

    if (silenceTimer) {
      clearTimeout(silenceTimer)
      setSilenceTimer(null)
    }

    setIsListening(false)

    // Определяем язык ввода и отправляем результат
    const detectedLanguage = detectLanguage(finalTranscript)

    // Небольшая задержка для визуального эффекта
    setTimeout(() => {
      onSpeechResult(finalTranscript)
      setIsProcessing(false)
      setTranscript("")
    }, 500)
  }

  if (!isSupported) {
    return (
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full opacity-50 ${className}`}
        disabled={true}
        title="Распознавание речи не поддерживается в вашем браузере"
      >
        <MicOff className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant={isListening ? "default" : "outline"}
        size="icon"
        className={`rounded-full ${isListening ? "bg-red-500 hover:bg-red-600" : ""}`}
        onClick={isListening ? () => stopListening(transcript) : startListening}
        disabled={isDisabled || isProcessing}
        title={isListening ? "Остановить запись" : "Начать запись голоса"}
      >
        {isProcessing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isListening ? (
          <Mic className="h-4 w-4 text-white" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>

      {isListening && (
        <div className="absolute left-0 right-0 -bottom-10 bg-background/80 backdrop-blur-sm p-1 rounded-md text-xs text-center border border-border">
          {transcript || "Говорите..."}
        </div>
      )}

      {isListening && (
        <motion.div
          className="absolute -inset-1 rounded-full bg-red-500/20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </div>
  )
}
