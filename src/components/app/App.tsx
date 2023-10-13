import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	useLocation,
} from "react-router-dom";
import { useState } from "react";

import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
import LoginPage from "../../pages/loginPage/LoginPage";
import AppointmentContextProvider from "../../context/appointments/AppointmentsContext";
import HistoryPage from "../../pages/history/HistoryPage";
import PageNotFound from "../../pages/404/404";

import "./app.scss";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <PageNotFound />,
		children: [
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/",
				element: <LoginPage />,
			},
			{
				path: "/schedule",
				element: <SchedulePage />,
			},
			{
				path: "/history",
				element: <HistoryPage />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

function checkToken(token: string | null): JSX.Element {
	if (token) {
		return (
			<>
				<AppointmentContextProvider>
					<Outlet />
				</AppointmentContextProvider>
			</>
		);
	} else {
		return <LoginPage />;
	}
}

function Root() {
	let page = useLocation();

	const token = localStorage.getItem("token");

	return (
		<main className="board">
			{page.pathname === "/login" || !token ? null : <Header />}
			{/* <AppointmentContextProvider>
				<Outlet />
			</AppointmentContextProvider> */}
			{checkToken(token)}
		</main>
	);
}

export default App;
