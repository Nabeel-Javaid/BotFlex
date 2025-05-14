import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import * as api from '@/lib/api'

type AuthUser = {
  id: string
  email: string | null
  firstName: string
  lastName: string
  avatarUrl: string
}

type AuthContextType = {
  user: AuthUser | null
  session: Session | null
  isLoading: boolean
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get session and user on mount
    const getSession = async () => {
      setIsLoading(true)

      try {
        // Get the session
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Error getting session:', error.message)
        }

        setSession(session)
        setUser(session?.user ? mapUserData(session.user) : null)

        // Set up auth listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
          setUser(session?.user ? mapUserData(session.user) : null)
          setIsLoading(false)
        })

        return () => subscription.unsubscribe()
      } catch (error) {
        console.error('Authentication initialization error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()
  }, [])

  // Convert Supabase User to AuthUser
  const mapUserData = (user: User): AuthUser => {
    return {
      id: user.id,
      email: user.email,
      firstName: user.user_metadata?.first_name || '',
      lastName: user.user_metadata?.last_name || '',
      avatarUrl: user.user_metadata?.avatar_url || '',
    }
  }

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await api.signUp(email, password);
      return { error: null };
    } catch (error: any) {
      return { error };
    } finally {
      setIsLoading(false);
    }
  }

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await api.signIn(email, password);
      return { error: null };
    } catch (error: any) {
      return { error };
    } finally {
      setIsLoading(false);
    }
  }

  // Sign out
  const signOut = async () => {
    setIsLoading(true)
    try {
      await api.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
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