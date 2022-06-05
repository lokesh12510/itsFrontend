import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../constants/config";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: (builder) => ({
		authAdminLogin: builder.mutation({
			query: (body) => {
				return {
					url: "auth/login",
					method: "POST",
					body,
				};
			},
		}),
	}),
});

export const { useAuthAdminLoginMutation } = authApi;
