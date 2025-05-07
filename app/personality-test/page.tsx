"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import { ArrowLeftIcon, ArrowRightIcon, ReloadIcon } from "@radix-ui/react-icons"

// Sample personality test questions
interface Option {
  value: string;
  label: string;
}

interface Question {
  id: number;
  text: string;
  category: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "I enjoy solving complex problems and puzzles.",
    category: "analytical",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 2,
    text: "I prefer working with people rather than working alone.",
    category: "social",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 3,
    text: "I enjoy creating things with my hands.",
    category: "practical",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 4,
    text: "I like to take charge in group situations.",
    category: "leadership",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 5,
    text: "I enjoy expressing myself through art, music, or writing.",
    category: "creative",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 6,
    text: "I prefer following a structured plan rather than improvising.",
    category: "organized",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 7,
    text: "I enjoy analyzing data and finding patterns.",
    category: "analytical",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 8,
    text: "I find it easy to understand other people's feelings.",
    category: "social",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 9,
    text: "I enjoy working outdoors or in a physically active environment.",
    category: "practical",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 10,
    text: "I enjoy persuading others to see things my way.",
    category: "leadership",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 11,
    text: "I enjoy thinking about abstract concepts and ideas.",
    category: "creative",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 12,
    text: "I like to plan my day in advance and stick to a schedule.",
    category: "organized",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 13,
    text: "I enjoy learning about how things work.",
    category: "analytical",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 14,
    text: "I enjoy helping others learn or develop their skills.",
    category: "social",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
  {
    id: 15,
    text: "I prefer practical solutions over theoretical ones.",
    category: "practical",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" },
    ],
  },
]

export default function PersonalityTestPage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    })
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call to process results
    setTimeout(() => {
      // Calculate personality type based on answers
      const results = calculateResults(answers)

      // Redirect to results page with the results as query parameters
      router.push(`/personality-test/results?${new URLSearchParams(results).toString()}`)
    }, 2000)
  }

  const calculateResults = (answers: Record<number, string>) => {
    // Group answers by category
    const categoryScores: Record<string, number[]> = {}

    questions.forEach((question) => {
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = []
      }

      const answer = Number.parseInt(answers[question.id] || "3") // Default to neutral if unanswered
      categoryScores[question.category].push(answer)
    })

    // Calculate average score for each category
    const results: Record<string, string> = {}

    Object.entries(categoryScores).forEach(([category, scores]) => {
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length
      results[category] = average.toFixed(2)
    })

    return results
  }

  const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const areAllQuestionsAnswered = questions.every((q) => answers[q.id] !== undefined)

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
              <span className="gradient-text">Career Personality Test</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Discover your strengths and ideal career paths with our comprehensive assessment
            </p>
          </motion.div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-gray-100 dark:bg-gray-800 [&>div]:bg-emerald-500"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-gray-100">{currentQuestion.text}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={answers[currentQuestion.id]} onValueChange={handleAnswer} className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2 rounded-lg border border-gray-200 dark:border-gray-800 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`option-${option.value}`}
                          className="text-emerald-600 dark:text-emerald-400"
                        />
                        <Label
                          htmlFor={`option-${option.value}`}
                          className="flex-1 cursor-pointer font-medium text-gray-700 dark:text-gray-300"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="border-gray-200 dark:border-gray-800"
                  >
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {isLastQuestion ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={!areAllQuestionsAnswered || isSubmitting}
                      className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                    >
                      {isSubmitting ? (
                        <>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing Results...
                        </>
                      ) : (
                        <>
                          Submit
                          <CheckCircle className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={goToNextQuestion}
                      disabled={!isCurrentQuestionAnswered}
                      className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                    >
                      Next
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Your answers are confidential and will only be used to generate your personalized career recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
