import { apiSlice } from './apiSlice';
import { IProduct } from '../../types/IProduct';

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct, string>({
      query: () => '/product/6781/',
    }),

    updateProduct: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/product/${product.id}`,
        method: 'PUT',
        body: product,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useUpdateProductMutation } = productsApi;
