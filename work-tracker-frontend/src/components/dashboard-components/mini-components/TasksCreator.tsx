import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { useState } from "react";
import { CreateTask, GetTask } from "../../../../store/tasksSlice";
import dayjs from "dayjs";

interface toggleContainerProps {
	toggleContainer: () => void;
}

interface UserTaskData {
	ID: number;
	email: string;
	taskName: string;
	taskDate: Date;
	taskDescription: string;
}

export default function TasksCreator({ toggleContainer }: toggleContainerProps) {
	const dispatch = useDispatch<AppDispatch>();
	const [taskData, setTaskData] = useState<UserTaskData>({
		ID: Date.now(),
		email: "",
		taskName: "",
		taskDate: new Date(),
		taskDescription: "",
	});

	const handleCreateNewTaskInputs = (key: string, value: string | Date) => {
		setTaskData(prevState => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleCreateNewTask = async () => {
		if (!taskData.taskName || !taskData.taskDate) {
			return;
		}
		await dispatch(CreateTask(taskData));
		await dispatch(GetTask());
		toggleContainer();
	};

	return (
		<div className='tasks-creator'>
			<div className='tasks-creator__main-container d-flex justify-content-center align-items-center'>
				<div className='tasks-creator__task-creator-container d-flex justify-content-center align-items-center'>
					<Button className='tasks-creator__close-btn custom-btn' onClick={toggleContainer}>
						<CloseIcon />
					</Button>
					<Form className='tasks-creator__task-wrapper d-flex flex-column justify-content-evenly'>
						<Form.Group>
							<Form.Label>Task name</Form.Label>
							<Form.Control
								value={taskData.taskName.charAt(0).toUpperCase() + taskData.taskName.slice(1)}
								onChange={(e: any) => handleCreateNewTaskInputs("taskName", e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Task date</Form.Label>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={["DatePicker"]}>
									<DatePicker
										value={dayjs(taskData.taskDate)}
										onChange={(newValue: any) => handleCreateNewTaskInputs("taskDate", newValue)}
									/>
								</DemoContainer>
							</LocalizationProvider>
						</Form.Group>
						<Form.Group>
							<Form.Label>
								Task description <span>(optional)</span>
							</Form.Label>
							<Form.Control
								value={taskData.taskDescription.charAt(0).toUpperCase() + taskData.taskDescription.slice(1)}
								onChange={(e: any) => handleCreateNewTaskInputs("taskDescription", e.target.value)}
								as='textarea'
								rows={3}
								style={{ resize: "none" }}
							/>
						</Form.Group>
						<Button className='tasks-creator__create-task-btn custom-btn' onClick={handleCreateNewTask}>
							Create new task
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}
