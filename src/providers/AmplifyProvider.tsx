'use client'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Amplify } from 'aws-amplify'
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito'
import { type KeyValueStorageInterface } from '@aws-amplify/core'

if (!process.env.NEXT_PUBLIC_USER_POOL_ID) throw new Error('NEXT_PUBLIC_USER_POOL_ID is required')
if (!process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID) throw new Error('NEXT_PUBLIC_USER_POOL_CLIENT_ID is required')
if (!process.env.NEXT_PUBLIC_IDENTITY_POOL_ID) throw new Error('NEXT_PUBLIC_IDENTITY_POOL_ID is required')
if (!process.env.NEXT_PUBLIC_API_URL) throw new Error('NEXT_PUBLIC_API_URL is required')
if (!process.env.NEXT_PUBLIC_REGION) throw new Error('NEXT_PUBLIC_REGION is required')

// Initialize Amplify configuration
Amplify.configure({
  Auth: {
    Cognito: {
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
      signUpVerificationMethod: 'code',
      loginWith: {
        username: true,
        email: true,
        phone: false
      }
    }
  },
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_API_URL,
      region: process.env.NEXT_PUBLIC_REGION,
      defaultAuthMode: 'userPool'
    }
  }
}, {
  ssr: true
})

// Create a storage interface that matches KeyValueStorageInterface
const storage: KeyValueStorageInterface = {
  setItem: (key: string, value: string) => {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  getItem: (key: string) => {
    const value = window.localStorage.getItem(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
  clear: () => {
    window.localStorage.clear();
    return Promise.resolve();
  }
};

export function AmplifyProvider({ children }: PropsWithChildren) {
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      cognitoUserPoolsTokenProvider.setKeyValueStorage(storage)
      setIsConfigured(true)
    }
  }, [])

  if (!isConfigured) {
    return null
  }

  return <>{children}</>
}