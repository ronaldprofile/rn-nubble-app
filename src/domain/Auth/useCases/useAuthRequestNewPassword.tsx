import { useMutation } from '@tanstack/react-query'
import { authService } from '../authServices'
import { MutationsOptions } from '@appInfra'

export function useAuthRequestNewPassword(options?: MutationsOptions<string>) {
  const { mutate, isLoading } = useMutation<string, Error, string>({
    mutationFn: email => authService.requestNewPassword(email),
    retry: false,

    onSuccess: message => {
      if (options?.onSuccess) {
        options.onSuccess(message)
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message)
      }
    }
  })

  return {
    requestNewPassword: (email: string) => mutate(email),
    isLoading
  }
}
