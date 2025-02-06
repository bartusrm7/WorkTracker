import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectRoute {
	children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectRoute) {
	const token = Cookies.get("accessToken");

	if (!token) {
		return <Navigate to='/' replace />;
	}
	return children;
}
