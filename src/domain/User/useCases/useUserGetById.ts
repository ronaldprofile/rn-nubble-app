import { QueryKeys } from '@appInfra'
import { useQuery } from '@tanstack/react-query'
import { userServices } from '../userService'

export function useUserGetById(id: number) {
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.UserGetById, id],
    queryFn: () => userServices.getById(id),
    staleTime: 1000 * 30 // 30 seconds
  })

  return {
    user: data,
    refetch,
    isError,
    isLoading,
    isFetching
  }
}
