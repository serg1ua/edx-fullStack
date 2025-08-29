import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query'

const BASE_URL = import.meta.env.VITE_BASE_URL as string

const fetchQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
})

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await fetchQuery(args, api, extraOptions)
  return result
}
