import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: string[] = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItem: (state, action: PayloadAction<string>) => {
      state.push(action.payload)
    },
  },
})

export const { setCartItem } = cartSlice.actions

export const cartReducer = cartSlice.reducer
