import { useDispatch, useSelector } from "react-redux";
import Navigation from "../navigation-components/Navigation";
import { AppDispatch, RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { FormControl, Form, FormGroup, Button } from "react-bootstrap";
import { EditUserData, GetUserData } from "../../../store/userDataSlice";

interface ChangeInputs {
	firstName: string;
	lastName: string;
	userImage: File | string;
	email: string;
}

export default function Settings() {
	const dispatch = useDispatch<AppDispatch>();
	const userData = useSelector((state: RootState) => state.userData.userData);

	const [userNames, setUserNames] = useState<ChangeInputs>({
		firstName: "",
		lastName: "",
		userImage: "",
		email: "",
	});

	const handleInputUserData = (key: string, value: string | File) => {
		setUserNames(prevState => ({ ...prevState, [key]: value }));
	};

	const handleSaveUserData = () => {
		dispatch(EditUserData(userNames));
		console.log(userNames);
	};

	useEffect(() => {
		dispatch(GetUserData());
	}, [dispatch]);

	useEffect(() => {
		if (userData && userData.length > 0) {
			setUserNames({
				firstName: userData[0].firstName || "",
				lastName: userData[0].lastName || "",
				email: userData[0].email || "",
				userImage: userData[0].userImage || "",
			});
		}
	}, [userData]);

	return (
		<>
			<Navigation />
			<div className='settings m-2'>
				<div className='settings__big-main-container'>
					<div className='settings__main-container big-separate-container p-2 mb-2 d-flex justify-content-between align-items-center'>
						<div>Settings</div>
					</div>
					<div className='settings__main-container big-separate-container settings-container p-2 mb-2 d-flex flex-column justify-content-between'>
						<Form className='settings__settings-items-big-container'>
							<FormGroup className='mb-1 d-sm-flex justify-content-between align-items-center'>
								<FormGroup className='settings__setting-name'>First name:</FormGroup>
								<Form.Control
									className='settings__setting-name-data d-flex justify-content-end'
									value={userNames.firstName}
									onChange={(e: any) => handleInputUserData("firstName", e.target.value)}
								/>
							</FormGroup>
							<FormGroup className='mb-1 d-sm-flex justify-content-between align-items-center'>
								<FormGroup className='settings__setting-name'>Last name:</FormGroup>
								<FormControl
									className='settings__setting-name-data d-flex justify-content-end'
									value={userNames.lastName}
									onChange={(e: any) => handleInputUserData("lastName", e.target.value)}
								/>
							</FormGroup>
							<FormGroup className='mb-1 d-flex justify-content-between align-items-center'>
								<FormGroup className='settings__setting-name'>Email:</FormGroup>
								<div className='settings__setting-name-data d-flex justify-content-end'>{userNames.email}</div>
							</FormGroup>
							<FormGroup className='mb-1 d-flex justify-content-between align-items-center'>
								<FormGroup className='settings__setting-name'>Profile photo:</FormGroup>
								<FormControl
									className='settings__setting-name-data d-flex justify-content-end'
									type='file'
									accept='image/*'
									onChange={(e: any) => handleInputUserData("userImage", e.target.files[0].name)}
								/>
							</FormGroup>
						</Form>
						<Button className='mt-3 custom-btn' onClick={handleSaveUserData}>
							Save
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
