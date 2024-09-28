import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILocation } from '../models/ILication';

export const locationsAPI = createApi({
  reducerPath: 'locationsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://test-front.framework.team/',
  }),
  endpoints: (build) => ({
    fetchAllLocations: build.query<ILocation[], void>({
      query: () => ({
        url: '/locations',
      }),
    }),
  }),
});
