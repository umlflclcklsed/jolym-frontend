
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExclamationTriangleIcon, ReloadIcon, CheckCircledIcon } from "@radix-ui/react-icons"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validate email
      if (!email) {
        throw new Error("Please enter your email address")
      }

      // Since we don't have a backend endpoint for password reset yet,
      // we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Set submitted state to show success message
      setIsSubmitted(true)
    } catch (err: any) {
      console.error("Password reset error:", err)
      setError(err.message || "Failed to process your request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-4 bg-gray-50">
        <Card className="w-full max-w-md border-emerald-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-emerald-900">Check Your Email</CardTitle>
            <CardDescription className="text-center">
              We've sent instructions to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-emerald-200 bg-emerald-50 text-emerald-800">
              <CheckCircledIcon className="h-4 w-4" />
              <AlertDescription>
                If an account exists with the email {email}, you will receive password reset instructions.
              </AlertDescription>
            </Alert>
            <p className="text-sm text-gray-600 text-center">
              Please check your email inbox and follow the instructions to reset your password. 
              If you don't see the email, please check your spam folder.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              variant="outline" 
              className="border-emerald-200 text-emerald-700"
              onClick={() => router.push('/login')}
            >
              Return to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-4 bg-gray-50">
      <Card className="w-full max-w-md border-emerald-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-emerald-900">Forgot Password</CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you instructions to reset your password
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
            <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800" disabled={isLoading}>
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Instructions"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link href="/login" className="text-emerald-700 hover:underline">
              Back to Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}