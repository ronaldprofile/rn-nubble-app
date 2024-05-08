import { create } from 'zustand'
import { SearchHistoryService } from './searchHistoryType'
import { persist } from 'zustand/middleware'
import { storage } from '../storage/storage'

const useSearchHistoryStore = create<SearchHistoryService>()(
  persist(
    (set, get) => ({
      userList: [],
      addUser: user => {
        const userList = get().userList

        const userExists = userList.find(it => it.id === user.id)

        if (!userExists) {
          set({ userList: [...userList, user] })
        }
      },
      removeUser: userId => {
        const userList = get().userList
        const updatedList = userList.filter(user => user.id !== userId)
        set({ userList: updatedList })
      },
      clearUserList: () => set({ userList: [] })
    }),
    {
      name: '@SearchHistory',
      storage: storage
    }
  )
)

export function useSearchHistory(): SearchHistoryService['userList'] {
  const userList = useSearchHistoryStore(state => state.userList)
  return userList
}

export function useSearchHistoryService(): Omit<
  SearchHistoryService,
  'userList'
> {
  const addUser = useSearchHistoryStore(state => state.addUser)
  const removeUser = useSearchHistoryStore(state => state.removeUser)
  const clearUserList = useSearchHistoryStore(state => state.clearUserList)
  return {
    addUser,
    removeUser,
    clearUserList
  }
}
