import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: string[] = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<string>) => {
      state.push(action.payload)
    },
    deleteCartItem: (state, action: PayloadAction<string>) => {
      state.splice(state.indexOf(action.payload), 1)
    },
    deleteCartItems: (state, action: PayloadAction<string>) => {
      const filtered = state.filter((item) => item !== action.payload)
      state.length = 0
      state.push(...filtered)
    },
  },
})

export const { addCartItem, deleteCartItem, deleteCartItems } = cartSlice.actions

export const cartReducer = cartSlice.reducer
