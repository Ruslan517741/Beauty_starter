import useAppointmentService from "../../services/AppointmentService";
import { FormEvent, ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./loginPage.scss";

function LoginPage() {
	const { getLoginedUsers } = useAppointmentService();

	const [userName, setUserName] = useState<string>("");
	const [userPassword, setUserPassword] = useState<string>("");
	const [userIsExiting, setUserIsExiting] = useState<boolean | null>(null);
	const [checkingStatus, setCheckingStatus] = useState<boolean>(false);

	const navigate = useNavigate();
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCheckingStatus(true);
		const loginedUsers = await getLoginedUsers();
		await loginedUsers.forEach((item) => {
			if (item.name === userName && item.password === userPassword) {
				setUserIsExiting(true);
				navigate("/schedule");
			} else {
				setUserIsExiting(false);
			}
		});
		setCheckingStatus(false);
	};

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserName(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserPassword(e.target.value);
	};

	return (
		<section className="login">
			<form className="login__form" onSubmit={(e) => handleSubmit(e)}>
				<div className="login__form-title">Manager sign in</div>
				<div className="login__status">
					{userIsExiting === null
						? " "
						: userIsExiting
						? "Success"
						: "Wrong name or password, pleace try again"}
				</div>
				<label htmlFor="name">
					Name<span>*</span>
				</label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Manager name"
					required
					value={userName}
					onChange={(e) => handleNameChange(e)}
				/>
				<label htmlFor="password">
					Password<span>*</span>
				</label>
				<input
					type="text"
					name="password"
					id="password"
					placeholder="Password"
					required
					value={userPassword}
					onChange={(e) => handlePasswordChange(e)}
				/>
				{}
				<button disabled={checkingStatus}>Sign in</button>
			</form>
		</section>
	);
}

export default LoginPage;
