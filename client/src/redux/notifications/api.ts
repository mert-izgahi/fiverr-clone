import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  defaultTransformErrorResponse,
  defaultTransformResponse,
} from "../../helpers";
import { INotification } from "../../types";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Notifications"],
  endpoints: (build) => ({
    getNotifications: build.query<INotification[], void>({
      query: () => {
        return {
          url: "/notifications",
          method: "GET",
        };
      },
      providesTags: ["Notifications"],
      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),
    updateNotificationState: build.mutation<INotification, { _id: string }>({
      query: (args) => {
        return {
          url: `/notifications/${args?._id}`,
          method: "PUT",
        };
      },

      invalidatesTags: ["Notifications"],

      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),

    deleteNotification: build.mutation<INotification, { _id: string }>({
      query: (args) => {
        return {
          url: `/notifications/${args?._id}`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["Notifications"],

      transformResponse: defaultTransformResponse,
      transformErrorResponse: defaultTransformErrorResponse,
    }),
  }),
});

export const {
  useUpdateNotificationStateMutation,
  useGetNotificationsQuery,
  useDeleteNotificationMutation,
} = notificationsApi;
