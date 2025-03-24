import { Link, useNavigate } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { UserLogout } from "../../../store/authSlice";
import SignOut from "../sing-components/SignOut";

export default function Navigation() {
	const dispatch = useDispatch<AppDispatch>();
	const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
	const navigate = useNavigate();

	const navLocation = [
		{ location: "/dashboard", label: "Dashboard" },
		{ location: "/my-tasks", label: "My Tasks" },
		{ location: "/statistics", label: "Statistics" },
		{ location: "/notifications", label: "Notifications" },
		{ location: "/settings", label: "Settings" },
	];

	const handleUserAccountLogout = () => {
		dispatch(UserLogout());
		navigate("/");
	};

	return (
		<div className='navigation'>
			<Hamburger toggled={isMenuOpened} toggle={() => setIsMenuOpened(!isMenuOpened)} />
			<nav
				className={`navigation__main-container d-flex flex-column justify-content-between justify-content-lg-center ${
					isMenuOpened ? "d-flex" : "d-none d-lg-flex"
				}`}>
				<div className='navigation__nav-container mt-5 text-center d-flex flex-column justify-content-lg-between'>
					{navLocation.map((item, index) => (
						<Link to={item.location} key={index}>
							<Button className='navigation__nav-btn mb-3 mt-3 mb-lg-0 mt-lg-0'>{item.label}</Button>
						</Link>
					))}
				</div>
				<p></p>
				<div className='navigation__logout-container mb-5 d-flex justify-content-center'>
					<SignOut extraClass='navigation__nav-btn' userAccountLogout={handleUserAccountLogout} />
				</div>
			</nav>
		</div>
	);
}
