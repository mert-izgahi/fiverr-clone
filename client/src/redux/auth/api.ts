import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types";
import { signInAction, signOutAction } from "./slice";
import {
  defaultTransformErrorResponse,
  defaultTransformResponse,
} from "../../helpers";
interface SignUpArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignInArgs {
  email: string;
  password: string;
}


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    // Sign In Query
    signUp: builder.mutation<SignUpArgs, IUser>({
      query: (args) => {
        return {
          url: "/sign-up",
          method: "POST",
          body: args,
        };
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(signInAction(data));
        } catch (err) {
          throw err;
        }
      },
    }),

    signIn: builder.mutation<SignInArgs, IUser>({
      query: (args) => {
        return {
          url: "/sign-in",
          method: "POST",
          body: args,
        };
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(signInAction(data));
        } catch (err) {
          throw err;
        }
      },
    }),

    signOut: builder.mutation({
      query: () => {
        return {
          url: "/sign-out",
          method: "POST",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(signOutAction());
      },
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } =
  authApi;
