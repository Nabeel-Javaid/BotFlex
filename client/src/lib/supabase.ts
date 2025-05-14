import { createClient } from '@supabase/supabase-js'

// Safe environment check function for browser and Node environments
const getEnv = (key: string): string | undefined => {
  // For Vite-specific environment variables
  if (import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }

  // Fallback for Node.js environment (development)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }

  return undefined;
};

// Get Supabase credentials from environment variables
const supabaseUrl = getEnv('VITE_SUPABASE_URL') || 'https://example.supabase.co';
const supabaseKey = getEnv('VITE_SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to check if Supabase is configured with actual values
export const isSupabaseConfigured = (): boolean => {
  return (
    supabaseUrl !== 'https://example.supabase.co' &&
    supabaseKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'
  );
};

// For development, log configuration status
if (!isSupabaseConfigured()) {
  console.warn('⚠️ Supabase is using fallback credentials. Set valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in environment variables.');
} else {
  console.log('✅ Supabase configured successfully.');
}

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