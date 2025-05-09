import { createClient } from '@supabase/supabase-js'

// Direct configuration with hardcoded values
// NOTE: We're using the actual URLs and keys from environment variables here
const supabaseUrl = 'https://xizarvcrbwbycijyplsv.supabase.co'
// Using the anon key - this is safe to expose in client-side code
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpemFydmNyYndieWNpanlwbHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMjAxMTIsImV4cCI6MjAzMDc5NjExMn0.T8sDvQ37h82V6nPu-9U0m0XUYAUKcQ2FxeFi7wfQDj0'

// Create Supabase client with options
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  }
})

// Log connection status
console.log('Supabase client initialized with URL:', supabaseUrl)

// Helper function to test connection
export async function testSupabaseConnection() {
  try {
    const { error } = await supabase.from('_dummy_query').select('*').limit(1)
    // We expect an error about the table not existing, which means connection works
    if (error && error.code !== '42P01') {
      console.error('Supabase connection test failed:', error)
      return false
    }
    console.log('Supabase connection successful')
    return true
  } catch (err) {
    console.error('Supabase connection test error:', err)
    return false
  }
}

// Dummy function to maintain compatibility with code using this
export async function initializeSupabase() {
  return testSupabaseConnection()
}

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