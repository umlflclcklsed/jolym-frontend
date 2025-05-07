"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Shield, LogOut } from "lucide-react"
import { authAPI } from "@/lib/api"
import { ExclamationTriangleIcon, ReloadIcon, PersonIcon } from "@radix-ui/react-icons"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    roadmapUpdates: true,
    newFeatures: false,
    marketing: false,
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const response = await authAPI.getCurrentUser()
        const userData = response.data

        setUser(userData)
        setFormData({
          ...formData,
          name: userData.name || "",
          email: userData.email || "",
          bio: userData.bio || "",
        })
        setError(null)
      } catch (err: any) {
        console.error("Error fetching user data:", err)

        if (err.response?.status === 401) {
          // If unauthorized, redirect to login
          router.push("/login")
        } else {
          setError(err.response?.data?.detail || "Failed to load user data")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    })
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user state
      setUser({
        ...user,
        name: formData.name,
        bio: formData.bio,
      })

      // Show success message
      alert("Profile updated successfully!")
    } catch (err) {
      console.error("Error updating profile:", err)
      setError("Failed to update profile. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords don't match")
      return
    }

    setSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset password fields
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      // Show success message
      alert("Password updated successfully!")
    } catch (err) {
      console.error("Error updating password:", err)
      setError("Failed to update password. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
        <ReloadIcon className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <Card className="border-emerald-100 dark:border-emerald-800">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-4 border-emerald-100 dark:border-emerald-800 mt-4 mb-2">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user?.name || "User"} />
                    <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                      {user?.name?.charAt(0) || <PersonIcon className="h-8 w-8" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <p className="text-white text-xs">Change</p>
                  </div>
                </div>
                <h3 className="font-medium text-lg mt-2">{user?.name || "User"}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || "user@example.com"}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  Member since {new Date().toLocaleDateString()}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                  <PersonIcon className="h-4 w-4" />
                  <span>Profile</span>
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Security</span>
                </div>
              </Button>
              <Separator className="my-2" />
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </Button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6 gradient-text">Your Profile</h1>

            {error && (
              <Alert
                variant="destructive"
                className="mb-6 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/30"
              >
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 mb-6">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400"
                >
                  Notifications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="border-emerald-100 dark:border-emerald-800">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled
                          className="border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
                        />
                        <p className="text-xs text-gray-500">Email cannot be changed</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="border-emerald-100 dark:border-emerald-800">
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card className="border-emerald-100 dark:border-emerald-800">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">Notification Channels</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                          </div>
                          <Switch
                            checked={notifications.email}
                            onCheckedChange={() => handleNotificationChange("email")}
                            className="data-[state=checked]:bg-emerald-500"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Receive notifications on your device
                            </p>
                          </div>
                          <Switch
                            checked={notifications.push}
                            onCheckedChange={() => handleNotificationChange("push")}
                            className="data-[state=checked]:bg-emerald-500"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">Notification Types</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Roadmap Updates</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Get notified about updates to your roadmaps
                            </p>
                          </div>
                          <Switch
                            checked={notifications.roadmapUpdates}
                            onCheckedChange={() => handleNotificationChange("roadmapUpdates")}
                            className="data-[state=checked]:bg-emerald-500"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Features</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Get notified about new platform features
                            </p>
                          </div>
                          <Switch
                            checked={notifications.newFeatures}
                            onCheckedChange={() => handleNotificationChange("newFeatures")}
                            className="data-[state=checked]:bg-emerald-500"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Marketing</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Receive marketing and promotional emails
                            </p>
                          </div>
                          <Switch
                            checked={notifications.marketing}
                            onCheckedChange={() => handleNotificationChange("marketing")}
                            className="data-[state=checked]:bg-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
