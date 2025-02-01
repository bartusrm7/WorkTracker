import { InputGroup, Form, Button, Col } from "react-bootstrap";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Calendar from "./mini-components/Calendar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useState } from "react";
import { UserDataFromAccessToken } from "../../../store/authSlice";

export default function Dashboard() {
	const dispatch = useDispatch<AppDispatch>();
	// const [userDataFromCookies, setUserDataFromCookies] = useState<{ firstName: string; lastName: string }>({
	// 	firstName: "",
	// 	lastName: "",
	// });

	// const handleGetUserDataFromCookies = () => {
	// 	dispatch(UserDataFromAccessToken())
	// }

	return (
		<div className='dashboard m-2'>
			<div className='dashboard__main-container account-info-big-container p-2 mb-2 d-lg-flex justify-content-between'>
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
								<Form.Control placeholder='Search...' />
								<Button className='custom-btn'>Search</Button>
							</InputGroup>
						</div>
					</div>
				</Col>
			</div>

			<div className='big-container'>
				<div className='dashboard__main-container big-separate-container p-2 mb-2 d-lg-flex flex-column justify-content-between'>
					<div className='dashboard__tracking-container'>
						<div className='dashboard__tracking-label label'>My tracking</div>
						<div className='dashboard__tracking-wrapper'></div>
					</div>
				</div>
				<div className='dashboard__main-container big-separate-container p-2 mb-2 d-lg-flex flex-column justify-content-between'>
					<div className='dashboard__task-container'>
						<div className='dashboard__task-label label'>
							Last tasks <span>{"(ILOŚĆ TASKSÓW)"}</span>
						</div>
						<div className='dashboard__task-wrapper'></div>
					</div>
				</div>
				<div className='dashboard__main-container big-separate-container p-2 mb-2 d-lg-flex flex-column justify-content-between'>
					<div className='dashboard__calendar-label label'>Calendar</div>
					<Calendar />
				</div>
				<div className='dashboard__main-container big-separate-container p-2 mb-2 d-lg-flex flex-column justify-content-between'>
					<div className='dashboard__motivation-quotes-container'>
						<div className='dashboard__motivation-quotes-label label'>Motivation quotes</div>
						<div className='dashboard__motivation-quotes-wrapper'></div>
					</div>
				</div>
			</div>
		</div>
	);
}
