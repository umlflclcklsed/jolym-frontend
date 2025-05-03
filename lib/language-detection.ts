// Простая функция для определения языка ввода
export function detectLanguage(text: string): "ru" | "en" | "unknown" {
    // Русские символы в Unicode
    const russianPattern = /[а-яА-ЯёЁ]/
    // Английские символы
    const englishPattern = /[a-zA-Z]/
  
    // Подсчитываем количество символов каждого языка
    let russianChars = 0
    let englishChars = 0
  
    for (const char of text) {
      if (russianPattern.test(char)) {
        russianChars++
      } else if (englishPattern.test(char)) {
        englishChars++
      }
    }
  
    // Определяем преобладающий язык
    if (russianChars > englishChars) {
      return "ru"
    } else if (englishChars > russianChars) {
      return "en"
    } else {
      return "unknown"
    }
  }
  