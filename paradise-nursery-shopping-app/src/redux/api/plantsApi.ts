import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'
import type { BaseRequestParams, BaseResponse, Plant } from '../../types'

export const plantApi = createApi({
  reducerPath: 'plantApi',
  baseQuery,
  endpoints: (builder) => ({
    getAllPlants: builder.query<BaseResponse<Plant>, { params?: BaseRequestParams }>({
      query: ({ params }) => ({
        url: '/all-lite',
        credentials: 'include',
        params,
      }),
    }),
  }),
})

export const { useGetAllPlantsQuery } = plantApi
