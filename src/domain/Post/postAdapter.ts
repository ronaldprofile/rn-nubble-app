import { Post, PostApi } from './postTypes'

function toPost(postApi: PostApi): Post {
  return {
    id: postApi.id,
    author: {
      id: postApi.user.id,
      name: postApi.user.full_name,
      userName: postApi.user.username,
      profileURL: postApi.user.profile_url
    },

    imageURL: postApi.image_url,
    text: postApi.text,
    commentCount: parseInt(postApi.meta.comments_count, 10),
    favoriteCount: parseInt(postApi.meta.favorite_count, 10),
    reactionCount: parseInt(postApi.meta.like_count, 10)
  }
}

export const postAdapter = {
  toPost
}
