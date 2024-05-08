import { QueryKeys, usePaginatedList } from '@appInfra'
import { userServices } from '../userService'

export function useUserSearch(search: string) {
  return usePaginatedList(
    [QueryKeys.UserList, search],
    () => userServices.searchUser(search),
    {
      enabled: search.length > 0,
      staleTime: 30000
    }
  )
}
