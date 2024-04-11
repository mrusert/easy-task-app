import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../Features/api/apiSlice'
import searchReducer from '../Features/lists/listSearchSlice'

export const store = configureStore({
    reducer: {
         [apiSlice.reducerPath]: apiSlice.reducer,
         search: searchReducer 
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware) 
})