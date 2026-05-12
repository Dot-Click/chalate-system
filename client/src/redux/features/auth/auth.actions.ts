import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginCredentials, LoginResponse } from './auth.types'
import api from '../../../lib/api'

// Login async thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials)

      // Store token in localStorage (access nested data from ApiResponse)
      const authData = response?.data?.data

      // Validate response structure
      if (!authData || !authData.accessToken || !authData.user) {
        return rejectWithValue('Invalid response from server')
      }

      localStorage.setItem('token', authData.accessToken)
      localStorage.setItem('user', JSON.stringify(authData.user))

      return authData
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed')
    }
  }
)

// Logout action
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout')

      return { message: 'Logged out successfully' }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Logout failed')
    } finally {
      // Always clear localStorage regardless of API response
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
)

// Initialize auth from localStorage
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        let parsedUser;
        try {
          parsedUser = JSON.parse(user)
        } catch (parseError) {
          // Clear corrupted user data
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          return rejectWithValue('Corrupted user data found')
        }

        return {
          token,
          user: parsedUser
        }
      }

      return null
    } catch (error) {
      return rejectWithValue('Failed to initialize auth')
    }
  }
)
