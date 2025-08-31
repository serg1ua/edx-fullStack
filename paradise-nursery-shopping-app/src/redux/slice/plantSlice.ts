import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Plant, PlantRaw } from '../../types'
import { plantApi } from '../api'

const initialState: Plant[] = []

const plantSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    setPlants: (_, action: PayloadAction<Plant[]>) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        const actionTypesToMatch = [plantApi.endpoints.getAllPlants.matchFulfilled(action)]
        return actionTypesToMatch.some((act) => act)
      },
      (_, { payload: plantsRaw }: { payload: PlantRaw[] }) => {
        if (Array.isArray(plantsRaw)) {
          return plantsRaw.map((plant) => ({
            id: plant.id,
            category: plant.Categories,
            name: plant['Common name']?.[0] ?? plant['Latin name'],
            description: plant.Description ?? plant['Latin name'],
            image: plant.Img,
            price: `$${plant.Zone?.[0]?.split('-')?.[0]}`, // fake price
          }))
        }
        return initialState
      },
    )
  },
})

export const { setPlants } = plantSlice.actions

export const plantsReducer = plantSlice.reducer
