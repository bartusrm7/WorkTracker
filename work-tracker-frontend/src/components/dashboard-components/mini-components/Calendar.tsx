import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";

interface ChooseDateProps {
	chooseDate: (newDate: Dayjs) => void;
	selectedDate: Dayjs;
}

export default function Calendar({ chooseDate, selectedDate }: ChooseDateProps) {
	return (
		<div className='calendar'>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateCalendar value={selectedDate} onChange={newDate => chooseDate(newDate || dayjs)} />
			</LocalizationProvider>
		</div>
	);
}
