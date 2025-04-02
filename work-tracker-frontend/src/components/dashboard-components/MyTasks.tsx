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
import dayjs, { Dayjs } from "dayjs";
import TasksActions from "./mini-components/TasksActions";
import { DoneTaskAction, EditTaskAction, RemoveTaskAction } from "../../../store/tasksActionsSlice";

export default function MyTasks() {
	const dispatch = useDispatch<AppDispatch>();
	const tasksData = useSelector((state: RootState) => state.tasks.tasks);
	const [toggleCreatorContainer, setToggleCreatorContainer] = useState<boolean>(false);
	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
	const date = new Date().toLocaleDateString();

	const filteredTaskData = selectedDate
		? tasksData.filter(task => dayjs(task.taskDate).isSame(selectedDate, "day"))
		: tasksData;

	const handleDoneTask = async (ID: number, email: string, taskStatus: string) => {
		if (email) {
			await dispatch(DoneTaskAction({ ID, email, taskStatus }));
			await dispatch(GetTask());
		}
	};

	const handleEditTask = async (ID: number, taskName: string, taskDescription: string, email: string) => {
		await dispatch(EditTaskAction({ ID, taskName, taskDescription, email }));
		await dispatch(GetTask());
	};

	const handleRemoveTask = async (ID: number, email: string) => {
		if (email) {
			await dispatch(RemoveTaskAction({ ID, email }));
			await dispatch(GetTask());
		}
	};

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
								<DatePicker
									label={date}
									format='DD.MM.YYYY'
									value={selectedDate}
									onChange={newDate => setSelectedDate(newDate || dayjs())}
								/>
							</DemoContainer>
						</LocalizationProvider>
					</div>

					<div className='my-tasks__main-container big-separate-container tasks-container mb-2'>
						<div className='my-tasks__tasks-items-big-container tasks-grid-sets'>
							<div className='my-tasks__task-category'>Name</div>
							<div className='my-tasks__task-category'>Description</div>
							<div className='my-tasks__task-category'>Action</div>
						</div>

						{filteredTaskData.map((task, index) => (
							<div
								className={`my-tasks__tasks-container tasks-grid-sets ${
									task.taskStatus === "done" ? "task-done" : "task-progress"
								}`}
								key={index}>
								<div className='my-tasks__task-item'>{task.taskName}</div>
								<div className='my-tasks__task-item'>{task.taskDescription}</div>
								<div className='my-tasks__task-item'>
									<TasksActions
										doneTask={() => handleDoneTask(task.ID, task.email, task.taskStatus)}
										editTask={(ID, taskName, taskDescription) =>
											handleEditTask(ID, taskName, taskDescription, task.email)
										}
										removeTask={() => handleRemoveTask(task.ID, task.email)}
										taskId={task.ID}
										editTaskName={task.taskName}
										editTaskDescription={task.taskDescription}
									/>
								</div>
							</div>
						))}

						{filteredTaskData.length === 0 && <div className='p-2'>No tasks found for the selected date.</div>}
					</div>
				</div>
			</div>
		</>
	);
}
