import {
	IAppointment,
	ActiveAppointment,
	IUser,
} from "../shared/interfaces/appointment.interfaces";
import { json } from "stream/consumers";
import { useHttp } from "../hooks/http.hook";
import hasRequiredFields from "../utils/hasRequiredFields";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const requiredFields = ["id", "date", "name", "service", "phone", "canceled"];

const useAppointmentService = () => {
	const { loadingStatus, request } = useHttp();

	const _apiBase = "http://localhost:3001/appointments";

	const getAllAppointments = async (): Promise<IAppointment[]> => {
		const res = await request({ url: _apiBase });
		if (
			res.every((item: IAppointment) => hasRequiredFields(item, requiredFields))
		) {
			return res;
		} else {
			throw new Error("Data doesnt have all the fields");
		}
	};

	const getAllActiveAppointments = async () => {
		const base = await getAllAppointments();
		const transformed: ActiveAppointment[] = base
			.filter((item) => {
				return !item.canceled && dayjs(item.date).diff(undefined, "minute") > 0;
			})
			.map((item) => {
				return {
					id: item.id,
					date: item.date,
					name: item.name,
					service: item.service,
					phone: item.phone,
				};
			});
		return transformed;
	};

	const cancelOneAppointment = async (id: number): Promise<any> => {
		return await request({
			url: `${_apiBase}/${id}`,
			method: "PATCH",
			body: JSON.stringify({ canceled: true }),
		});
	};

	const createNewAppointment = async (body: IAppointment) => {
		const id = new Date().getTime();
		body["id"] = id;
		body["date"] = dayjs(body.date, "DD/MM/YYYY HH:mm").format(
			"YYYY-MM-DDTHH:mm"
		);

		return await request({
			url: _apiBase,
			method: "POST",
			body: JSON.stringify(body),
		});
	};

	const getLoginedUsers = async (): Promise<IUser[]> => {
		const res = await request({ url: "http://localhost:3001/login" });

		return res;
	};

	return {
		loadingStatus,
		getAllAppointments,
		getAllActiveAppointments,
		cancelOneAppointment,
		createNewAppointment,
		getLoginedUsers,
	};
};

export default useAppointmentService;
