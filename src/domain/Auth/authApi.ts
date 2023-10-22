import { api } from '@api'
import { AuthCredentialsApi, SignUpDataApi } from './authTypes'
import { UserApi } from '../User/userTypes'

async function signIn(
  email: string,
  password: string
): Promise<AuthCredentialsApi> {
  const response = await api.post<AuthCredentialsApi>('/login', {
    email,
    password
  })

  return response.data
}

async function signOut(): Promise<string> {
  const response = await api.get<string>('/profile/logout')
  return response.data
}

async function signUp(data: SignUpDataApi): Promise<UserApi> {
  const response = await api.post<UserApi>('/register', data)
  return response.data
}

export const authApi = {
  signIn,
  signOut,
  signUp
}
