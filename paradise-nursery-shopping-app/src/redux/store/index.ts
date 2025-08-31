import {
  type TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { plantsReducer } from '../slice'
import { plantApi } from '../api'

const rootReducer = combineReducers({
  [plantApi.reducerPath]: plantApi.reducer,
  plants: plantsReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['plants'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const reduxPersistActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [...reduxPersistActions],
      },
    }).concat([plantApi.middleware]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useAppDispatch<AppDispatch>()

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector

export const persistor = persistStore(store)
