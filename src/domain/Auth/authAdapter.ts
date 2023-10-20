import { userAdapter } from '../User/userAdapter'
import { AuthCredentials, AuthCredentialsApi } from './authTypes'

function toAuthCredentials(
  authCredentialsApi: AuthCredentialsApi
): AuthCredentials {
  return {
    token: authCredentialsApi.auth.token,
    user: userAdapter.toUser(authCredentialsApi.user)
  }
}

export const authAdapter = {
  toAuthCredentials
}
