import { api } from '@api'
import { authApi } from './authApi'
import { AuthCredentials } from './authTypes'
import { authAdapter } from './authAdapter'

async function signIn(
  email: string,
  password: string
): Promise<AuthCredentials> {
  try {
    const authCredentialsApi = await authApi.signIn(email, password)
    return authAdapter.toAuthCredentials(authCredentialsApi)
  } catch (error) {
    throw new Error('email ou senha inválido')
  }
}

async function signOut(): Promise<string> {
  const message = authApi.signOut()
  return message
}

function updateToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

function removeToken() {
  api.defaults.headers.common.Authorization = null
}

export const authServices = {
  signIn,
  signOut,
  updateToken,
  removeToken
}
