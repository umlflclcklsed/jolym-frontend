import axios from "axios"

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if we're in the browser
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

// API endpoints
export const authAPI = {
  login: (email: string, password: string) => api.post("/auth/login", { email, password }),
  register: (name: string, email: string, password: string) => api.post("/auth/register", { name, email, password }),
  getCurrentUser: () => api.get("/auth/me"),
}

export const roadmapsAPI = {
  getUserRoadmaps: () => api.get("/roadmaps"),
  getRoadmapById: (id: string) => api.get(`/roadmaps/${id}`),
  createRoadmap: (data: any) => api.post("/roadmaps", data),
}

export const goalsAPI = {
  getUserGoals: () => api.get("/goals"),
  createGoal: (data: any) => api.post("/goals", data),
  updateGoalProgress: (id: string, progress: number) => api.patch(`/goals/${id}/progress`, { progress }),
}

export default api
