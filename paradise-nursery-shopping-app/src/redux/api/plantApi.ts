import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'
import type { BaseResponse, Plant } from '../../types'

export const plantApi = createApi({
  reducerPath: 'plantApi',
  baseQuery,
  endpoints: (builder) => ({
    getAllPlants: builder.query<BaseResponse<Plant>, unknown>({
      query: () => ({
        url: '/all-lite',
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
})

export const { useGetAllPlantsQuery } = plantApi
