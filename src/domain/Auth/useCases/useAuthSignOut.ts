import { useMutation } from '@tanstack/react-query'
import { authService } from '../authServices'
import { useAuthCrendentials } from '@services'
import { MutationsOptions } from '@appInfra'
import { AuthCredentials } from '../authTypes'

export function useAuthSignOut(options?: MutationsOptions<AuthCredentials>) {
  const { removeCredentials } = useAuthCrendentials()

  const { mutate, isLoading, isError } = useMutation<string, Error, void>({
    mutationFn: () => authService.signOut(),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(options.errorMessage || error.message)
      }
    },

    onSuccess: () => {
      removeCredentials()
    }
  })

  return {
    signOut: mutate,
    isLoading,
    isError
  }
}
