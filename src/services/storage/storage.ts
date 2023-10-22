export interface StorageService {
  setItem: <T>(key: string, value: T) => Promise<void>
  getItem: <T>(key: string) => Promise<T | null>

  removeItem: (key: string) => Promise<void>
}

export let storage: StorageService

export function initializeImplementationStorage(
  implementationStorage: StorageService
) {
  storage = implementationStorage
}
