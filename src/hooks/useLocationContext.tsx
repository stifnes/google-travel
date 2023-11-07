import { LocationsContext } from '../context/LocationContext'
import { useContext } from 'react'

export const useLocationContext = () => {
  const context = useContext(LocationsContext)

  if (!context) {
    throw Error('useLocationContext must be used inside an LocationsContextProvider')
  }

  return context
}