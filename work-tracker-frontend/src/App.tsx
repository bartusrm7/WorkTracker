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
import Statistics from "./components/dashboard-components/Statistics";
import Motivations from "./components/dashboard-components/Motivations";

export default function App() {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const refreshInterval = setInterval(() => {
			const currentRefreshInterval = Cookies.get("refreshToken");
			if (currentRefreshInterval) {
				dispatch(RefreshAccessTokenAfterExpired(currentRefreshInterval));
			}
		}, 14 * 60 * 1000);
		return () => clearInterval(refreshInterval);
	}, [dispatch]);

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
				<Route
					path='/statistics'
					element={
						<ProtectedRoute>
							<Statistics />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/motivations'
					element={
						<ProtectedRoute>
							<Motivations />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
