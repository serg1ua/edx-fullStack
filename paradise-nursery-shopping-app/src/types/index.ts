export type BaseResponse<T> = {
  data: T[] | []
  total?: number
}

export type BaseRequestParams = {
  [key: string]: string
}

export type PlantRaw = {
  id: string
  Categories: string
  'Common name'?: string[]
  'Latin name': string
  Description?: string
  Img?: string
  Zone?: string[]
}

export type Plant = {
  id: string
  name: string
  category: string
  description: string
  image?: string
  price: number
}
