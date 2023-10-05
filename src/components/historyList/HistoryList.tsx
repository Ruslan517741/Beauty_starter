import { useContext, useEffect } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function HistoryList() {
	const { allAppointments, getAppointments, appointmentLoadingStatus } =
		useContext(AppointmentContext);

	useEffect(() => {
		getAppointments();
	}, []);

	if (appointmentLoadingStatus === "loading") {
		return <Spinner />;
	}
	if (appointmentLoadingStatus === "error") {
		return (
			<>
				<Error />
				<button className="history__reload" onClick={getAppointments}>
					Try to reload
				</button>
			</>
		);
	}

	return (
		<>
			{/* {allAppointments.map((item) => {
				return (
					<AppointmentItem
						{...item}
						key={item.id}
						openModal={() => {}}
						page={"history"}
					/>
				);
			})} */}
			{allAppointments
				.sort(
					(prev, next) =>
						new Date(prev.date).getTime() - new Date(next.date).getTime()
				)
				.map((item) => {
					return <AppointmentItem {...item} key={item.id} />;
				})}
			{/* <div></div> */}
			{/* <AppointmentItem />
			<AppointmentItem />
			<AppointmentItem />
			<AppointmentItem />
			<AppointmentItem />
			<AppointmentItem /> */}
		</>
	);
}

export default HistoryList;
