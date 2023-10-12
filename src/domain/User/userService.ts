import { userAdapter } from './userAdapter'
import { userApi } from './userApi'
import { User } from './userTypes'

export async function getById(id: number): Promise<User> {
  const user = await userApi.getById(id.toString())
  return userAdapter.toUser(user)
}

export const userServices = {
  getById
}
