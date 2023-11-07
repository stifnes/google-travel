import { createContext, useReducer } from 'react'

type LocationProviderProps = {children: React.ReactNode}

export const LocationsContext = createContext()

export const locationsReducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case 'SET_LOCATIONS': 
      return {
        locations: action.payload
      }
    case 'CREATE_LOCATION':
      return {
        locations: [action.payload, ...state.locations]
      }
    case 'DELETE_LOCATION':
      return {
        locations: state.locations.filter((l: { _id: any }) => l._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const LocationsContextProvider = ({ children }: LocationProviderProps) => {
  const [state, dispatch] = useReducer(locationsReducer, {
    locations: null
  })

  return (
    <LocationsContext.Provider value={{...state, dispatch}}>
      { children }
    </LocationsContext.Provider>
  )
}