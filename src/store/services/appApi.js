// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import baseURL from '../../utils/baseURL';

// initialize an empty api service that we'll inject endpoints into later as needed
export const appApi = createApi({
    baseQuery: fetchBaseQuery({
        reducerPath: 'appApi',
        baseUrl: baseURL + '/api',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
        },
        timeout: 30000,
        setTimeout: timeout => {
          return timeout;
        },
      }),
  endpoints: () => ({}),

})