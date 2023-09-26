import React, { createContext } from "react";
import { IInitialState } from "./reduser";

const initialState: IInitialState = {
	allAppoinments: [],
	activeAppointment: []
}
// const appointmentContext = createContext();

interface ProviderProps {
    children: React.ReactNode
}

const AppointmentContextProvider = ({children} : ProviderProps) => {
    
}

export default AppointmentContextProvider;