import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

interface User {
  fullname?: string,
  dateofbirth?: string,
  address?: string,
  email?: string,
  password?: string
}

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null || false)
  const { dispatch }: any = useAuthContext()

  const signup = async (user: User) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ user })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}