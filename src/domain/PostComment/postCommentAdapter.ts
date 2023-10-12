import { dateUtils } from '@utils'
import { PostComment, PostCommentApi } from './postCommentTypes'

function toPostComment(postCommentApi: PostCommentApi): PostComment {
  return {
    id: postCommentApi.id,
    message: postCommentApi.message,
    createdAt: postCommentApi.created_at,
    createdAtRelative: dateUtils.formatRelative(postCommentApi.created_at),

    author: {
      id: postCommentApi.user.id,
      name: postCommentApi.user.full_name,
      userName: postCommentApi.user.username,
      profileURL: postCommentApi.user.profile_url
    }
  }
}

export const postCommentAdapter = {
  toPostComment
}
