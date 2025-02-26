import Navigation from "../navigation-components/Navigation";
import { Circle } from "rc-progress";

export default function Statistics() {
	return (
		<>
			<Navigation />
			<div className='statistics m-2'>
				<div className='statistics__big-main-container'>
					<div className='statistics__main-container big-separate-container p-2 mb-2 d-flex justify-content-between align-items-center'>
						Statistics
					</div>

					<div className='statistics__main-container big-separate-container statistics-container p-2 mb-2 d-flex flex-wrap justify-content-evenly align-items-center'>
						<div className='statistics__stats-container text-center'>
							<div className='statistics__stats-name mb-2'>Tasks</div>
							<Circle
								className='statistics__circle-stats'
								percent={10}
								trailWidth={10}
								strokeWidth={10}
								strokeColor='#b83adf'
								trailColor='#5c1891'
								gapDegree={20}
							/>
						</div>
						<div className='statistics__stats-container text-center'>
							<div className='statistics__stats-name mb-2'>Done</div>
							<Circle
								className='statistics__circle-stats'
								percent={10}
								trailWidth={10}
								strokeWidth={10}
								strokeColor='#b83adf'
								trailColor='#5c1891'
								gapDegree={20}
							/>
						</div>
						<div className='statistics__stats-container text-center'>
							<div className='statistics__stats-name mb-2'>In progress</div>
							<Circle
								className='statistics__circle-stats'
								percent={10}
								trailWidth={10}
								strokeWidth={10}
								strokeColor='#b83adf'
								trailColor='#5c1891'
								gapDegree={20}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
