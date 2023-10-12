import { Post, postService } from '@domain'
import { QueryKeys, usePaginatedList } from '@appInfra'

export function usePostList() {
  return usePaginatedList<Post>([QueryKeys.PostList], postService.getList)
}
