import * as React from 'react'

type AuthProviderProps = {children: React.ReactNode}

export const AuthContext = React.createContext()

interface User {
  fullname?: string,
  dateofbirth?: string,
  address?: string,
  email?: string,
  password?: string
}

export const authReducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = React.useReducer(authReducer, { 
    user: null
  })

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}