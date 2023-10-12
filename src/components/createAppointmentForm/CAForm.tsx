import dayjs from "dayjs";
import useAppointmentService from "../../services/AppointmentService";
import { FormEvent, ChangeEvent, useState, useContext } from "react";
import { IAppointment } from "../../shared/interfaces/appointment.interfaces";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

import "./caform.scss";

function CAForm() {
	const { createNewAppointment } = useAppointmentService();
	const { getActiveAppointments } = useContext(AppointmentContext);
	const [formData, setFormData] = useState<IAppointment>({
		name: "",
		service: "",
		phone: "",
		date: "",
		canceled: false,
		id: 1,
	});

	const [creationStatus, setCreationStatus] = useState<boolean>(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setCreationStatus(true);
		createNewAppointment(formData)
			.then(() => {
				setCreationStatus(false);
				setFormData({
					name: "",
					service: "",
					phone: "",
					date: "",
					canceled: false,
					id: 1,
				});
			})
			.catch(() => {
				alert("Error while creating new appointment");
			});
		getActiveAppointments();
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		//setFormData({ ...formData, [e.target.name]: e.target.value });
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<form
			className="caform"
			onSubmit={(e) => {
				handleSubmit(e);
			}}
		>
			<div className="caform__title">Create new appointment</div>
			<label htmlFor="name">
				Name<span>*</span>
			</label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="User name"
				required
				value={formData.name}
				onChange={handleChange}
			/>

			<label htmlFor="service">
				Service<span>*</span>
			</label>
			<input
				type="text"
				name="service"
				id="service"
				placeholder="Service name"
				required
				value={formData.service}
				onChange={handleChange}
			/>

			<label htmlFor="phone">
				Phone number<span>*</span>
			</label>
			<input
				type="tel"
				name="phone"
				id="phone"
				placeholder="+1 890 335 372"
				pattern="^\++[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{3}"
				title="Format should be +1 804 944 567"
				required
				value={formData.phone}
				onChange={handleChange}
			/>

			<label htmlFor="date">
				Date<span>*</span>
			</label>
			<input
				type="text"
				name="date"
				id="date"
				placeholder="DD/MM/YYYY HH:mm"
				pattern="^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$"
				title="Format should be DD/MM/YYYY HH:mm"
				required
				value={formData.date}
				onChange={handleChange}
			/>
			<button disabled={creationStatus}>Create</button>
		</form>
	);
}

export default CAForm;
