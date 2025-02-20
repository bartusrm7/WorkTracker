import { Button } from "react-bootstrap";
import DoneIcon from "@mui/icons-material/Done";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { RemoveTaskAction } from "../../../../store/tasksActionsSlice";

export default function TasksActions() {
	const dispatch = useDispatch<AppDispatch>();
	const [isTasksOpened, setIsTasksOpened] = useState<boolean>(false);

	const handleRemoveTask = () => {
		dispatch(RemoveTaskAction());
	};

	return (
		<div className='tasks-actions'>
			<div className='tasks-actions__main-container d-flex'>
				{isTasksOpened && (
					<div className='d-flex'>
						<Button className='tasks-actions__action-btn custom-btn'>
							<DoneIcon />
						</Button>
						<Button className='tasks-actions__action-btn custom-btn'>
							<ModeEditIcon />
						</Button>
						<Button className='tasks-actions__action-btn custom-btn' onClick={() => handleRemoveTask()}>
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
