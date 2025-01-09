import { InputGroup, Form, Button, Col } from "react-bootstrap";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export default function Dashboard() {
	return (
		<div className='dashboard m-2'>
			<div className='dashboard__main-container p-2 d-lg-flex justify-content-between'>
				<div></div>

				<div className='dashboard__account-info-container d-flex justify-content-center align-items-center'>
					<div className='dashboard__account-info'>Bartosz</div>
					<div className='dashboard__account-photo'>
						<AccountCircleOutlinedIcon />
					</div>
				</div>

				<Col sm={10} md={9} lg={8} xl={7} xxl={6} className='m-auto'>
					<div className='dashboard__search-info-container'>
						<div className='dashboard__search-info'>
							<InputGroup>
								<Form.Control placeholder="Search..." />
								<Button className='custom-btn'>Search</Button>
							</InputGroup>
						</div>
					</div>
				</Col>
			</div>
		</div>
	);
}
