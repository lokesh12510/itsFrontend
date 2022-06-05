import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./adminApi";

const authSlice = createSlice({
	name: "auth",
	initialState: { user: null, token: null, role: "ROLE_GUEST" },
	reducers: {
		setCredentials: (state, action) => {
			const { user, accessToken } = action.payload;
			state.user = user;
			state.token = accessToken;
		},
		logOut: (state) => {
			state.user = null;
			state.token = null;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.authAdminLogin.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token;
				state.role = payload.user.role;
				state.user = payload.user;
			}
		);
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
