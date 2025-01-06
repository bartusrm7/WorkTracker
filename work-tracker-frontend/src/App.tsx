import { Route, Router, Routes } from "react-router-dom";
import SignUp from "./components/sing-components/SignUp";
import SignIn from "./components/sing-components/SignIn";

export default function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/register' element={<SignUp />} />
					<Route path='/login' element={<SignIn />} />
				</Routes>
			</Router>
		</>
	);
}
