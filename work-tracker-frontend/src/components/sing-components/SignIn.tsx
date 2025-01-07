import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../../store/store";
import { UserLogin } from "../../../store/userSlice";

interface UserLoginData {
	email: string;
	password: string;
}

export default function SignIn() {
	const dispatch = useDispatch<AppDispatch>();
	const [userData, setUserData] = useState<UserLoginData>({ email: "", password: "" });

	const handleInputOnChangeData = (key: string, value: string) => {
		setUserData(prevState => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleAcceptUserLogin = () => {
		dispatch(UserLogin(userData));
	};

	return (
		<div className='sign-in-up vh-100 d-flex justify-content-center align-items-center'>
			<Container>
				<Row>
					<Col className='text m-auto' xs={10} md={8} lg={6} xl={5}>
						<div className='header mb-4 text-center'>LOGIN</div>
						<Form>
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
						<Button className='btn w-100 mt-4 mb-4' onClick={handleAcceptUserLogin}>
							Login
						</Button>
						<Link to='/register'>
							<Button className='btn w-100 mt-4'>Create new account</Button>
						</Link>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
