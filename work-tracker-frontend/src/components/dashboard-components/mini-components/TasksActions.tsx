import { Button } from "react-bootstrap";
import DoneIcon from "@mui/icons-material/Done";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function TasksActions() {
	const [isTasksOpened, setIsTasksOpened] = useState<boolean>(true);

	return (
		<div className='tasks-actions'>
			<div className='tasks-actions__main-container'>
				{isTasksOpened ? (
					<Button className='tasks-actions__replacement-field' onClick={() => setIsTasksOpened(!isTasksOpened)}>
						...
					</Button>
				) : (
					<div className='d-flex'>
						<Button>
							<DoneIcon />
						</Button>
						<Button>
							<ModeEditIcon />
						</Button>
						<Button>
							<DeleteIcon />
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
