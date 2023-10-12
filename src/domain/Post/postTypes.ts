// UI
export interface Post {
  id: number
  text: string

  author: {
    id: number
    name: string
    profileURL: string
    userName: string
  }

  imageURL: string
  reactionCount: number
  commentCount: number
  favoriteCount: number
}

// API
export interface PostApi {
  id: number
  text: string
  user_id: number
  image_url: string
  is_fixed: boolean
  is_activated: boolean
  created_at: string
  updated_at: string
  user: PostApiUser
  status: string
  meta: PostApiMeta
}

interface PostApiUser {
  id: number
  first_name: string
  last_name: string
  username: string
  email: string
  profile_url: string
  is_online: boolean
  full_name: string
}

interface PostApiMeta {
  like_count: string
  favorite_count: string
  comments_count: string
}
