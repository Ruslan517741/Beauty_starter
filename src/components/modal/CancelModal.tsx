import Portal from "../portal/portal";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { useState, useEffect, useRef, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import useAppointmentService from "../../services/AppointmentService";

import "./modal.scss";

interface IModalProps {
	handleClose: (state: boolean) => void;
	selectedId: number;
	isOpen: boolean;
}

function CancelModal({ handleClose, selectedId, isOpen }: IModalProps) {
	const nodeRef = useRef<HTMLDivElement>(null);
	const { cancelOneAppointment } = useAppointmentService();
	const { getActiveAppointments } = useContext(AppointmentContext);

	const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

	const closeOnEscapwKey = (e: KeyboardEvent): void => {
		if (e.key === "Escape") {
			handleClose(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener("keydown", closeOnEscapwKey);

		return () => {
			document.body.removeEventListener("keydown", closeOnEscapwKey);
		};
	}, [handleClose]);

	const cancelAppointment = (id: number): void => {
		cancelOneAppointment(id).then(() => {
			getActiveAppointments();
		});

		handleClose(false);
	};

	return (
		<Portal>
			<CSSTransition
				in={isOpen}
				timeout={{ enter: 500, exit: 500 }}
				unmountOnExit
				classNames="modal"
				nodeRef={nodeRef}
			>
				<div className="modal" ref={nodeRef}>
					<div className="modal__body">
						<span className="modal__title">
							Are you sure you want to delete the appointment? #{selectedId}
						</span>
						<div className="modal__btns">
							<button
								className="modal__ok"
								onClick={() => cancelAppointment(selectedId)}
							>
								Ok
							</button>
							<button
								className="modal__close"
								onClick={() => handleClose(false)}
							>
								Close
							</button>
						</div>
						<div className="modal__status">Success</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;
