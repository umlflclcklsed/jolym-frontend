// Определение стилей и данных для каждой культуры
export const cultureStyles = {
    sami: {
      primaryColor: "from-amber-500 to-amber-700",
      secondaryColor: "bg-amber-100 dark:bg-amber-900/30",
      accentColor: "bg-amber-500",
      borderColor: "border-amber-200 dark:border-amber-800",
      patternClass: "bg-[url('/assets/patterns/sami-pattern.svg')] bg-repeat-x bg-contain",
      avatarImage: "/placeholder.svg?height=100&width=100",
      greeting: "Bures! Mun lean Sámi kultuvrra ovddasteaddji.",
      greetingTranslation: "Hello! I am a representative of the Sami culture.",
      messageStyle: "rounded-lg border-l-4 border-l-amber-500",
      symbolElement: "⛰️",
    },
    hmong: {
      primaryColor: "from-indigo-500 to-blue-700",
      secondaryColor: "bg-blue-100 dark:bg-blue-900/30",
      accentColor: "bg-blue-500",
      borderColor: "border-blue-200 dark:border-blue-800",
      patternClass: "bg-[url('/assets/patterns/hmong-pattern.svg')] bg-repeat-x bg-contain",
      avatarImage: "/placeholder.svg?height=100&width=100",
      greeting: "Nyob zoo! Kuv yog ib tug sawv cev ntawm Hmoob.",
      greetingTranslation: "Hello! I am a representative of the Hmong culture.",
      messageStyle: "rounded-lg border-l-4 border-l-blue-500",
      symbolElement: "🏔️",
    },
    maori: {
      primaryColor: "from-green-500 to-emerald-700",
      secondaryColor: "bg-green-100 dark:bg-green-900/30",
      accentColor: "bg-emerald-500",
      borderColor: "border-green-200 dark:border-green-800",
      patternClass: "bg-[url('/assets/patterns/maori-pattern.svg')] bg-repeat-x bg-contain",
      avatarImage: "/placeholder.svg?height=100&width=100",
      greeting: "Kia ora! Ko au te māngai o te iwi Māori.",
      greetingTranslation: "Hello! I am a representative of the Maori culture.",
      messageStyle: "rounded-lg border-l-4 border-l-emerald-500",
      symbolElement: "🌊",
    },
    inuit: {
      primaryColor: "from-sky-500 to-cyan-700",
      secondaryColor: "bg-sky-100 dark:bg-sky-900/30",
      accentColor: "bg-sky-500",
      borderColor: "border-sky-200 dark:border-sky-800",
      patternClass: "bg-[url('/assets/patterns/inuit-pattern.svg')] bg-repeat-x bg-contain",
      avatarImage: "/placeholder.svg?height=100&width=100",
      greeting: "Ainngai! Uanga Inuit-nik kinaujaqaqtunga.",
      greetingTranslation: "Hello! I am a representative of the Inuit culture.",
      messageStyle: "rounded-lg border-l-4 border-l-sky-500",
      symbolElement: "❄️",
    },
    yanomami: {
      primaryColor: "from-red-500 to-rose-700",
      secondaryColor: "bg-red-100 dark:bg-red-900/30",
      accentColor: "bg-rose-500",
      borderColor: "border-red-200 dark:border-red-800",
      patternClass: "bg-[url('/assets/patterns/yanomami-pattern.svg')] bg-repeat-x bg-contain",
      avatarImage: "/placeholder.svg?height=100&width=100",
      greeting: "Kami! Yanomami thëpë yamaki.",
      greetingTranslation: "Hello! I am a representative of the Yanomami culture.",
      messageStyle: "rounded-lg border-l-4 border-l-rose-500",
      symbolElement: "🌴",
    },
    // Значения по умолчанию, если культура не найдена
    default: {
      primaryColor: "from-amber-500 to-amber-700",
      secondaryColor: "bg-amber-100 dark:bg-amber-900/30",
      accentColor: "bg-amber-500",
      borderColor: "border-amber-200 dark:border-amber-800",
      patternClass: "",
      avatarImage: "/placeholder.svg?height=100&width=100",
      greeting: "Hello! I am a representative of this culture.",
      greetingTranslation: "",
      messageStyle: "rounded-lg border-l-4 border-l-amber-500",
      symbolElement: "🌍",
    },
  }
  
  // Функция для получения стилей культуры
  export function getCultureStyle(cultureName: string) {
    const cultureId = cultureName.toLowerCase().replace(/[^a-z0-9]/g, "")
  
    // Проверяем, есть ли такая культура в нашем списке
    for (const [key, value] of Object.entries(cultureStyles)) {
      if (key === cultureId || cultureName.toLowerCase().includes(key)) {
        return value
      }
    }
  
    // Если не нашли, возвращаем значения по умолчанию
    return cultureStyles.default
  }
  
  // Создаем заглушки для узоров культур
  export const culturalPatterns = {
    sami: `
      <svg width="100" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10 L10 0 L20 10 L30 0 L40 10 L50 0 L60 10 L70 0 L80 10 L90 0 L100 10" stroke="#D97706" fill="none" stroke-width="2"/>
      </svg>
    `,
    hmong: `
      <svg width="100" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10 C10 5, 20 15, 30 10 C40 5, 50 15, 60 10 C70 5, 80 15, 90 10 L100 10" stroke="#3B82F6" fill="none" stroke-width="2"/>
      </svg>
    `,
    maori: `
      <svg width="100" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10 Q10 0, 20 10 Q30 20, 40 10 Q50 0, 60 10 Q70 20, 80 10 Q90 0, 100 10" stroke="#10B981" fill="none" stroke-width="2"/>
      </svg>
    `,
    inuit: `
      <svg width="100" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10 L10 5 L20 10 L30 15 L40 10 L50 5 L60 10 L70 15 L80 10 L90 5 L100 10" stroke="#0EA5E9" fill="none" stroke-width="2"/>
      </svg>
    `,
    yanomami: `
      <svg width="100" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10 L10 5 L15 10 L20 5 L25 10 L30 5 L35 10 L40 5 L45 10 L50 5 L55 10 L60 5 L65 10 L70 5 L75 10 L80 5 L85 10 L90 5 L95 10 L100 5" stroke="#F43F5E" fill="none" stroke-width="2"/>
      </svg>
    `,
  }
  