import { Button } from "react-bootstrap";
import DoneIcon from "@mui/icons-material/Done";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { GetTask } from "../../../../store/tasksSlice";

interface TasksActionsProps {
	doneTask: (taskId: number) => void;
	editTask: (taskId: number, taskName: string, taskDescription: string) => void;
	removeTask: (taskId: number) => void;
	taskId: number;
	editTaskName: string;
	editTaskDescription: string;
}

export default function TasksActions({
	doneTask,
	editTask,
	removeTask,
	taskId,
	editTaskName,
	editTaskDescription,
}: TasksActionsProps) {
	const dispatch = useDispatch<AppDispatch>();
	const tasksData = useSelector((state: RootState) => state.tasks.tasks);
	const taskDone = tasksData.find(task => task.ID === taskId);
	const [isEditTaskWindowOpened, setIsEditTaskWindowOpened] = useState<boolean>(false);
	const [isTasksOpened, setIsTasksOpened] = useState<boolean>(false);
	const [isTaskDone, setIsTaskDone] = useState<boolean>(false);
	const [editInputTaskName, setEditInputTaskName] = useState<any>(editTaskName);
	const [editInputTaskDescription, setEditInputTaskDescription] = useState<any>(editTaskDescription);

	const handleIsTaskDone = () => {
		setIsTaskDone(!isTaskDone);
		doneTask(taskId);
		dispatch(GetTask());
	};

	const handleSaveEditedTask = () => {
		editTask(taskId, editInputTaskName, editInputTaskDescription);
		setIsEditTaskWindowOpened(false);
	};

	useEffect(() => {
		setEditInputTaskName(editTaskName);
		setEditInputTaskDescription(editTaskDescription);
		if (taskDone) {
			setIsTaskDone(taskDone.taskStatus === "done");
		}
	}, [dispatch, taskDone, isTaskDone, editTaskName, editTaskDescription]);

	return (
		<div className='tasks-actions'>
			<div className='tasks-actions__main-container d-flex'>
				{isTasksOpened && (
					<div className='d-flex'>
						{isTaskDone ? (
							<Button className='tasks-actions__action-btn custom-btn' onClick={() => handleIsTaskDone()}>
								<CloseIcon />
							</Button>
						) : (
							<Button className='tasks-actions__action-btn custom-btn' onClick={() => handleIsTaskDone()}>
								<DoneIcon />
							</Button>
						)}
						<Button
							className='tasks-actions__action-btn custom-btn'
							onClick={() => setIsEditTaskWindowOpened(!isEditTaskWindowOpened)}>
							<ModeEditIcon />
						</Button>
						<Button className='tasks-actions__action-btn custom-btn' onClick={() => removeTask(taskId)}>
							<DeleteIcon />
						</Button>
					</div>
				)}
				<Button
					className='tasks-actions__replacement-field custom-btn'
					onClick={() => setIsTasksOpened(!isTasksOpened)}>
					...
				</Button>
				{isEditTaskWindowOpened && (
					<div className='tasks-actions__edit-task-big-window d-flex flex-column justify-content-center align-items-center'>
						<Form className='tasks-actions__edit-task-window d-flex flex-column justify-content-evenly'>
							<Button
								className='tasks-actions__close-btn custom-btn'
								onClick={() => setIsEditTaskWindowOpened(!isEditTaskWindowOpened)}>
								<CloseIcon />
							</Button>

							<Form.Group className='tasks-actions__edit-task-input'>
								<Form.Label className='tasks-actions__edit-task-name'>Task name</Form.Label>
								<Form.Control value={editInputTaskName} onChange={e => setEditInputTaskName(e.target.value)} />
							</Form.Group>
							<Form.Group className='tasks-actions__edit-task-input'>
								<Form.Label className='tasks-actions__edit-task-name'>Task description</Form.Label>
								<Form.Control
									value={editInputTaskDescription}
									onChange={e => setEditInputTaskDescription(e.target.value)}
									as='textarea'
									rows={3}
									style={{ resize: "none" }}
								/>
							</Form.Group>

							<Button className='tasks-actions__create-task-btn custom-btn' onClick={handleSaveEditedTask}>
								Save task
							</Button>
						</Form>
					</div>
				)}
			</div>
		</div>
	);
}
