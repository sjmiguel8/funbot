'use client'
import { signUp, signIn, signOut, getCurrentUser } from '@aws-amplify/auth'
import { useCallback, useEffect, useState } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = useCallback(async () => {
    try {
      await getCurrentUser()
      setIsAuthenticated(true)
    } catch {
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    isAuthenticated,
    loading,
    signUp,
    signIn,
    signOut
  }
} 