import { apiAdapter } from '@api'
import { Page } from '@types'
import { postCommentAdapter } from './postCommentAdapter'
import { PostComment } from './postCommentTypes'
import { postCommentApi } from './postCommentApi'

const PER_PAGE = 10

async function getList(
  post_id: number,
  page: number
): Promise<Page<PostComment>> {
  const postCommentPageApi = await postCommentApi.getList(post_id, {
    page,
    per_page: PER_PAGE
  })

  return apiAdapter.toPageModel(
    postCommentPageApi,
    postCommentAdapter.toPostComment
  )
}

async function create(post_id: number, message: string): Promise<PostComment> {
  const postComment = await postCommentApi.create(post_id, message)
  return postCommentAdapter.toPostComment(postComment)
}

async function remove(postCommentId: number): Promise<string> {
  const response = await postCommentApi.remove(postCommentId)
  return response.message
}

/**
 * @description user can delete the comment if it is the post author or comment author
 *
 * @param postComment comment to be deleted
 * @param userId the current session user id
 * @param postAuthorId the id of post author
 */
function isAllowToRemove(
  postComment: PostComment,
  userId: number | null,
  postAuthorId: number
): boolean {
  if (postComment.author.id === userId) return true
  if (postAuthorId === userId) return true

  return false
}

export const postCommentService = {
  getList,
  create,
  remove,
  isAllowToRemove
}
