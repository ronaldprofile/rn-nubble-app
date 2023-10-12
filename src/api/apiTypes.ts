export interface MetaDataPageApi {
  total: number
  per_page: number
  current_page: number
  last_page: number
  first_page: number
  first_page_url: string
  last_page_url: string
  next_page_url: string | null
  previous_page_url: string | null
}

/**
 * @description This interface defines the format of an API data page
 * @template Data defines type data of page
 */
export interface PageDataApi<Data> {
  meta: MetaDataPageApi
  data: Data[]
}

export interface PageParamsApi {
  page?: number
  per_page?: number
}
