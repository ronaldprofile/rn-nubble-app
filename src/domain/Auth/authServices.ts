import { api } from '@api'
import { authApi } from './authApi'
import { AuthCredentials, SignUpData } from './authTypes'
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

async function signUp(signUpData: SignUpData): Promise<void> {
  await authApi.signUp(signUpData)
}

function updateToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

function removeToken() {
  api.defaults.headers.common.Authorization = null
}

async function isUserNameAvailable(username: string): Promise<boolean> {
  const { isAvailable } = await authApi.isUserNameAvailable({ username })
  return isAvailable
}
async function isEmailAvailable(email: string): Promise<boolean> {
  const { isAvailable } = await authApi.isEmailAvailable({ email })
  return isAvailable
}

async function requestNewPassword(email: string) {
  const { message } = await authApi.forgotPassword({
    email
  })

  return message
}

export const authService = {
  signIn,
  signOut,
  signUp,
  updateToken,
  removeToken,
  isUserNameAvailable,
  isEmailAvailable,
  requestNewPassword
}
