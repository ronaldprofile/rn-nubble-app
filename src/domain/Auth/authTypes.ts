import { User, UserApi } from '../User/userTypes'

// UI
export interface AuthCredentials {
  token: string
  user: User
}

// Api
export interface AuthCredentialsApi {
  auth: {
    type: string
    token: string
  }

  user: UserApi
}
