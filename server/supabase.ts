import { createClient } from '@supabase/supabase-js'

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_KEY || ''

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return !!supabaseUrl && !!supabaseKey
}

// Log Supabase configuration status at startup
if (!isSupabaseConfigured()) {
  console.warn('Supabase is not properly configured. Authentication features may not work correctly.')
} else {
  console.log('Supabase configured successfully.')
}