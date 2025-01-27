import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SignInUpSwitcher() {
	return (
		<div className='sign-up-in vh-100 d-flex flex-column justify-content-center align-items-center'>
			<div className='text-center p-3 pb-0'>
				<p className='sign-up-in__enter-sentence'>Join to our community if you want follow your progress!</p>
				<Link to='/login'>
					<Button className='sign-up-in__start-btn custom-btn'>Let's get started</Button>
				</Link>
			</div>
		</div>
	);
}
