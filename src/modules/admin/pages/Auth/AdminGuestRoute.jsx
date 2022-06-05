import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// urls
import { adminUrls } from "../../urls";
import { selectCurrentToken } from "./authSlice";

const AdminGuestRoute = ({ children }) => {
	const token = useSelector(selectCurrentToken);
	// if logged in
	if (token !== null) {
		return <Navigate to={adminUrls.project} replace />;
	}

	return children;
};

export default AdminGuestRoute;
