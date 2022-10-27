import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL from "../../utils/baseURL";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL + "/api",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    signinUser: builder.mutation({
      query: (body) => {
        //console.log({body});
        return {
          url: "/manageUserLogin",
          method: "POST",
          body,
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError, // Our tricky API always returns a 200, but sets an `isError` property when there is an error.
        };
      },
    }),
  }),
});

export const { useSigninUserMutation } = authApi;
