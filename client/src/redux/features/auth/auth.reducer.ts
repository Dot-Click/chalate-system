import { createSlice } from '@reduxjs/toolkit'
import { AuthState, User } from './auth.types'
import { loginUser, initializeAuth } from './auth.actions'

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
    // Logout action
    logout: (state) => {
      state.user = null
      state.token = null
      state.loading = false
      state.error = null
      state.isAuthenticated = false

      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },


    // Clear error
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.accessToken
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          state.token = action.payload.token
          state.user = action.payload.user
          state.isAuthenticated = true
        }
        state.error = null
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
