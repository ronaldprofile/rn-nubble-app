import AsyncStorage from '@react-native-async-storage/async-storage'
import { StorageService } from '../storage'

export const asyncStorage: StorageService = {
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  },

  getItem: async key => {
    const item = await AsyncStorage.getItem(key)

    if (item) {
      return JSON.parse(item)
    }

    return null
  },

  removeItem: async key => await AsyncStorage.removeItem(key)
}
