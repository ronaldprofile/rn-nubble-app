import { MutationsOptions } from '@appInfra'

import { useMutation } from '@tanstack/react-query'
import { authServices } from '../authServices'
import { AuthCredentials } from '../authTypes'
import { useAuthCrendentials } from '@services'

interface Variables {
  email: string
  password: string
}

export function useAuthSignIn(options?: MutationsOptions<AuthCredentials>) {
  const { saveCredentials } = useAuthCrendentials()

  const { mutate, isLoading, isError } = useMutation<
    AuthCredentials,
    Error,
    Variables
  >({
    mutationFn: ({ email, password }) => authServices.signIn(email, password),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(options.errorMessage || error.message)
      }
    },

    onSuccess: authCredentials => {
      authServices.updateToken(authCredentials.token)
      saveCredentials(authCredentials)
    }
  })

  return {
    signIn: (variables: Variables) => mutate(variables),
    isLoading,
    isError
  }
}
