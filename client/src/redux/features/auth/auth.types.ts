// Auth types for Redux
export interface User {
  id: string
  fullName: string
  email: string
  role: string
  image?: string | null
}

export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
}
