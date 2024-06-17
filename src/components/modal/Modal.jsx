import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, closeESC }) {
    const dialog = useRef();

    useEffect(() => {
        const dialogNode = dialog.current;

        const handleCancel = (event) => {
            if (closeESC) {
                event.preventDefault();
            }
        };

        dialogNode.addEventListener('cancel', handleCancel);

        if (open) {
            dialogNode.showModal();
        } else {
            dialogNode.close();
        }

        return () => {
            dialogNode.removeEventListener('cancel', handleCancel);
        };
    }, [open, closeESC]);

    return createPortal(
        <dialog className="modal" ref={dialog}>
            {open ? children : null}
        </dialog>,
        document.getElementById('modal')
    );
}

export default Modal;
