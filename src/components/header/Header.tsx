import { NavLink, Link } from "react-router-dom";

import iconlogout from "./iconlogout.png";
import "./header.scss";

function Header() {
	const LogOut = () => {
		localStorage.removeItem("token");
	};

	return (
		<header className="header">
			<Link to="/" className="logo">
				Beauty
				<br />
				Admin
			</Link>
			<nav>
				<ul className="header__list">
					<li className="header__link">
						<NavLink
							to="/schedule"
							className={({ isActive }) =>
								isActive ? "header__link_active" : ""
							}
						>
							Schedule
						</NavLink>
					</li>
					<li className="header__link">
						<NavLink
							to="/history"
							className={({ isActive }) =>
								isActive ? "header__link_active" : ""
							}
						>
							History
						</NavLink>
					</li>
				</ul>
			</nav>
			<Link to="/login" onClick={LogOut}>
				<img
					className="iconLogout"
					data-tooltip="LogOut"
					src={iconlogout}
					alt="icon logout"
				/>
			</Link>
		</header>
	);
}

export default Header;
