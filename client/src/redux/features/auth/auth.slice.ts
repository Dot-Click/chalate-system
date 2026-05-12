import { createSlice } from '@reduxjs/toolkit'
import { loginUser, logoutUser, initializeAuth } from './auth.actions'
import { AuthState } from './auth.types'

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
}

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Initialize auth from localStorage
    initializeAuth: (state, action) => {
      if (action.payload) {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      }
    },

    // Clear error
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login pending
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // Login fulfilled
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.accessToken
        state.error = null
        state.isAuthenticated = true
      })
      // Login rejected
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })

      // Logout fulfilled
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.loading = false
        state.error = null
        state.isAuthenticated = false
      })

      // Initialize auth fulfilled
      .addCase(initializeAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user
          state.token = action.payload.token
          state.isAuthenticated = true
        }
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
