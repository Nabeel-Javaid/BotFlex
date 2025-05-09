import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { initializeSupabase } from '@/lib/supabase'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface UserMenuProps {
  onOpenAuthModal: () => void
}

export function UserMenu({ onOpenAuthModal }: UserMenuProps) {
  const { user, signOut, isLoading } = useAuth()
  const [isInitializing, setIsInitializing] = useState(true)
  
  // Initialize Supabase on component mount
  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeSupabase()
      } catch (error) {
        console.error('Failed to initialize Supabase:', error)
      } finally {
        setIsInitializing(false)
      }
    }
    
    initialize()
  }, [])

  // If we're loading auth state, show a loading state
  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled className="h-9 w-9 rounded-full">
        <span className="sr-only">Loading user menu</span>
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600"></div>
      </Button>
    )
  }

  // If user is not logged in, show login button
  if (!user) {
    return (
      <Button onClick={onOpenAuthModal} variant="default" size="sm">
        Log in
      </Button>
    )
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    }
    return user.email?.[0].toUpperCase() || '?'
  }

  // Handle sign out
  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatarUrl || ''} alt={user.email || ''} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName ? `${user.firstName} ${user.lastName}` : 'My Account'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}