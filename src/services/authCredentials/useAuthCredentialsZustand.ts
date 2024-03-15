import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthCredentialsService } from './authCredentialsTypes'
import { storage } from '../storage/storage'

export const useAuthCrendentialsZustand = create<AuthCredentialsService>()(
  persist(
    set => ({
      isLoading: false,
      authCredentials: null,
      userId: null,
      saveCredentials: async ac => set({ authCredentials: ac }),
      removeCredentials: async () => set({ authCredentials: null })
    }),
    {
      name: '@auth',
      storage: storage
    }
  )
)
