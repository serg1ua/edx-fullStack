import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: string[] = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.push(action.payload)
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.splice(state.indexOf(action.payload), 1)
    },
    updateQuantity: (state, action: PayloadAction<string>) => {
      const filtered = state.filter((item) => item !== action.payload)
      state.length = 0
      state.push(...filtered)
    },
  },
})

export const { addItem, removeItem, updateQuantity } = cartSlice.actions

export const cartReducer = cartSlice.reducer
