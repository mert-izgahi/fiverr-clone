import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  defaultTransformErrorResponse,
  defaultTransformResponse,
} from "../../helpers";

export const utilsApi = createApi({
  reducerPath: "utilsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (build) => ({
    uploadImage: build.mutation<
      { url: string; public_id: string },
      { imageFile: File }
    >({
      query: (args) => {
        const formData = new FormData();
        formData.append("image", args.imageFile);
        return {
          url: "/upload-image",
          method: "POST",
          body: formData,
        };
      },

      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),

    createPaymentIntent: build.mutation<
      { clientSecret: string },
      { gigId: string }
    >({
      query: (args) => {
        return {
          url: "/create-payment-intent",
          method: "POST",
          body: args,
        };
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),

    checkPaymentIntentStatus: build.query<
      any,
      { sessionId: string }
    >({
      query: (args) => {
        return {
          url: `/check-payment-intent-status/${args.sessionId}`,
          method: "GET",
        };
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),
  }),
});

export const {
  useUploadImageMutation,
  useCreatePaymentIntentMutation,
  useCheckPaymentIntentStatusQuery,
} = utilsApi;
