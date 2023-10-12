// UI
export interface User {
  id: number
  username: string
  profileUrl: string

  firstName: string
  lastName: string
  fullName: string
  email: string
  isOnline: boolean
}

// Api
export interface UserApi {
  id: number
  first_name: string
  last_name: string
  username: string
  email: string
  profile_url: string
  is_online: boolean
  full_name: string
}
