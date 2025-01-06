import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function SignInUp() {
	const [isUserSignIn, setIsUserSignIn] = useState<boolean>(false);

	const handleSwitchLogReg = () => {
		setIsUserSignIn(!isUserSignIn);
	};

	return (
		<div className='sign-in-up vh-100 d-flex justify-content-center align-items-center'>
			<Container>
				<Row>
					<Col className='text m-auto' xs={10} md={8} lg={6} xl={5}>
						{isUserSignIn ? (
							<div className='header mb-4 text-center'>REGISTER</div>
						) : (
							<div className='header mb-4 text-center'>LOGIN</div>
						)}
						<Form>
							<Form.Group>
								<Form.Label>First Name</Form.Label>
								<Form.Control />
							</Form.Group>
							<Form.Group>
								<Form.Label>Last Name</Form.Label>
								<Form.Control />
							</Form.Group>
							{isUserSignIn && (
								<>
									<Form.Group>
										<Form.Label>Email</Form.Label>
										<Form.Control />
									</Form.Group>
									<Form.Group>
										<Form.Label>Password</Form.Label>
										<Form.Control />
									</Form.Group>
								</>
							)}
						</Form>
						{isUserSignIn ? (
							<Button className='btn w-100 mt-4 mb-4'>Register</Button>
						) : (
							<Button className='btn w-100 mt-4 mb-4'>Login</Button>
						)}
						{isUserSignIn ? (
							<Button className='btn w-100 mt-4' onClick={handleSwitchLogReg}>
								Create new account
							</Button>
						) : (
							<Button className='btn w-100 mt-4' onClick={handleSwitchLogReg}>
								Sign in your account
							</Button>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}
