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
  tagTypes: ["Categories"],
  endpoints: (build) => ({
    getCategories: build.query<{ records: ICategory[]; total: number }, void>({
      query: (args: any) => {
        if (args.all) {
          return {
            url: "/categories?all=true",
            method: "GET",
          };
        } else {
          return {
            url: `/categories?${args.searchParams}`,
            method: "GET",
          };
        }
      },
      providesTags: ["Categories"],
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),

    getCategoriesState : build.query<ICategory[], void>({
      query: () => {
        return {
          url: "/categories/state",
          method: "GET",
        };
      },
      providesTags: ["Categories"],
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),

    createCategory: build.mutation<ICategory, ICategory>({
      query: (args) => {
        return {
          url: "/categories",
          method: "POST",
          body: args,
        };
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
      invalidatesTags: ["Categories"],
    }),

    updateCategory: build.mutation<ICategory, ICategory>({
      query: (args) => {
        return {
          url: `/categories/${args._id}`,
          method: "PUT",
          body: args,
        };
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: build.mutation<null, { _id: string }>({
      query: (args) => {
        return {
          url: `/categories/${args._id}`,
          method: "DELETE",
        };
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesStateQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
