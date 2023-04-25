import { apiSlice } from './apiSlice';
import { IAppConfig } from '../../types/IAppConfig';

const  APP_ID = import.meta.env.VITE_APP_ID || 1;

export const appConfigApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppConfig: builder.query<IAppConfig, string>({
      query: () => `/configuration/${APP_ID}`,
    }),
  }),
});

export const { useGetAppConfigQuery } = appConfigApi;
