import { apiSlice } from './apiSlice';
import { ITrl } from '../../types/ITrl';

export const trlApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrls: builder.query<ITrl[], string>({
      query: () => '/trl',
    }),
  }),
});

export const { useGetTrlsQuery } = trlApi;
