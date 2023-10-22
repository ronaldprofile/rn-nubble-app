import { useMutation } from '@tanstack/react-query'
import { SignUpData } from '../authTypes'
import { authService } from '../authServices'
import { MutationsOptions } from '@appInfra'

export function useAuthSignUp(options?: MutationsOptions<void>) {
  const { mutate, isError, isLoading } = useMutation<void, Error, SignUpData>({
    mutationFn: variables => authService.signUp(variables),
    retry: false,

    onError: error => {
      if (options?.onError) {
        options.onError(options.errorMessage || error.message)
      }
    },

    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess()
      }
    }
  })

  function signUp(signUpData: SignUpData) {
    mutate(signUpData)
  }

  return {
    signUp,
    isLoading,
    isError
  }
}
