import { IAppointmentAction, ActionsTypes } from "./actions";
import {
	IAppointment,
	ActiveAppointment,
} from "../../shared/interfaces/appointment.interfaces";

export interface IInitialState {
	allAppoinments: IAppointment | [];
	activeAppointment: ActiveAppointment | [];
}

export default function reduser(
	state: IInitialState,
	action: IAppointmentAction
) {
	switch (action.type) {
		case ActionsTypes.SET_ALL_APPOINTMENTS:
			return { ...state, allAppoinments: action.payload };
		case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
			return { ...state, activeAppointment: action.payload };
		default:
			return state;
	}
}
