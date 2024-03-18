import { BASE_URL, PageDataApi } from '@api'
import { POST_COMMENT_PATH, PostCommentApi } from '@domain'
import { http, HttpResponse } from 'msw'
import { mockedData } from './mocks'
import { cloneDeep } from 'lodash'

const PATH = `${BASE_URL}${POST_COMMENT_PATH}`

let inMemoryResponse = cloneDeep(mockedData.mockedPostCommentResponse)

export function resetInMemoryResponse() {
  inMemoryResponse = cloneDeep(mockedData.mockedPostCommentResponse)
}

export const postCommentHandlers = [
  http.get(PATH, async () => {
    const response: PageDataApi<PostCommentApi> = inMemoryResponse

    return HttpResponse.json(response, { status: 200 })
  }),

  http.post<any, { post_id: number; message: string }>(
    PATH,
    async ({ request }) => {
      const body = await request.json()

      const newPostComment: PostCommentApi = {
        ...mockedData.postCommentAPI,
        id: 999,
        post_id: body.post_id,
        message: body.message
      }

      inMemoryResponse.data = [newPostComment, ...inMemoryResponse.data]
      inMemoryResponse.meta = {
        ...inMemoryResponse.meta,
        total: inMemoryResponse.meta.total + 1
      }

      return HttpResponse.json(newPostComment, { status: 201 })
    }
  ),

  http.delete<{ postCommentId: string }>(
    `${PATH}/:postCommentId`,
    async ({ params }) => {
      const { postCommentId } = params

      inMemoryResponse.data = inMemoryResponse.data.filter(
        it => it.id.toString() !== postCommentId
      )
      inMemoryResponse.meta = {
        ...inMemoryResponse.meta,
        total: inMemoryResponse.meta.total - 1
      }

      return HttpResponse.json({ message: 'removed' }, { status: 200 })
    }
  )
]
