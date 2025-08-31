import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query'

const BASE_URL = import.meta.env.VITE_BASE_URL
const RAPIDAPI_HOUSEPLANTS_KEY = import.meta.env.VITE_RAPIDAPI_HOUSEPLANTS_KEY

const fetchQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  prepareHeaders: (headers) => {
    headers.set('X-RapidAPI-Key', RAPIDAPI_HOUSEPLANTS_KEY)
  },
})

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => await fetchQuery(args, api, extraOptions)
