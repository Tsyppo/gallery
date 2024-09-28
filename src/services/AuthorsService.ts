import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthor } from '../models/IAuthor';

export const authorsAPI = createApi({
  reducerPath: 'authotsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://test-front.framework.team/',
  }),
  endpoints: (build) => ({
    fetchAllAuthors: build.query<IAuthor[], void>({
      query: () => ({
        url: '/authors',
      }),
    }),
  }),
});
