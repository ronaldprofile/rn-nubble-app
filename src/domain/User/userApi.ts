import { PageDataApi, api } from '@api'
import { UserApi } from './userTypes'

export const USER_PATH = 'users'

async function getById(id: string) {
  const response = await api.get<UserApi>(`${USER_PATH}/${id}`)

  return response.data
}

export async function getList(search: string): Promise<PageDataApi<UserApi>> {
  const response = await api.get<PageDataApi<UserApi>>(USER_PATH, {
    params: { search }
  })

  return response.data
}

export const userApi = {
  getById,
  getList
}
