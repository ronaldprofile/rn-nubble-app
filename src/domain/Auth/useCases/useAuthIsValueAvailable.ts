import { useDebounce } from '@hooks'
import { useQuery } from '@tanstack/react-query'
import { authService } from '../authServices'
import { QueryKeys } from '@appInfra'

interface Param<T extends { length: number }> {
  queryKey: QueryKeys
  value: T
  isValueAvailable: (value: T) => Promise<boolean>
  enabled: boolean
}

interface UseAuthIsValueAvailableResult {
  isUnavailable: boolean
  isFetching: boolean
}

function useAuthIsValueAvailable<T extends { length: number }>({
  queryKey,
  enabled,
  isValueAvailable,
  value
}: Param<T>): UseAuthIsValueAvailableResult {
  const debouncedValue = useDebounce(value, 1500)

  const { data, isFetching } = useQuery({
    queryKey: [queryKey, debouncedValue],
    queryFn: () => isValueAvailable(debouncedValue),
    retry: false,
    staleTime: 20000,
    enabled: enabled && value.length > 0
  })

  const isDeboucing = debouncedValue !== value

  return {
    isUnavailable: data === false,
    isFetching: isFetching || isDeboucing
  }
}

export function useAuthIsUsernameAvailable({
  username,
  enabled
}: {
  username: string
  enabled: boolean
}) {
  return useAuthIsValueAvailable({
    value: username,
    enabled,
    isValueAvailable: authService.isUserNameAvailable,
    queryKey: QueryKeys.IsUsernameAvailable
  })
}
export function useAuthIsEmailAvailable({
  email,
  enabled
}: {
  email: string
  enabled: boolean
}) {
  return useAuthIsValueAvailable({
    value: email,
    enabled,
    isValueAvailable: authService.isEmailAvailable,
    queryKey: QueryKeys.IsEmailAvailable
  })
}
