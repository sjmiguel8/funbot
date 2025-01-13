'use client'
import { signUp, signIn } from 'aws-amplify/auth'
import { useState } from 'react'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const validatePassword = (pass: string) => {
    if (pass.length < 8) return 'Password must be at least 8 characters'
    if (!/[A-Z]/.test(pass)) return 'Password must have uppercase characters'
    if (!/[a-z]/.test(pass)) return 'Password must have lowercase characters'
    if (!/[0-9]/.test(pass)) return 'Password must have numbers'
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) return 'Password must have special characters'
    return ''
  }

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (isSignUp) {
      const passwordError = validatePassword(password)
      if (passwordError) {
        setError(passwordError)
        setLoading(false)
        return
      }
    }

    try {
      if (isSignUp) {
        await signUp({
          username: email,
          password,
          options: {
            userAttributes: { email }
          }
        })
        setSuccess('Account created! Please check your email for verification code.')
      } else {
        const signInResult = await signIn({ username: email, password })
        console.log('Sign in result:', signInResult) // Debug log
        setSuccess('Login successful!')
        window.location.href = '/' // Force a full page reload
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Wavelength</h1>
        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
            {isSignUp && (
              <p className="mt-2 text-sm text-gray-600">
                Password must have:
                <ul className="list-disc pl-5">
                  <li>At least 8 characters</li>
                  <li>Uppercase letters</li>
                  <li>Lowercase letters</li>
                  <li>Numbers</li>
                  <li>Special characters</li>
                </ul>
              </p>
            )}
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-sm">{success}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white rounded-lg py-3 font-semibold 
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} 
              transition-colors`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
              setSuccess('')
            }}
            className="w-full text-sm text-blue-600 hover:text-blue-800 text-center mt-4"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}