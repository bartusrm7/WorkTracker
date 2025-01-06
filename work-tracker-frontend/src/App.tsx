import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInUpSwitcher from "./components/shared-components/SignInUpSwitcher";
import SignUp from "./components/sing-components/SignUp";
import SignIn from "./components/sing-components/SignIn";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignInUpSwitcher />} />
				<Route path='/register' element={<SignUp />} />
				<Route path='/login' element={<SignIn />} />
			</Routes>
		</BrowserRouter>
	);
}
