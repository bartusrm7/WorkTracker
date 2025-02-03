import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Navigate } from "react-router-dom";

interface ProtectRoute {
	children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectRoute) {
	const isUserLogged = useSelector((state: RootState) => state.auth.isLogged);

	if (!isUserLogged) {
		return <Navigate to='/' replace />;
	}

	return children;
}
