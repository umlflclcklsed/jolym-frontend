import type { Message } from "@/lib/types"

const STORAGE_KEY_PREFIX = "culturology_chat_"

export function saveChatHistory(cultureName: string, messages: Message[]): void {
  if (typeof window === "undefined") return

  try {
    // Преобразуем сообщения для хранения (удаляем URL аудио, так как они временные)
    const storableMessages = messages.map((msg) => ({
      ...msg,
      audioUrl: undefined, // Не сохраняем URL аудио
      timestamp: msg.timestamp.toISOString(), // Преобразуем дату в строку
    }))

    localStorage.setItem(`${STORAGE_KEY_PREFIX}${cultureName.toLowerCase()}`, JSON.stringify(storableMessages))
  } catch (error) {
    console.error("Error saving chat history:", error)
  }
}

export function loadChatHistory(cultureName: string): Message[] {
  if (typeof window === "undefined") return []

  try {
    const storedData = localStorage.getItem(`${STORAGE_KEY_PREFIX}${cultureName.toLowerCase()}`)
    if (!storedData) return []

    // Преобразуем сохраненные данные обратно в сообщения
    const parsedData = JSON.parse(storedData)
    return parsedData.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp), // Прео��разуем строку обратно в дату
    }))
  } catch (error) {
    console.error("Error loading chat history:", error)
    return []
  }
}

export function clearChatHistory(cultureName: string): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${cultureName.toLowerCase()}`)
  } catch (error) {
    console.error("Error clearing chat history:", error)
  }
}
