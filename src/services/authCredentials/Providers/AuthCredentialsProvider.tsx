import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { AuthCredentialsService } from '../authCredentialsTypes'
import { AuthCredentials, authService } from '@domain'
import { authCredentialsStorage } from '../authCredentialsStorage'
import { registerInterceptor } from '@api'

export const AuthCredentialsContext = createContext<AuthCredentialsService>(
  {} as AuthCredentialsService
)

export function AuthCredentialsProvider({ children }: PropsWithChildren) {
  const [authCredentials, setAuthCredentials] =
    useState<AuthCredentials | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    startAuthCredentials()
  }, [])

  useEffect(() => {
    const interceptor = registerInterceptor({
      authCredentials,
      saveCredentials,
      removeCredentials
    })

    return interceptor
  }, [authCredentials])

  async function startAuthCredentials() {
    try {
      const ac = await authCredentialsStorage.get()

      if (ac) {
        authService.updateToken(ac.token)

        setAuthCredentials(ac)
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  async function saveCredentials(ac: AuthCredentials) {
    authService.updateToken(ac.token)

    authCredentialsStorage.set(ac)

    setAuthCredentials(ac)
  }

  async function removeCredentials() {
    authService.removeToken()

    authCredentialsStorage.remove()

    setAuthCredentials(null)
  }

  const userId = authCredentials?.user.id || null

  return (
    <AuthCredentialsContext.Provider
      value={{
        authCredentials,
        userId,
        isLoading,
        saveCredentials,
        removeCredentials
      }}
    >
      {children}
    </AuthCredentialsContext.Provider>
  )
}
