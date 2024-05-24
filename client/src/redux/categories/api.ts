import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory } from "../../types";
import {
  defaultTransformErrorResponse,
  defaultTransformResponse,
} from "../../helpers";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (build) => ({
    getCategories: build.query<{ records: ICategory[]; total: number }, void>({
      query: (args: any) => {
        return {
          url: `/categories?${args.searchParams}`,
          method: "GET",
        };
      },

      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
