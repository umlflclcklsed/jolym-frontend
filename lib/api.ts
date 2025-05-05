import axios from "axios"

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
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

// Auth API
export const authAPI = {
  login: (email: string, password: string) => api.post("/auth/login", { email, password }),

  register: (name: string, email: string, password: string) => api.post("/auth/register", { name, email, password }),

  getCurrentUser: () => api.get("/auth/users/me"),
}

// Roadmap API
export const roadmapAPI = {
  createPrompt: (text: string) => api.post("/roadmap/prompt", { text }),

  findSimilarPrompts: (text: string, limit = 5, threshold = 0.7) =>
    api.get("/roadmap/prompts/similar", { params: { text, limit, threshold } }),

  healthCheck: () => api.get("/roadmap/health"),
}

// Dashboard API
export const dashboardAPI = {
  getUserDashboard: () => api.get("/dashboard/me"),

  getRoadmapDetails: (roadmapId: number) => api.get(`/dashboard/roadmaps/${roadmapId}`),

  updateStepProgress: (roadmapId: number, stepId: string, completed: boolean) =>
    api.post(`/dashboard/roadmaps/${roadmapId}/progress`, { step_id: stepId, completed }),
}

// Goals API
export const goalsAPI = {
  updateGoalProgress: (goalId: number, progress: number) => api.post(`/goals/${goalId}/progress`, { progress }),
}

export default api
