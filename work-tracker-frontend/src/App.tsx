import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInUpSwitcher from "./components/shared-components/SignInUpSwitcher";
import SignUp from "./components/sing-components/SignUp";
import SignIn from "./components/sing-components/SignIn";
import MainContainer from "./components/dashboard-components/MainContainer";
import ProtectedRoute from "./components/sing-components/ProtectedRoute";

export default function App() {
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
			</Routes>
		</BrowserRouter>
	);
}
