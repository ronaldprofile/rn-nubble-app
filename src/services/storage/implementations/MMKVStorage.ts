import { MMKV } from 'react-native-mmkv'
import { StorageService } from '../storage'

const MMKVInstance = new MMKV()

export const MMKVStorage: StorageService = {
  setItem: async (key, value) => {
    MMKVInstance.set(key, JSON.stringify(value))
  },

  getItem: async key => {
    const item = MMKVInstance.getString(key)

    if (item) {
      return JSON.parse(item)
    }

    return null
  },

  removeItem: async key => MMKVInstance.delete(key)
}
