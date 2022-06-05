import { api } from "../../../../app/api";

export const ProjectApi = api.injectEndpoints({
	endpoints: (builder) => ({
		projectList: builder.query({
			query: (body) => {
				return ({
					url: 'project',
					method: 'POST',
					body,
				});
			},
			  providesTags: ["Project"],
		}),
	
		storeProject: builder.mutation({
			query: (body) => {
				console.log(body)
				return {
					url: "project/store",
					method: "POST",
					body,
				};
			},
			  invalidatesTags: (result, error, id) => ['Project'],
		}),

		deleteProject: builder.mutation({
			query: (id) => {
				return {
					url: `/project/delete/${id}`,
					method: "POST",
				};
			},
			  invalidatesTags: (result, error, id) => ['Project'],
		}),

		showProjectById: builder.query({
			query: (id) => {
				return{
				url: `/project/show/${id}`,
				method:"POST"
			}},
		}),

		searchClient: builder.query({
			query: (body) => {
				return{
				url: `/project/clientList`,
				method:"POST",
				body,
			}},
		}),
	}),
});

export const { useProjectListQuery, useDeleteProjectMutation,useShowProjectByIdQuery, useStoreProjectMutation,useSearchClientQuery } =
	ProjectApi;
