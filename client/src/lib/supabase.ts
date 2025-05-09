import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '')

export type AuthUser = {
  id: string
  email?: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
}

export type AuthSession = {
  user: AuthUser | null
  isLoggedIn: boolean
  isLoading: boolean
}

// Helper for handling auth errors
export const handleAuthError = (error: any): string => {
  const errorMessage = error?.message || 'An unknown error occurred'
  return errorMessage
}