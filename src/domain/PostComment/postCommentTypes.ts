import { UserApi } from '../User/userTypes'

// Api
export interface PostCommentApi {
  id: number
  message: string
  user_id: number
  post_id: number
  created_at: string
  updated_at: string
  user: UserApi
  meta: any
}

// UI

export interface PostComment {
  id: number
  message: string
  createdAt: string
  createdAtRelative: string

  author: {
    id: number
    name: string
    profileURL: string
    userName: string
  }
}
