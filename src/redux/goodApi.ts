import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Product {
  id: number;
  name: string;
}

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
  endpoints: (build) => ({
    getGoods: build.query<Product[], string | void>({
      query: (limit = '') => `goods?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
          result ? [
                ...result.map(({ id }) => ({ type: 'Products', id } as const)),
                { type: 'Products', id: 'LIST' } as const,
              ]
              : [{ type: 'Products', id: 'LIST' } as const],
    }),
    addProduct: build.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: 'goods',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'Products', id: 'LIST'}]
    }),
    deleteProduct: build.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `goods/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{type: 'Products', id: 'LIST'}]
    })
  })
});

export const { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } = goodsApi;
