import { MetaDataPage, Page } from '@types'
import { MetaDataPageApi, PageDataApi } from './apiTypes'

function toMetaDataPage(meta: MetaDataPageApi): MetaDataPage {
  return {
    total: meta.total,
    currentPage: meta.current_page,
    firstPage: meta.first_page,
    lastPage: meta.last_page,
    perPage: meta.per_page,
    hasNextPage: !!meta.next_page_url,
    hasPreviousPage: !!meta.previous_page_url
  }
}

function toPageModel<ApiType, ModelType>(
  page: PageDataApi<ApiType>,
  adapterToModel: (api: ApiType) => ModelType
): Page<ModelType> {
  return {
    meta: toMetaDataPage(page.meta),
    data: page.data.map(adapterToModel)
  }
}

export const apiAdapter = {
  toMetaDataPage,
  toPageModel
}
