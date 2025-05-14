import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

interface UserMenuProps {
  onOpenAuthModal: () => void
}

export function UserMenu({ onOpenAuthModal }: UserMenuProps) {
  // Since we've removed all authentication, this will always return null for user
  const { user } = useAuth()

  // Always show login button since authentication has been removed
    return (
    <div className="flex items-center space-x-2">
      <Button onClick={onOpenAuthModal} variant="default" size="sm">
        Log in
      </Button>
      <span className="text-xs text-gray-500 hidden sm:inline">(Auth disabled)</span>
          </div>
  )
}