import { MetaDataPage } from '@types'
import { MetaDataPageApi } from './apiTypes'

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

export const apiAdapter = {
  toMetaDataPage
}
