import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../../store/store";
import { UserRegister } from "../../../store/userSlice";

interface UserRegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export default function SignUp() {
	const dispatch = useDispatch<AppDispatch>();
	const [userData, setUserData] = useState<UserRegisterData>({ firstName: "", lastName: "", email: "", password: "" });

	const handleInputOnChangeData = (key: string, value: string) => {
		setUserData(prevState => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleAcceptUserRegister = () => {
		dispatch(UserRegister(userData));
	};

	return (
		<div className='sign-in-up vh-100 d-flex justify-content-center align-items-center'>
			<Container>
				<Row>
					<Col className='text m-auto' xs={10} md={8} lg={6} xl={5}>
						<div className='header mb-4 text-center'>REGISTER</div>
						<Form>
							<Form.Group>
								<Form.Label>First Name</Form.Label>
								<Form.Control
									onChange={e => handleInputOnChangeData("firstName", e.target.value)}
									value={userData.firstName}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									onChange={e => handleInputOnChangeData("lastName", e.target.value)}
									value={userData.lastName}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control onChange={e => handleInputOnChangeData("email", e.target.value)} value={userData.email} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									onChange={e => handleInputOnChangeData("password", e.target.value)}
									value={userData.password}
								/>
							</Form.Group>
						</Form>
						<Button className='btn w-100 mt-4 mb-4' onClick={handleAcceptUserRegister}>
							Register
						</Button>
						<Link to='/login'>
							<Button className='btn w-100 mt-4'>Sign in your account</Button>
						</Link>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
