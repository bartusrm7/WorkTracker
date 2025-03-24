import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import { resetRegistrationStatus, UserRegister } from "../../../store/userSlice";

interface UserRegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export default function SignUp() {
	const dispatch = useDispatch<AppDispatch>();
	const registrationStatus = useSelector((state: RootState) => state.user.status);
	const [userData, setUserData] = useState<UserRegisterData>({ firstName: "", lastName: "", email: "", password: "" });
	const isUserEmailExists = useSelector((state: RootState) =>
		state.user.user.some(user => user.email === userData.email)
	);
	const [isUserRegistered, setIsUserRegistered] = useState<boolean>(false);
	const [validationError, setValidationError] = useState<{
		firstName?: string;
		lastName?: string;
		email?: string;
		password?: string;
	}>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const handleInputOnChangeData = (key: string, value: string) => {
		setUserData(prevState => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleValidationForm = () => {
		const errors: { firstName?: string; lastName?: string; email?: string; password?: string } = {};

		if (!userData.firstName) {
			errors.firstName = "First name is required!";
		}

		if (!userData.lastName) {
			errors.lastName = "Last name is required!";
		}

		if (!userData.email) {
			errors.email = "Email is required!";
		} else if (!/\S+@\S+\.\S+/.test(userData.email)) {
			errors.email = "Invalid email format!";
		} else if (isUserEmailExists) {
			errors.email = "User with this email already exists!";
		}

		if (!userData.password) {
			errors.password = "Password is required!";
		} else if (userData.password.length < 8) {
			errors.password = "Password must be at least 8 characters";
		}

		setValidationError(errors);
		return Object.keys(errors).length === 0;
	};

	const handleAcceptUserRegister = () => {
		if (handleValidationForm()) {
			dispatch(UserRegister(userData));
		}
	};

	const handleResetRegisterStatus = () => {
		if (isUserRegistered) {
			dispatch(resetRegistrationStatus());
			setIsUserRegistered(false);
		}
	};

	useEffect(() => {
		if (registrationStatus === "success") {
			setIsUserRegistered(true);
		}
	}, [registrationStatus]);

	return (
		<div className='sign-in-up vh-100 d-flex justify-content-center align-items-center'>
			<Container>
				<Row>
					{isUserRegistered ? (
						<Col className='text m-auto' xs={10} md={8} lg={6} xl={5}>
							<div className='text-center'>
								<p className='mb-0'>Congratulation!</p>
								<p className='mb-0'>You registered successfully</p>
							</div>
							<Link to='/login'>
								<Button className='custom-btn w-100 mt-4' onClick={handleResetRegisterStatus}>
									Sign in your account
								</Button>
							</Link>
						</Col>
					) : (
						<Col className='text m-auto' xs={10} md={8} lg={6} xl={5}>
							<div className='header mb-4 text-center'>REGISTER</div>
							<Form noValidate>
								<Form.Group>
									<Form.Label>First Name</Form.Label>
									<Form.Control
										onChange={e => handleInputOnChangeData("firstName", e.target.value)}
										isInvalid={!!validationError.firstName}
										value={userData.firstName}
										type='text'
									/>
									<Form.Control.Feedback type='invalid'>{validationError.firstName}</Form.Control.Feedback>
								</Form.Group>
								<Form.Group>
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										onChange={e => handleInputOnChangeData("lastName", e.target.value)}
										isInvalid={!!validationError.lastName}
										value={userData.lastName}
										type='text'
									/>
									<Form.Control.Feedback type='invalid'>{validationError.lastName}</Form.Control.Feedback>
								</Form.Group>
								<Form.Group>
									<Form.Label>Email</Form.Label>
									<Form.Control
										onChange={e => handleInputOnChangeData("email", e.target.value)}
										isInvalid={!!validationError.email}
										value={userData.email}
										type='email'
									/>
									<Form.Control.Feedback type='invalid'>{validationError.email}</Form.Control.Feedback>
								</Form.Group>
								<Form.Group>
									<Form.Label>Password</Form.Label>
									<Form.Control
										onChange={e => handleInputOnChangeData("password", e.target.value)}
										isInvalid={!!validationError.password}
										value={userData.password}
										type='password'
									/>
									<Form.Control.Feedback type='invalid'>{validationError.password}</Form.Control.Feedback>
								</Form.Group>
							</Form>
							<Button className='custom-btn w-100 mt-4 mb-4' onClick={handleAcceptUserRegister}>
								Register
							</Button>
							<Link to='/login'>
								<Button className='custom-btn w-100 mt-4'>Sign in your account</Button>
							</Link>
						</Col>
					)}
				</Row>
			</Container>
		</div>
	);
}
