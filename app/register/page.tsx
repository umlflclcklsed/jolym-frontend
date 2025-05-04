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

export default function RegisterPage() {
  const router = useRouter()
  const { isLoggedIn, login } = useAuth()
  const [name, setName] = useState("")
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
      if (!name || !email || !password) {
        throw new Error("Пожалуйста, заполните все поля")
      }

      if (password.length < 6) {
        throw new Error("Пароль должен содержать не менее 6 символов")
      }

      // Отправляем запрос на регистрацию 
      const response = await api.post('/auth/register', {
        name,
        email,
        password
      });

      // Используем контекст авторизации для сохранения состояния
      if (response.data.token) {
        // Создаем объект пользователя из данных регистрации
        const userData = {
          name,
          email,
          id: response.data.user?.id || null
        };
        
        login(response.data.token, userData);
        
        // Сразу перенаправляем на страницу roadmap
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
        setError("Произошла ошибка при регистрации");
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-4 bg-gray-50">
      <Card className="w-full max-w-md border-emerald-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-emerald-900">Создать аккаунт</CardTitle>
          <CardDescription className="text-center">Введите данные для создания аккаунта в Jolym</CardDescription>
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
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                type="text"
                placeholder="Иван Иванов"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
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
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
              <p className="text-xs text-gray-500">Не менее 6 символов</p>
            </div>
            <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800" disabled={isLoading}>
              {isLoading ? "Создание аккаунта..." : "Зарегистрироваться"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-emerald-700 hover:underline">
              Войти
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
