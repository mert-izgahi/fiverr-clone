import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGig, IOrder } from "../../types";
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
    createOrder: build.mutation<IOrder, { gigId: string,paymentIntentId: string,paymentStatus: string }>({
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
  }),
});

export const {
  useCreateOrderMutation,
} = ordersApi;
