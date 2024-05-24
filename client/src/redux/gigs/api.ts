import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGig } from "../../types";
import {
  defaultTransformErrorResponse,
  defaultTransformResponse,
} from "../../helpers";

export const gigsApi = createApi({
  reducerPath: "gigsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Gigs"],
  endpoints: (build) => ({
    getGigs: build.query<{ records: IGig[]; total: number }, void>({
      query: (args: any) => {
        return {
          url: `/gigs?${args.searchParams}`,
          method: "GET",
        };
      },
      providesTags: ["Gigs"],
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),

    getGig: build.query<IGig, { _id: string }>({
      query: (args) => {
        return {
          url: `/gigs/${args?._id}`,
          method: "GET",
        };
      },
      providesTags: ["Gigs"],
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),

    createGig: build.mutation<IGig, IGig>({
      query: (args) => {
        return {
          url: "/gigs",
          method: "POST",
          body: args,
        };
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
      invalidatesTags: ["Gigs"],
    }),

    updateGig: build.mutation<IGig, IGig>({
      query: (args) => {
        return {
          url: `/gigs/${args._id}`,
          method: "PUT",
          body: args,
        };
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
      invalidatesTags: ["Gigs"],
    }),

    deleteGig: build.mutation<null, { _id: string }>({
      query: (args) => {
        return {
          url: `/gigs/${args._id}`,
          method: "DELETE",
        };
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
      invalidatesTags: ["Gigs"],
    }),
  }),
});

export const {
  useGetGigsQuery,
  useGetGigQuery,
  useCreateGigMutation,
  useUpdateGigMutation,
  useDeleteGigMutation,
} = gigsApi;
