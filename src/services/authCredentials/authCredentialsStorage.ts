import { AuthCredentials } from '@domain'
import { storage } from '../storage/storage'

const STORAGE_KEY = '@Auth'

async function set(ac: AuthCredentials) {
  await storage.setItem(STORAGE_KEY, ac)
}

async function get() {
  const item = await storage.getItem<AuthCredentials>(STORAGE_KEY)
  return item
}

async function remove() {
  await storage.removeItem(STORAGE_KEY)
}

export const authCredentialsStorage = {
  get,
  set,
  remove
}
