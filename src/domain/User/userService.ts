import { apiAdapter } from '@api'
import { userAdapter } from './userAdapter'
import { userApi } from './userApi'
import { User } from './userTypes'

export async function getById(id: number): Promise<User> {
  const response = await userApi.getById(id.toString())
  return userAdapter.toUser(response)
}

async function searchUser(search: string) {
  const response = await userApi.getList(search)
  return apiAdapter.toPageModel(response, userAdapter.toUser)
}

export const userServices = {
  getById,
  searchUser
}
