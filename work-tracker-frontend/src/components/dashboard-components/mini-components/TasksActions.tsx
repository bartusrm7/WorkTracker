import { Button } from "react-bootstrap";
import DoneIcon from "@mui/icons-material/Done";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

interface TasksActionsProps {
	doneTask: (taskId: number) => void;
	removeTask: (taskId: number) => void;
	taskId: number;
}

export default function TasksActions({ doneTask, removeTask, taskId }: TasksActionsProps) {
	const [isTasksOpened, setIsTasksOpened] = useState<boolean>(false);

	return (
		<div className='tasks-actions'>
			<div className='tasks-actions__main-container d-flex'>
				{isTasksOpened && (
					<div className='d-flex'>
						<Button className='tasks-actions__action-btn custom-btn' onClick={() => doneTask(taskId)}>
							<DoneIcon />
						</Button>
						<Button className='tasks-actions__action-btn custom-btn'>
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
			</div>
		</div>
	);
}
