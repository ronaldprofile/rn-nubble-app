import { User, UserApi } from '../User/userTypes'

// UI
export interface AuthCredentials {
  token: string
  user: User
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
