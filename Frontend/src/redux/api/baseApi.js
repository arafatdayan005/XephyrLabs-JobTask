import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState()).auth.token;

    if (token) {
      headers.set("authorization", token);
    }
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
