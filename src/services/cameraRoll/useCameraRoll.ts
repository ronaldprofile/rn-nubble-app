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

  // async function getPhotos() {
  //   const hasPermission = hasAndroidPermission()

  //   if (hasPermission) {
  //     const photoPage = await CameraRoll.getPhotos({
  //       first: 10
  //     })

  //     setList(photoPage.edges.map(edge => edge.node.image.uri))
  //   }

  //   return []
  // }

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

  // async function hasAndroidPermission() {
  //   if (Platform.OS === 'ios') return true

  //   const getCheckPermissionPromise = () => {
  //     if (Platform.Version >= 33) {
  //       return Promise.all([
  //         PermissionsAndroid.check(
  //           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
  //         ),
  //         PermissionsAndroid.check(
  //           PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
  //         )
  //       ]).then(
  //         ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
  //           hasReadMediaImagesPermission && hasReadMediaVideoPermission
  //       )
  //     } else {
  //       return PermissionsAndroid.check(
  //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  //       )
  //     }
  //   }

  //   const hasPermission = await getCheckPermissionPromise()

  //   if (hasPermission) {
  //     return true
  //   }

  //   const getRequestPermissionPromise = () => {
  //     if (Platform.Version >= 33) {
  //       return PermissionsAndroid.requestMultiple([
  //         PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
  //         PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
  //       ]).then(
  //         statuses =>
  //           statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
  //             PermissionsAndroid.RESULTS.GRANTED &&
  //           statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
  //             PermissionsAndroid.RESULTS.GRANTED
  //       )
  //     } else {
  //       return PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  //       ).then(status => status === PermissionsAndroid.RESULTS.GRANTED)
  //     }
  //   }

  //   return await getRequestPermissionPromise()
  // }

  return {
    photoList: list,
    hasNextPage: query.hasNextPage,
    fetchNextPage: () => query.fetchNextPage
  }
}
