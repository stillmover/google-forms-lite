import { configureStore } from '@reduxjs/toolkit'
import { api } from '../api/enhancedApi'
import { formsReducer } from './formsSlice'
import { responsesReducer } from './responsesSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    forms: formsReducer,
    responses: responsesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
