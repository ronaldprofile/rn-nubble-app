import { api } from '@api'
import {
  AuthCredentialsApi,
  FieldIsAvailableAPI,
  ForgotPasswordParam,
  SignUpDataApi
} from './authTypes'
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

async function isUserNameAvailable(params: {
  username: string
}): Promise<FieldIsAvailableAPI> {
  const response = await api.get<FieldIsAvailableAPI>('/validate-username', {
    params
  })

  return response.data
}

async function isEmailAvailable(params: {
  email: string
}): Promise<FieldIsAvailableAPI> {
  const response = await api.get<FieldIsAvailableAPI>('/validate-email', {
    params
  })

  return response.data
}

async function forgotPassword(
  params: ForgotPasswordParam
): Promise<{ message: string }> {
  const response = await api.post<{ message: string }>(
    '/forgot-password',
    params
  )
  return response.data
}

export const authApi = {
  signIn,
  signOut,
  signUp,
  isUserNameAvailable,
  isEmailAvailable,
  forgotPassword
}
