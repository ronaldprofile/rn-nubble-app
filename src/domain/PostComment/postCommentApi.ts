import { PageDataApi, PageParamsApi, api } from '@api'
import { PostCommentApi } from './postCommentTypes'

const POST_COMMENT_API_PATH = '/user/post_comment'

async function getList(
  post_id: number,
  pageParams?: PageParamsApi
): Promise<PageDataApi<PostCommentApi>> {
  const response = await api.get<PageDataApi<PostCommentApi>>(
    `${POST_COMMENT_API_PATH}`,
    {
      params: {
        post_id,
        ...pageParams
      }
    }
  )

  return response.data
}

async function create(
  post_id: number,
  message: string
): Promise<PostCommentApi> {
  const response = await api.post(`${POST_COMMENT_API_PATH}`, {
    post_id,
    message
  })

  return response.data
}

async function remove(postCommentId: number): Promise<{ message: string }> {
  const response = await api.delete<{ message: string }>(
    `${POST_COMMENT_API_PATH}/${postCommentId}`
  )

  return response.data
}

export const postCommentApi = {
  getList,
  create,
  remove
}
