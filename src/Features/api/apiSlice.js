import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api', // Unique key within the Redux store
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }), // Base query with the server URL
    tagTypes: ['List'], 
    endpoints: (builder) => ({})
});