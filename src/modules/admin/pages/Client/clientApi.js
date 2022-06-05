import { api } from "../../../../app/api";

export const ClientApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getClientList: builder.query({
			query: (body) => {
				return {
					url: "clientList",
					method: "POST",
					body,
				};
			},
			providesTags: ["Client"],
		}),
	}),
});

export const { useGetClientListQuery } = ClientApi;
