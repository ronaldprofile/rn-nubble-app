import { postCommentService } from '@domain'
import { QueryKeys, usePaginatedList } from '@appInfra'

export function usePostCommentList(postId: number) {
  function getList(page: number) {
    return postCommentService.getList(postId, page)
  }

  return usePaginatedList([QueryKeys.PostCommentList, postId], getList)
}
