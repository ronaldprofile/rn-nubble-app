import { api } from '@api'
import { UserApi } from './userTypes'

async function getById(id: string) {
  const response = await api.get<UserApi>(`/users/${id}`)

  return response.data
}

export const userApi = {
  getById
}
