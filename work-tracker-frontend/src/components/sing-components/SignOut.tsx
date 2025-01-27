import { Button } from "react-bootstrap";

interface UserLogoutProps {
	extraClass: string;
	userAccountLogout: () => void;
}

export default function SignOut({ extraClass, userAccountLogout }: UserLogoutProps) {
	return (
		<div>
			<Button className={extraClass} onClick={userAccountLogout}>Logout</Button>
		</div>
	);
}
