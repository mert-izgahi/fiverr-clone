import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types";
import { signInAction, signOutAction } from "./slice";
import { defaultTransformErrorResponse, defaultTransformResponse } from "../../helpers";
interface SignUpArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
// export const defaultTransformResponse = (response: {
//   result: any;
//   status: number;
// }) => {
//   return response.result;
// };

// export const defaultTransformErrorResponse = (baseQueryReturnValue: any) => {
//   const errorMessage =
//     (baseQueryReturnValue?.data?.message as string) || "Something went wrong";
//   return errorMessage;
// };

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
  }),
});

export const { useSignUpMutation } = authApi;
