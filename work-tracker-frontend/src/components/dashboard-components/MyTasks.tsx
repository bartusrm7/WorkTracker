import { Button } from "react-bootstrap";
import Navigation from "../navigation-components/Navigation";
import TasksCreator from "./mini-components/TasksCreator";
import { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { GetTask } from "../../../store/tasksSlice";

export default function MyTasks() {
	const dispatch = useDispatch<AppDispatch>();
	const tasksData = useSelector((state: RootState) => state.tasks.tasks);
	const [toggleCreatorContainer, setToggleCreatorContainer] = useState<boolean>(false);
	const date = new Date().toLocaleDateString();

	useEffect(() => {
		dispatch(GetTask());
	}, [dispatch]);

	return (
		<>
			<Navigation />
			{toggleCreatorContainer && (
				<TasksCreator toggleContainer={() => setToggleCreatorContainer(!toggleCreatorContainer)} />
			)}
			<div className='my-tasks m-2'>
				<div className='my-tasks__big-main-container'>
					<div className='my-tasks__main-container big-separate-container p-2 mb-2 d-flex justify-content-between align-items-center'>
						<div>My tasks</div>
						<Button className='custom-btn' onClick={() => setToggleCreatorContainer(!toggleCreatorContainer)}>
							Create new task
						</Button>
					</div>
					<div className='my-tasks__main-container big-separate-container date-container p-2 mb-2 d-flex justify-content-between align-items-center'>
						<div>Choose date</div>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={["DatePicker"]}>
								<DatePicker label={date} />
							</DemoContainer>
						</LocalizationProvider>
					</div>

					<div className='my-tasks__main-container big-separate-container tasks-container mb-2'>
						<div className='my-tasks__tasks-items-big-container tasks-grid-sets'>
							<div className='my-tasks__task-category'>Name</div>
							<div className='my-tasks__task-category'>Description</div>
							<div className='my-tasks__task-category'>Action</div>
						</div>

						{tasksData.map((task, index) => (
							<div className='my-tasks__tasks-container tasks-grid-sets' key={index}>
								<div className='my-tasks__task-item'>{task.taskName}</div>
								<div className='my-tasks__task-item'>{task.taskDescription}</div>
								<div className='my-tasks__task-item'></div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
