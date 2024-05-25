import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOrder } from "../../types";
import {
  defaultTransformErrorResponse,
  defaultTransformResponse,
} from "../../helpers";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    createOrder: build.mutation<
      IOrder,
      { gigId: string; paymentIntentId: string; paymentStatus: string }
    >({
      query: (args) => {
        return {
          url: "/orders",
          method: "POST",
          body: args,
        };
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
      invalidatesTags: ["Orders"],
    }),

    getSellerOrders: build.query<{ records: IOrder[]; total: number }, void>({
      query: () => {
        return {
          url: "/seller-orders",
          method: "GET",
        };
      },
      providesTags: ["Orders"],
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),

    getBuyerOrders: build.query<{ records: IOrder[]; total: number }, void>({
      query: () => {
        return {
          url: "/buyer-orders",
          method: "GET",
        };
      },
      providesTags: ["Orders"],
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetSellerOrdersQuery,
  useGetBuyerOrdersQuery,
} = ordersApi;
