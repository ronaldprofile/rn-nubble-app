import { useEffect, useState } from 'react'
import { permissionService } from './permissionService'
import { PermissionName, PermissionStatus } from './permissionTypes'

export function usePermission(permissionName: PermissionName) {
  const [status, setStatus] = useState<PermissionStatus>()
  const [isLoading, setIsLoading] = useState(true)

  async function checkPermission() {
    try {
      setIsLoading(true)
      const initialStatus = await permissionService.check(permissionName)

      if (initialStatus === 'denied') {
        const newStatus = await permissionService.request(permissionName)
        setStatus(newStatus)
      } else {
        setStatus(initialStatus)
      }
    } catch (error) {
      setStatus('unavailable')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkPermission()
  }, [])

  return { status, loading: isLoading }
}
