import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPainting } from '../models/IPainting';

interface IQueryParams {
  limit: number;
  page: number;
  q?: string;
}

export const paintingAPI = createApi({
  reducerPath: 'paintingAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://test-front.framework.team/',
  }),
  endpoints: (build) => ({
    fetchPaintings: build.query<
      {
        data: IPainting[];
        totalCount: number;
      },
      IQueryParams
    >({
      query: ({ limit, page, q }) => ({
        url: '/paintings',
        params: {
          _limit: limit,
          _page: page,
          q,
        },
      }),
      transformResponse: (response: IPainting[], meta) => {
        const totalCount = Number(meta?.response?.headers.get('X-Total-Count'));
        return { data: response, totalCount };
      },
    }),
  }),
});
