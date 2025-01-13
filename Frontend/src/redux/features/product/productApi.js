import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/product",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["product"],
    }),
    allProduct: builder.query({
      query: (email) => ({
        url: `/product/${email}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: (productInfo) => {
        const { _id, ...remData } = productInfo;

        return {
          url: `/product/${_id}`,
          method: "PUT",
          body: remData,
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteManyProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/product/delete`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useAllProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteManyProductMutation,
} = productApi;
