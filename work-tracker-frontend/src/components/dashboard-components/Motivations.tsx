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
	}, [dispatch]);

	return (
		<>
			<Navigation />
			<div className='motivations'>
				<div className='motivations__motivation-quote'>{motivationQuotes}</div>
			</div>
		</>
	);
}
