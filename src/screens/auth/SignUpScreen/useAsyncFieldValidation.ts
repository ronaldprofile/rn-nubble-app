import { useAuthIsEmailAvailable, useAuthIsUsernameAvailable } from '@domain'
import { UseFormGetFieldState, UseFormWatch } from 'react-hook-form'
import { SignUpSchema } from './signup-schema'

interface UseAsyncFieldValidationParam {
  watch: UseFormWatch<SignUpSchema>
  getFieldState: UseFormGetFieldState<SignUpSchema>
}

interface Values {
  errorMessage?: string
  notReady: boolean
  isFetching: boolean
}

export function useAsyncFieldValidation({
  watch,
  getFieldState
}: UseAsyncFieldValidationParam): {
  usernameValidation: Values
  emailValidation: Values
} {
  const username = watch('username')
  const usernameState = getFieldState('username')
  const usernameIsValid = !usernameState.invalid && usernameState.isDirty

  const usernameQuery = useAuthIsUsernameAvailable({
    username,
    enabled: usernameIsValid
  })

  const email = watch('email')
  const emailState = getFieldState('email')
  const emailIsValid = !emailState.invalid && emailState.isDirty

  const emailQuery = useAuthIsEmailAvailable({
    email,
    enabled: emailIsValid
  })

  return {
    usernameValidation: {
      isFetching: usernameQuery.isFetching,
      notReady: usernameQuery.isFetching || usernameQuery.isUnavailable,
      errorMessage: usernameQuery.isUnavailable
        ? 'username indisponivel'
        : undefined
    },

    emailValidation: {
      isFetching: emailQuery.isFetching,
      notReady: emailQuery.isFetching || emailQuery.isUnavailable,
      errorMessage: emailQuery.isUnavailable ? 'email indisponivel' : undefined
    }
  }
}
