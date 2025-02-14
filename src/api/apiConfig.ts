import { AuthCredentials, authService } from '@domain'
import axios from 'axios'

export const BASE_URL = 'http://127.0.0.1:3333'

export const api = axios.create({
  baseURL: BASE_URL
})

interface RegisterInterceptorParams {
  authCredentials: AuthCredentials | null
  removeCredentials: () => Promise<void>
  saveCredentials: (ac: AuthCredentials) => Promise<void>
}

export function registerInterceptor({
  authCredentials,
  removeCredentials,
  saveCredentials
}: RegisterInterceptorParams) {
  const interceptor = api.interceptors.response.use(
    response => response,
    async responseError => {
      const failedRequest = responseError.config
      const hasNotRefreshToken = !authCredentials?.refreshToken
      const isRefreshTokenRequest =
        authService.isRefreshTokenRequest(failedRequest)

      if (responseError.response.status === 401) {
        if (hasNotRefreshToken || isRefreshTokenRequest || failedRequest.sent) {
          removeCredentials()
          return Promise.reject(responseError)
        }

        failedRequest.sent = true

        const newAuthCredentials = await authService.authenticateByRefreshToken(
          authCredentials?.refreshToken
        )

        saveCredentials(newAuthCredentials)
        failedRequest.headers.Authorization = `Bearer ${newAuthCredentials.token}`
        return api(failedRequest)
      }

      return Promise.reject(responseError)
    }
  )

  return () => api.interceptors.response.eject(interceptor)
}
