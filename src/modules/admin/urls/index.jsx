import React from "react";
import AdminLogin from "../pages/Auth/AdminLogin";
import AdminRegister from "../pages/Auth/AdminRegister";
import Client from "../pages/Client";
import PointsStatement from "../pages/PointsStatement";
import AdminForgotPassword from "../pages/Auth/ForgotPassword";
import Project from "../pages/Project/Index";
import WorkRequest from "../pages/WorkRequest";
import Badge from "../pages/Badge/Index";

export const adminUrls = {
	project: "/",
	client: "/client",
	workRequest: "/work-request",
	pointsStatement: "/points-statement",
	badge: "/badge",
	// auth
	login: "/login",
	register: "/register",
	forgotPassword: "/forgot-assword",
};

// routes
const adminRoutes = [
	{
		path: adminUrls.project,
		element: <Project />,
		auth: true,
		roles: [],
	},
	{
		path: adminUrls.client,
		element: <Client />,
		auth: true,
		roles: [],
	},
	{
		path: adminUrls.workRequest,
		element: <WorkRequest />,
		auth: true,
		roles: [],
	},
	{
		path: adminUrls.pointsStatement,
		element: <PointsStatement />,
		auth: true,
		roles: [],
	},
	{
		path: adminUrls.badge + "/:id",
		element: <Badge />,
		auth: true,
		roles: [],
	},
	{
		path: adminUrls.login,
		element: <AdminLogin />,
		auth: false,
		roles: [],
	},
	{
		path: adminUrls.register,
		element: <AdminRegister />,
		auth: false,
		roles: [],
	},
	{
		path: adminUrls.forgotPassword,
		element: <AdminForgotPassword />,
		auth: false,
		roles: [],
	},
];

export default adminRoutes;
