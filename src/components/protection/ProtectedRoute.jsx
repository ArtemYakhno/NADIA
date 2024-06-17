import { useState, useContext, useEffect } from 'react';
import ConfirmAuthorization from './ConfirmAuthorization.jsx';
import Modal from '../modal/Modal.jsx';
import { CardContext } from '../store/CardContext.jsx';

export default function ProtectedRoute({ isModeratorPage, component: Component, ...rest }) {
    const { isTokenValid, activeUser } = useContext(CardContext);

    // Initial state of modal is open if the token is invalid
    const [modalIsOpen, setModalIsOpen] = useState(!isTokenValid || (isModeratorPage && (!activeUser || activeUser.userRole !== 'moderator')));

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const confirmPage = (
        <Modal open={modalIsOpen} closeESC={true}>
            <ConfirmAuthorization onCancel={handleCloseModal} />
        </Modal>
    );

    // Render the component if the token is valid, otherwise show authorization modal
    return !modalIsOpen ? <Component {...rest} /> : confirmPage;
}
