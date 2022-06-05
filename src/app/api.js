import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/config";

export const api = createApi({
	tagTypes: ["Project","Client"],
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			// By default, if we have a token in the store, let's use that for authenticated requests
			const token = getState().auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			console.log(token, "***");
			return headers;
		},
	}),
	keepUnusedDataFor:1,

	// baseQuery: staggeredBaseQueryWithBailOut,
	endpoints: () => ({}),
});
