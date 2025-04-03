import { useDispatch, useSelector } from "react-redux";
import Navigation from "../navigation-components/Navigation";
import { AppDispatch, RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { FormControl, Form, FormGroup, Button } from "react-bootstrap";
import { GetUserData } from "../../../store/userSlice";

interface ChangeInputs {
	firstNameInput: string;
	lastNameInput: string;
	emailInput: string;
}

export default function Settings() {
	const dispatch = useDispatch<AppDispatch>();
	const firstName = useSelector((state: RootState) => state.user.user.map(user => user.firstName));

	const [userNames, setUserNames] = useState<ChangeInputs>({
		firstNameInput: firstName,
		lastNameInput: firstName,
		emailInput: firstName,
	});

	const handleInputUserData = (key: string, value: string) => {
		setUserNames(prevState => ({ ...prevState, [key]: value }));
	};

	const handleSaveUserData = () => {
		console.log(firstName);
	};

	useEffect(() => {
		dispatch(GetUserData());
	}, [dispatch]);

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
									value={userNames.firstNameInput}
									onChange={(e: any) => handleInputUserData("firstNameInput", e.target.value)}
								/>
							</FormGroup>
							<FormGroup className='mb-1 d-sm-flex justify-content-between align-items-center'>
								<FormGroup className='settings__setting-name'>Last name:</FormGroup>
								<FormControl
									className='settings__setting-name-data d-flex justify-content-end'
									value={userNames.lastNameInput}
									onChange={(e: any) => handleInputUserData("lastNameInput", e.target.value)}
								/>
							</FormGroup>
							<FormGroup className='mb-1 d-flex justify-content-between align-items-center'>
								<FormGroup className='settings__setting-name'>Email:</FormGroup>
								<div className='settings__setting-name-data d-flex justify-content-end'>{userNames.emailInput}</div>
							</FormGroup>
							<FormGroup className='mb-1 d-flex justify-content-between align-items-center'>
								<FormGroup className='settings__setting-name'>Profile photo:</FormGroup>
								<FormControl
									className='settings__setting-name-data d-flex justify-content-end'
									type='file'
									accept='image'
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
