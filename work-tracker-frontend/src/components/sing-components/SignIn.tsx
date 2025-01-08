import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store/store";
import { UserLogin } from "../../../store/authSlice";
import Spinner from "react-bootstrap/Spinner";

interface UserLoginData {
	email: string;
	password: string;
}

export default function SignIn() {
	const dispatch = useDispatch<AppDispatch>();
	const [userData, setUserData] = useState<UserLoginData>({ email: "", password: "" });
	const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleInputOnChangeData = (key: string, value: string) => {
		setUserData(prevState => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleAcceptUserLogin = () => {
		dispatch(UserLogin(userData));
		setIsLoadingPage(!isLoadingPage);

		setInterval(() => {
			navigate("/dashboard");
		}, 2000);
	};

	return (
		<div className='sign-in-up vh-100 d-flex justify-content-center align-items-center'>
			<Container>
				<Row>
					{isLoadingPage ? (
						<Col className='sign-in-up__spinner d-flex justify-content-center align-items-center'>
							<span className='sign-in-up__loading-span'>Loading...</span>
							<Spinner animation='border' size='sm' role='status'>
								<span className='visually-hidden'>Loading...</span>
							</Spinner>
						</Col>
					) : (
						<Col className='text m-auto' xs={10} md={8} lg={6} xl={5}>
							<div className='header mb-4 text-center'>LOGIN</div>
							<Form>
								<Form.Group>
									<Form.Label>Email</Form.Label>
									<Form.Control
										onChange={e => handleInputOnChangeData("email", e.target.value)}
										value={userData.email}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Password</Form.Label>
									<Form.Control
										onChange={e => handleInputOnChangeData("password", e.target.value)}
										value={userData.password}
									/>
								</Form.Group>
							</Form>
							<Button className='custom-btn w-100 mt-4 mb-4' onClick={handleAcceptUserLogin}>
								Login
							</Button>
							<Link to='/register'>
								<Button className='custom-btn w-100 mt-4'>Create new account</Button>
							</Link>
						</Col>
					)}
				</Row>
			</Container>
		</div>
	);
}
