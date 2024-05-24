import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types";
import {
  defaultTransformErrorResponse,
  defaultTransformResponse,
} from "../../helpers";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query<{ records: IUser[]; total: number }, void>({
      query: (args: any) => {
        return {
          url: `/users?${args.searchParams}`,
          method: "GET",
        };
      },
      providesTags: ["Users"],
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),

    getUser: build.query<IUser, { _id: string }>({
      query: (args) => {
        
        
        return {
          url: `/users/${args?._id}`,
          method: "GET",
        };
      },
      providesTags: ["Users"],
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),

    updateUser: build.mutation<IUser, IUser>({
      query: (args) => {
        return {
          url: `/users/${args._id}`,
          method: "PUT",
          body: args,
        };
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
      invalidatesTags: ["Users"],
    }),

    deleteUser: build.mutation<null, { _id: string }>({
      query: (args) => {
        return {
          url: `/users/${args._id}`,
          method: "DELETE",
        };
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
