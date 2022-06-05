import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminGuestRoute from "../modules/admin/pages/Auth/AdminGuestRoute";
import AdminLayout from "../modules/admin/Layout";
import Error from "../modules/admin/pages/Error";
import adminRoutes from "../modules/admin/urls";
import RequireAdminAuth from "../modules/admin/pages/Auth/RequireAuth";

const AppRoutes = () => {
	return (
		<Routes>
			{/* Admin module route */}
			<Route>
				{adminRoutes?.map((route, i) => {
					return (
						<Route
							key={i}
							path={route.path}
							element={
								<>
									{route.auth ? (
										<RequireAdminAuth>{route.element}</RequireAdminAuth>
									) : (
										<AdminGuestRoute>{route.element}</AdminGuestRoute>
									)}
								</>
							}
						/>
					);
				})}
			</Route>
			{/* Admin module route */}

			{/* 404 route */}
			<Route path="*" element={<Error />} />
		</Routes>
	);
};

export default AppRoutes;
