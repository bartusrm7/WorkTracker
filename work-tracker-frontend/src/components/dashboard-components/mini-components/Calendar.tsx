import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function Calendar() {
	return (
		<div className='calendar'>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateCalendar />
			</LocalizationProvider>
		</div>
	);
}
