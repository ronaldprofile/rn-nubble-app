import { QueryKeys } from '@appInfra'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { cameraRollService } from './cameraRollService'

export function useCameraRoll(
  hasPermission: boolean,
  onInitialLoad?: (imageUri: string) => void
) {
  const [list, setList] = useState<string[]>([])

  const query = useInfiniteQuery({
    queryKey: [QueryKeys.CameraRollList],
    queryFn: ({ pageParam }) => cameraRollService.getPhotos(pageParam),
    getNextPageParam: ({ cursor }) => cursor,
    enabled: hasPermission
  })

  function fetchNextPage() {
    if (hasPermission) {
      query.fetchNextPage()
    }
  }

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<string[]>(
        (prev, current) => [...prev, ...current.photoList],
        []
      )

      setList(newList)

      if (query.data.pages.length === 1 && onInitialLoad) {
        onInitialLoad(newList[0])
      }
    }
  }, [query.data])

  return {
    photoList: list,
    hasNextPage: query.hasNextPage,
    fetchNextPage
  }
}
