import { Button } from "react-bootstrap";
import Navigation from "../navigation-components/Navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { AccessForGettingNotifications, DisplayNotification } from "../../../store/notificationsSlice";

export default function Notifications() {
	const dispatch = useDispatch<AppDispatch>();
	const notificationsAccess = useSelector((state: RootState) => state.notification.notificationsAccess);
	const allNotificationsName = useSelector((state: RootState) => state.notification.notificationName);

	const handleToggleNotificationsBtn = async () => {
		const newStatus = notificationsAccess === 0 ? 1 : 0;
		await dispatch(AccessForGettingNotifications({ notificationsAccess: newStatus }));
	};

	useEffect(() => {
		dispatch(AccessForGettingNotifications({ notificationsAccess }));
		dispatch(DisplayNotification());
	}, [dispatch]);

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
										Allow for display your last notifications
									</div>
								</div>
								<div className='notifications__notification-action-status'>
									<Button
										className={`notifications__switch-btn ${notificationsAccess === 1 ? "marked" : "not-marked"}`}
										onClick={handleToggleNotificationsBtn}>
										<div className='thumb'></div>
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div className='notifications__main-container big-separate-container last-notifications'>
						<div className='notifications__notification-array-name p-2'>Last nofitications</div>
						{allNotificationsName.length === 0 || notificationsAccess === 0 ? (
							<div className='p-2'>Notifications are not founded.</div>
						) : (
							<div>
								{allNotificationsName.map((notification, index) => (
									<div className='notifications__notification-names-item' key={index}>
										<div>{notification}</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
