import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	useLocation,
} from "react-router-dom";

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
				element: <SchedulePage />,
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

function Root() {
	let page = useLocation();

	return (
		<main className="board">
			{page.pathname === "/login" ? null : <Header />}
			<AppointmentContextProvider>
				<Outlet />
			</AppointmentContextProvider>
		</main>
	);
}

export default App;
