import { api } from "../../../../app/api";

export const BadgeApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getBadgeList: builder.mutation({
			query: (body) => {
				return {
					url: `badge/${body.project_id}`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["Badge"],
		}),
	}),
});

export const { useGetBadgeListMutation } = BadgeApi;
