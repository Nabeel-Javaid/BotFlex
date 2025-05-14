import React, { createContext, useContext } from 'react'

// Simple placeholder for AuthContext that doesn't rely on Supabase
// This keeps the interface compatible with code that might expect AuthProvider
// but doesn't actually perform authentication

type AuthContextType = {
  user: null
  session: null
  isLoading: false
  signUp: () => Promise<{ error: null }>
  signIn: () => Promise<{ error: null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Simplified context that doesn't do authentication
  const value = {
    user: null,
    session: null,
    isLoading: false,
    signUp: async () => ({ error: null }),
    signIn: async () => ({ error: null }),
    signOut: async () => { },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}