import Navigation from "../navigation-components/Navigation";
import { Circle } from "rc-progress";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { GetTask } from "../../../store/tasksSlice";

export default function Statistics() {
	const dispatch = useDispatch<AppDispatch>();
	const tasksData = useSelector((state: RootState) => state.tasks.tasks);
	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs);
	const date = new Date().toLocaleDateString();

	const filteredTasksData = selectedDate
		? tasksData.filter(task => dayjs(task.taskDate).isSame(selectedDate, "day"))
		: tasksData;

	const tasksAmountDone = filteredTasksData.filter(task => task.taskStatus === "done");
	const tasksAmountNotDone = filteredTasksData.filter(task => task.taskStatus !== "done");

	console.log((tasksAmountNotDone.length / filteredTasksData.length) * 100);

	useEffect(() => {
		dispatch(GetTask());
	}, [dispatch]);

	return (
		<>
			<Navigation />
			<div className='statistics m-2'>
				<div className='statistics__big-main-container'>
					<div className='statistics__main-container big-separate-container p-2 mb-2 d-flex justify-content-between align-items-center'>
						Statistics
					</div>

					<div className='statistics__main-container big-separate-container date-container p-2 mb-2 d-flex justify-content-between align-items-center'>
						<div>Choose date</div>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={["DatePicker"]}>
								<DatePicker
									label={date}
									value={selectedDate}
									onChange={newDate => setSelectedDate(newDate || dayjs)}
									format='DD.MM.YYYY'
								/>
							</DemoContainer>
						</LocalizationProvider>
					</div>

					<div className='statistics__main-container big-separate-container statistics-container p-2 mb-2 d-flex flex-wrap justify-content-evenly align-items-center'>
						{/* <div className='statistics__stats-container text-center'>
							<div className='statistics__stats-name mb-2'>Tasks</div>
							<Circle
								className='statistics__circle-stats'
								percent={100}
								trailWidth={10}
								strokeWidth={10}
								strokeColor='#b83adf'
								trailColor='#5c1891'
								gapDegree={20}
							/>
							<div className='statistics__tasks-amount mb-2'>
								{filteredTasksData.length}/{filteredTasksData.length}
							</div>
						</div> */}
						<div className='statistics__stats-container text-center'>
							<div className='statistics__stats-name mb-2'>Done</div>
							<Circle
								className='statistics__circle-stats'
								percent={(tasksAmountDone.length / filteredTasksData.length) * 100}
								trailWidth={10}
								strokeWidth={10}
								strokeColor='#b83adf'
								trailColor='#5c1891'
								gapDegree={20}
							/>
							<div className='statistics__tasks-amount mb-2'>
								{tasksAmountDone.length}/{filteredTasksData.length}
							</div>
						</div>
						<div className='statistics__stats-container text-center'>
							<div className='statistics__stats-name mb-2'>In progress</div>
							<Circle
								className='statistics__circle-stats'
								percent={(tasksAmountNotDone.length / filteredTasksData.length) * 100}
								trailWidth={10}
								strokeWidth={10}
								strokeColor='#b83adf'
								trailColor='#5c1891'
								gapDegree={20}
							/>
							<div className='statistics__tasks-amount mb-2'>
								{tasksAmountNotDone.length}/{filteredTasksData.length}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
