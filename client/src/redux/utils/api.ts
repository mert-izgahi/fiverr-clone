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
  }),
});

export const { useUploadImageMutation } = utilsApi;
