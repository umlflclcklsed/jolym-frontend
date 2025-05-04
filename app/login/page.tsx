"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import api from "@/lib/axios"
import { useAuth } from "@/context/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { isLoggedIn, login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Если пользователь уже авторизован, перенаправляем на страницу roadmap
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/roadmap")
    }
  }, [isLoggedIn, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Валидация на стороне клиента
      if (!email || !password) {
        throw new Error("Пожалуйста, заполните все поля")
      }

      // Отправляем запрос на вход
      const response = await api.post('/auth/login', {
        email,
        password
      });

      // Используем контекст авторизации для сохранения состояния
      if (response.data.token) {
        login(response.data.token, response.data.user);
        router.push("/roadmap");
      } else {
        throw new Error("Не удалось получить токен авторизации");
      }
    } catch (err: any) {
      // Обработка ошибок от API
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Произошла ошибка при входе в систему");
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-4 bg-gray-50">
      <Card className="w-full max-w-md border-emerald-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-emerald-900">Вход в аккаунт</CardTitle>
          <CardDescription className="text-center">
            Введите ваш email и пароль для входа в систему
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-800">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Пароль</Label>
                <Link href="#" className="text-xs text-emerald-700 hover:underline">
                  Забыли пароль?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800" disabled={isLoading}>
              {isLoading ? "Выполняется вход..." : "Войти"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Ещё нет аккаунта?{" "}
            <Link href="/register" className="text-emerald-700 hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
