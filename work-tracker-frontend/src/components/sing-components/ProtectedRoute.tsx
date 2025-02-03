import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";

interface ProtectRoute {
	children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectRoute) {
	const isUserLogged = useSelector((state: RootState) => state.auth.isLogged);
	const navigate = useNavigate();

	if (!isUserLogged) {
		return navigate("/");
	}

	return children;
}
