import { AuthCredentialsService } from './authCredentialsTypes'
import { useAuthCredentialsContext } from './useAuthCredentialsContext'
// import { useAuthCrendentialsZustand } from './useAuthCredentialsZustand'

export function useAuthCrendentials(): AuthCredentialsService {
  return useAuthCredentialsContext()

  // return useAuthCrendentialsZustand()
}
