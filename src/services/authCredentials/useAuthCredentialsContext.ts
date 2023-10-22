import { useContext } from 'react'
import { AuthCredentialsService } from './authCredentialsTypes'
import { AuthCredentialsContext } from './Providers/AuthCredentialsProvider'

export function useAuthCredentialsContext(): AuthCredentialsService {
  const context = useContext(AuthCredentialsContext)

  if (!context) {
    throw new Error('Auth must be used within a AuthCredentialsProvider')
  }

  return context
}
