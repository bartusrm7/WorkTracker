import { InputGroup, Form, Button, Col } from "react-bootstrap";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Calendar from "./mini-components/Calendar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { UserNamesGetFromBackend } from "../../../store/authSlice";
import dayjs from "dayjs";
import { GetTask } from "../../../store/tasksSlice";

export default function Dashboard() {
	const dispatch = useDispatch<AppDispatch>();
	const firstName = useSelector((state: RootState) => state.auth.firstName);
	const lastName = useSelector((state: RootState) => state.auth.lastName);
	const tasksData = useSelector((state: RootState) => state.tasks.tasks);
	const [selectedDate, setSelectedDate] = useState(dayjs());

	const filteredTasksData = selectedDate
		? tasksData.filter(task => dayjs(task.taskDate).isSame(selectedDate, "day"))
		: tasksData;

	const tasksAmount = filteredTasksData.filter(task => task.taskStatus === "done");

	useEffect(() => {
		dispatch(UserNamesGetFromBackend());
		dispatch(GetTask());
	}, [dispatch, firstName]);

	return (
		<div className='dashboard m-2'>
			<div className='dashboard__main-container account-info-big-container p-2 mb-2 d-lg-flex justify-content-between'>
				<div></div>

				<div className='dashboard__account-info-container d-flex justify-content-center'>
					<div className='dashboard__account-info'>
						{firstName} {lastName}
					</div>
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
						<div className='dashboard__tracking-label label'>
							My tracking <span>{filteredTasksData.length !== 0 ? `(${filteredTasksData.length})` : ""}</span>
						</div>
						{filteredTasksData.map((task, index) => (
							<div className='dashboard__tracking-wrapper' key={index}>
								<div className='dashboard__task-item'>{task.taskName}</div>
							</div>
						))}
					</div>
				</div>
				<div className='dashboard__main-container big-separate-container p-2 mb-2 d-lg-flex flex-column justify-content-between'>
					<div className='dashboard__task-container'>
						<div className='dashboard__task-label label'>
							Last tasks done <span>{tasksAmount.length !== 0 ? `(${tasksAmount.length})` : ""}</span>
						</div>
						{filteredTasksData.map((task, index) => (
							<div className='dashboard__task-wrapper' key={index}>
								<div className='dashboard__task-done-item'>{task.taskStatus === "done" ? task.taskName : ""}</div>
							</div>
						))}
					</div>
				</div>
				<div className='dashboard__main-container big-separate-container p-2 mb-2 d-block'>
					<div className='dashboard__calendar-label label'>Calendar</div>
					<Calendar selectedDate={selectedDate} chooseDate={newDate => setSelectedDate(newDate || dayjs)} />
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
