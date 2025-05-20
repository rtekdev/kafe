import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export type ModalTypes = {
	children: React.ReactNode;
	open: boolean;
	onClose: () => void;
	className: string;
};

const Modal: React.FC<ModalTypes> = ({
	children,
	open,
	onClose,
	className = '',
}) => {
	const dialog = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		const modal = dialog.current;

		if (!modal) return;

		console.log(open);
		if (open) {
			if (!modal.open) {
				console.log('działa');
				modal.show();
			}
		} else {
			if (modal.open) {
				modal.close();
			}
		}
	}, [open]);

	const modalContainer = document.getElementById('modal');
	if (!modalContainer) return null;

	return createPortal(
		<dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
			{children}
		</dialog>,
		modalContainer
	);
};

export default Modal;
