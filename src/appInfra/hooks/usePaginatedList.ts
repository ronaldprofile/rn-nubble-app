import { useInfiniteQuery } from '@tanstack/react-query'
import { Page } from '@types'
import { useEffect, useState } from 'react'

interface UsePaginatedListResult<TData> {
  list: TData[]
  isError: boolean | null
  isLoading: boolean
  isFetching: boolean
  refresh: () => void
  fetchNextPage: () => void

  hasNextPage: boolean
}

interface PaginatedListOptions {
  enabled?: boolean
  staleTime?: number
}

export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getList: (page: number) => Promise<Page<Data>>,
  options?: PaginatedListOptions
): UsePaginatedListResult<Data> {
  const [data, setData] = useState<Data[]>([])

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => getList(pageParam),
    getNextPageParam: ({ meta }) =>
      meta.hasNextPage ? meta.currentPage + 1 : undefined,
    enabled: options?.enabled,
    staleTime: options?.staleTime
  })

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<Data[]>(
        (prev, current) => [...prev, ...current.data],
        []
      )

      setData(newList)
    }
  }, [query.data])

  return {
    list: data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refresh: query.refetch,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: !!query.hasNextPage
  }
}
