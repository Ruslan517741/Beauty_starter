import Portal from "../portal/portal";
import { useState, useEffect, useRef, useContext } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { CSSTransition } from "react-transition-group";
import useAppointmentService from "../../services/AppointmentService";

import "./modal.scss";

interface IModalProps {
	handleClose: (state: boolean) => void;
	selectedId: number;
	isOpen: boolean;
}

function CancelModal({ handleClose, selectedId, isOpen }: IModalProps) {
	const { cancelOneAppointment } = useAppointmentService();
	const { getActiveAppointments } = useContext(AppointmentContext);

	const nodeRef = useRef<HTMLDivElement>(null);

	const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

	const handleCancelAppointment = (id: number) => {
		setBtnDisabled(true);
		cancelOneAppointment(id)
			.then(() => {
				console.log("done");
				setCancelStatus(true);
			})
			.catch(() => {
				console.log("error");
				setCancelStatus(false);
				setBtnDisabled(false);
			});
	};

	const closeModal = () => {
		handleClose(false);
		if (cancelStatus) {
			getActiveAppointments();
		}
	};

	const closeOnEscapeKey = (e: KeyboardEvent): void => {
		console.log(cancelStatus);
		if (e.key === "Escape") {
			closeModal();
		}
	};

	useEffect(() => {
		document.body.addEventListener("keydown", closeOnEscapeKey);

		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey);
		};
	}, [handleClose, cancelStatus]);

	// const cancelAppointment = (id: number): void => {
	// 	cancelOneAppointment(id).then(() => {
	// 		getActiveAppointments();
	// 	});

	// 	handleClose(false);
	// };

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
								disabled={btnDisabled}
								onClick={() => handleCancelAppointment(selectedId)}
							>
								Ok
							</button>
							<button className="modal__close" onClick={() => closeModal()}>
								Close
							</button>
						</div>
						<div className="modal__status">
							{cancelStatus === null
								? ""
								: cancelStatus
								? "Success"
								: "Error, pleace try again"}
						</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;
