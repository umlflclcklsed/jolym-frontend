export type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  originalLanguage?: boolean
  audioUrl?: string
  isProcessing?: boolean
}

export type CultureInfo = {
  description: string
  traditions: string
  lifestyle: string
}

// Добавим типы для Web Speech API, если они отсутствуют
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}
