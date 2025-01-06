import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SignIn() {
	return (
		<div className='sign-in-up vh-100 d-flex justify-content-center align-items-center'>
			<Container>
				<Row>
					<Col className='text m-auto' xs={10} md={8} lg={6} xl={5}>
						<div className='header mb-4 text-center'>LOGIN</div>
						<Form>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control />
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control />
							</Form.Group>
						</Form>
						<Button className='btn w-100 mt-4 mb-4'>Login</Button>
						<Link to='/register'>
							<Button className='btn w-100 mt-4'>Create new account</Button>
						</Link>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
