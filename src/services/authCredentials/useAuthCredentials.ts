import { create } from 'zustand'
import { AuthCredentialsService } from './authCredentialsTypes'

export function useAuthCrendentials(): AuthCredentialsService {
  return useAuthCrendentialsZustand()
}

const useAuthCrendentialsZustand = create<AuthCredentialsService>(set => ({
  isLoading: false,
  authCredentials: null,
  saveCredentials: async ac => set({ authCredentials: ac }),
  removeCredentials: async () => set({ authCredentials: null })
}))
