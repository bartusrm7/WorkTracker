import { Button } from "react-bootstrap";
import Navigation from "../navigation-components/Navigation";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

export default function Notifications() {
	const [isMarkedNotifications, setIsMarkedNotifications] = useState<boolean>(false);
	const [notificationsData, setNotificationsData] = useState([]);

	return (
		<>
			<Navigation />
			<div className='notifications m-2'>
				<div className='notifications__big-main-container'>
					<div className='notifications__main-container big-separate-container p-2 mb-2 d-flex justify-content-between align-items-center'>
						<div>Notifications</div>
					</div>
					<div className='notifications__main-container big-separate-container p-2 mb-2 d-flex justify-content-between align-items-center'>
						<div className='notifications__notifications-items-big-container'>
							<div className='notifications__notification-item d-flex justify-content-between align-items-center'>
								<div className='mb-2'>
									<div className='notifications__notification-name'>Email notification</div>
									<div className='notifications__notification-description'>
										Receive nofitications on your adress email
									</div>
								</div>
								<div className='notifications__notification-action-status'>
									<Button
										className={`notifications__switch-btn ${isMarkedNotifications ? "marked" : "not-marked"}`}
										onClick={() => setIsMarkedNotifications(!isMarkedNotifications)}>
										<div className='thumb'></div>
									</Button>
								</div>
							</div>

							<div className='notifications__notification-item d-flex justify-content-between align-items-center'>
								<div className='mb-2'>
									<div className='notifications__notification-name'>Notification hours</div>
									<div className='notifications__notification-description'>Set reminder hours for notification</div>
								</div>
								<div className='notifications__notification-action-status'>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={["TimePicker"]}>
											<TimePicker defaultValue={dayjs("2022-04-17T06:30")} ampm={false} />
										</DemoContainer>
									</LocalizationProvider>
								</div>
							</div>
						</div>
					</div>
					<div className='notifications__main-container big-separate-container last-notifications p-2 mb-2'>
						<div className='notifications__notification-name'>Last nofitications</div>
						{notificationsData.length === 0 && <div>Notifications are not founded.</div>}
					</div>
				</div>
			</div>
		</>
	);
}
