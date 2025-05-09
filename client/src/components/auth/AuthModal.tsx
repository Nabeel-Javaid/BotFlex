import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { LoginForm } from './LoginForm'
import { SignUpForm } from './SignUpForm'

type AuthMode = 'login' | 'signup'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: AuthMode
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode)

  const handleSuccess = () => {
    onClose()
  }

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        {mode === 'login' ? (
          <LoginForm onSuccess={handleSuccess} onSignUpClick={toggleMode} />
        ) : (
          <SignUpForm onSuccess={handleSuccess} onLoginClick={toggleMode} />
        )}
      </DialogContent>
    </Dialog>
  )
}