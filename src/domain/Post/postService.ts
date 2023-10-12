import { apiAdapter } from '@api'
import { postAdapter } from './postAdapter'
import { postApi } from './postApi'
import { Post } from './postTypes'
import { Page } from '@types'

async function getList(page: number): Promise<Page<Post>> {
  const postPageApi = await postApi.getList({ page, per_page: 10 })

  return {
    meta: apiAdapter.toMetaDataPage(postPageApi.meta),
    data: postPageApi.data.map(postPage => postAdapter.toPost(postPage))
  }
}

export const postService = {
  getList
}
