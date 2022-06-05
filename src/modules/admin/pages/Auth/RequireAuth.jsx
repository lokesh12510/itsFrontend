import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import AdminLayout from "../../Layout";
import { adminUrls } from "../../urls";
import { selectCurrentToken } from "./authSlice";

const RequireAdminAuth = ({ children }) => {
	const token = useSelector(selectCurrentToken);
	const location = useLocation();

	return token ? (
		<AdminLayout>{children}</AdminLayout>
	) : (
		<Navigate to={adminUrls.login} state={{ from: location }} replace />
	);
};

export default RequireAdminAuth;
