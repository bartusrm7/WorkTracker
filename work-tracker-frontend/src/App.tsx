import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInUpSwitcher from "./components/shared-components/SignInUpSwitcher";
import SignUp from "./components/sing-components/SignUp";
import SignIn from "./components/sing-components/SignIn";
import MainContainer from "./components/dashboard-components/MainContainer";
import ProtectedRoute from "./components/sing-components/ProtectedRoute";
import MyTasks from "./components/dashboard-components/MyTasks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { RefreshAccessTokenAfterExpired } from "../store/authSlice";
import Cookies from "js-cookie";

export default function App() {
	const dispatch = useDispatch<AppDispatch>();
	const refreshToken = Cookies.get("refreshToken");

	useEffect(() => {
		if (refreshToken) {
			dispatch(RefreshAccessTokenAfterExpired(refreshToken));
		}
	}, [refreshToken]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignInUpSwitcher />} />
				<Route path='/register' element={<SignUp />} />
				<Route path='/login' element={<SignIn />} />
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
							<MainContainer />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/my-tasks'
					element={
						<ProtectedRoute>
							<MyTasks />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
