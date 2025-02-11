import { Button } from "react-bootstrap";
import Navigation from "../navigation-components/Navigation";
import TasksCreator from "./mini-components/TasksCreator";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function MyTasks() {
	const [toggleCreatorContainer, setToggleCreatorContainer] = useState<boolean>(false);
	const date = new Date().toLocaleDateString();

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
					<div className='my-tasks__main-container big-separate-container tasks-container p-2 mb-2'></div>
				</div>
			</div>
		</>
	);
}
