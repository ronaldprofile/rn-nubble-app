import { userAdapter } from '../User/userAdapter'
import { AuthCredentials, AuthCredentialsApi } from './authTypes'

function toAuthCredentials(
  authCredentialsApi: AuthCredentialsApi
): AuthCredentials {
  return {
    token: authCredentialsApi.auth.token,
    user: userAdapter.toUser(authCredentialsApi.user),
    refreshToken: authCredentialsApi.auth.refreshToken,
    tokenExperiesAt: authCredentialsApi.auth.experies_at
  }
}

export const authAdapter = {
  toAuthCredentials
}
