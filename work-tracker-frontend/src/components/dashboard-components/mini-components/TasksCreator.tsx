import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface toggleContainerProps {
	toggleContainer: () => void;
}

export default function TasksCreator({ toggleContainer }: toggleContainerProps) {
	const date = new Date().toLocaleDateString();

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
							<Form.Control />
						</Form.Group>
						<Form.Group>
							<Form.Label>Task date</Form.Label>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={["DatePicker"]}>
									<DatePicker label={date} />
								</DemoContainer>
							</LocalizationProvider>
						</Form.Group>
						<Form.Group>
							<Form.Label>
								Task description <span>(optional)</span>
							</Form.Label>
							<Form.Control as='textarea' rows={3} style={{ resize: "none" }} />
						</Form.Group>
						<Button className='tasks-creator__create-task-btn custom-btn'>Create new task</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}
