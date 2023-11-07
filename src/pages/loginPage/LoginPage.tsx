import useAppointmentService from "../../services/AppointmentService";
import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./loginPage.scss";

function LoginPage() {
	const { getLoginedUsers } = useAppointmentService();

	const [userName, setUserName] = useState<string>("");
	const [userPassword, setUserPassword] = useState<string>("");
	const [userIsExiting, setUserIsExiting] = useState<boolean | null>(null);
	const [checkingStatus, setCheckingStatus] = useState<boolean>(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			navigate("/schedule");
		}
	}, []);
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCheckingStatus(true);
		const loginedUsers = await getLoginedUsers();
		await loginedUsers.forEach((item) => {
			if (item.name === userName && item.password === userPassword) {
				localStorage.setItem("token", JSON.stringify(item.token));
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

// ///////example

// const [allMaterials, setAllMaterials] = useState<string[]>(["a", "b", "c"]);

// function optionsForForm(prevValue, value) {
// 	let selectedMaterials<string[] | []> = [];

// 	if (prevValue) {
// 		selectedMaterials = selectedMaterials.filter((item) => item ==! prevValue);
// 	}
// 	if (value) {
// 		selectedMaterials = [...selectedMaterials, value]
// 	}

// 	let materialsForSelect = allMaterials.filter((item) => {
// 		return !selectedMaterials.includes(item);
// 	});

// 	let materialsForSelect = allMaterials.reduce((acc, item) => {
// 		if (!selectedMaterials.includes(item)) {
// 			acc.push(item);
// 		}
// 		return acc;
// 	}, []);
// 	// allMaterials.forEach((item) => {
// 	// 	selectedMaterials.forEach((selectedItem) => {
// 	// 		if (item ==! selectedItem) {
// 	// 			materialsForSelect.push()
// 	// 		}
// 	// 	})
// 	// });

// 	return materialsForSelect;
// }

// 	return (
// 		<FormComponent optionsForForm={optionForForm}/>
// 	)
// // компонеонт формы

// function FormComponent({optionsForForm}) {
// 	const (prevValue, setPrevValue) = useState('');
// 	const (value, setValue) = useState('');

// 	useEffect(() => {
// 		setPrevValue(value);
// 	}, value)

// 	function optionsForSelect(e){
// 		setValue(e.target.value);

// 		let options = optionsForForm(prevValue, value);
// 		return [...options, e.target.value]
// 	}

// 	let elements = optionsForSelect.map((item) => {
// 		<option value="item">item</option>
// 	})

// 	return (
// 		<select name="select" onChange={() => optionsForSelect(e)}>
// 			{elements}
// 		</select>
// 	)
// }
