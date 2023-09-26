import {
	IAppointment,
	ActiveAppointment,
} from "../../shared/interfaces/appointment.interfaces";

export enum ActionsTypes {
	SET_ACTIVE_APPOINTMENTS = "SET_ACTIVE_APPOINTMENTS",
	SET_ALL_APPOINTMENTS = "SET_ALL_APPOINTMENTS",
}

export type IAppointmentAction =
	| {
			type: ActionsTypes.SET_ACTIVE_APPOINTMENTS;
			payload: ActiveAppointment[];
	  }
	| {
			type: ActionsTypes.SET_ALL_APPOINTMENTS;
			payload: IAppointment[];
	  };
