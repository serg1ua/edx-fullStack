export type BaseResponse<T> = {
  data: T[] | []
  total?: number
}

export type BaseRequestParams = {
  [key: string]: unknown
}

export type Plant = {
  id: string
  name: string
  category: string
  description: string
  img: string
  price: string
}
