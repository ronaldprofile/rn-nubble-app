// Api
export interface PostCommentApi {
  id: number
  message: string
  user_id: number
  post_id: number
  created_at: string
  updated_at: string
  user: UserApi
  post: PostApi
  meta: Meta
}

interface UserApi {
  id: number
  first_name: string
  last_name: string
  username: string
  email: string
  profile_url: string
  is_online: boolean
  full_name: string
}

interface PostApi {
  id: number
  text: string
  user_id: number
  image_url: string
  is_fixed: boolean
  is_activated: boolean
  created_at: string
  updated_at: string
  status: string
  meta: Meta
}

interface Meta {}

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
