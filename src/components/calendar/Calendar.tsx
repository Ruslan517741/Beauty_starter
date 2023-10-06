import { Calendar as LibCalendar } from "react-calendar";
import { useContext } from "react";

import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

import "react-calendar/dist/Calendar.css";
import "./calendar.scss";

function Calendar() {
	const { calendarDate, setDateAndFilter } = useContext(AppointmentContext);

	const clearFilter = () => {
		setDateAndFilter([null, null]);
	};

	return (
		<div className="calendar">
			<LibCalendar
				value={calendarDate}
				onChange={(value) => {
					setDateAndFilter(value);
				}}
				selectRange
			/>
			<button className="calendar__clear" onClick={clearFilter}>
				Clear filter
			</button>
		</div>
	);
}

export default Calendar;
