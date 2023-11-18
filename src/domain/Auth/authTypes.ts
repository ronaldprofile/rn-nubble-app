import { User, UserApi } from '../User/userTypes'

// UI
export interface AuthCredentials {
  token: string
  user: User
  refreshToken: string
  tokenExperiesAt: string
}

export interface SignUpData {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

// Api
export interface AuthCredentialsApi {
  auth: {
    type: string
    token: string
    refreshToken: string
    experies_at: string
  }

  user: UserApi
}

export interface SignUpDataApi {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

export interface FieldIsAvailableAPI {
  message: string
  isAvailable: boolean
}

export interface ForgotPasswordParam {
  email: string
}
