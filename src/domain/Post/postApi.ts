import { PageDataApi, PageParamsApi, api } from '@api'
import { PostApi } from './postTypes'

async function getList(params?: PageParamsApi): Promise<PageDataApi<PostApi>> {
  const response = await api.get<PageDataApi<PostApi>>('/user/post', {
    params
  })

  return response.data
}

export const postApi = {
  getList
}
