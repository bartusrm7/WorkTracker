import { useDispatch, useSelector } from "react-redux";
import Navigation from "../navigation-components/Navigation";
import { AppDispatch, RootState } from "../../../store/store";
import { useEffect } from "react";
import { GetMotivationQuotes } from "../../../store/motivationSlice";

export default function Motivations() {
	const dispatch = useDispatch<AppDispatch>();
	const motivationQuotes = useSelector((state: RootState) => state.motivation.motivationQuote);
	useEffect(() => {
		dispatch(GetMotivationQuotes());
		console.log(motivationQuotes);
	});

	return (
		<>
			<Navigation />
			<div className='motivations'>{motivationQuotes}</div>
		</>
	);
}
