import { api } from "../../../../app/api";

export const WorkListApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getWorkList: builder.mutation({
			query: (body) => {
				return {
					url: "workrequest",
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["Work"],
		}),
	}),
});

export const { useGetWorkListMutation } = WorkListApi;
