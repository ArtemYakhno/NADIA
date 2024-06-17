import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardContext } from "../store/CardContext.jsx";
import { helpFeedback } from "../../datas/helpFeedback.js";
import Modal from "../modal/Modal.jsx";
import ConfirmAuthorization from "../protection/ConfirmAuthorization.jsx";
import styles from './CaseHelp.module.css';

const CaseHelp = () => {
    const { activeUser, isTokenValid } = useContext(CardContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { help } = location.state;
    const [hasResponded, setHasResponded] = useState(false);
    const [responseInfo, setResponseInfo] = useState(null);
    const [dataUpdated, setDataUpdated] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        if (activeUser) {
            const response = helpFeedback.find(entry => entry.userID === activeUser.userID && entry.helpRequestID === help.helpRequestID);
            if (response) {
                setHasResponded(true);
                setResponseInfo(response);
            }
        }
    }, [activeUser, help.helpRequestID, dataUpdated]);

    const handleRespond = () => {
        if (isTokenValid) {
            const formatDate = (date) => {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            };

            let feedbackInfo = {
                helpFeedback: helpFeedback.length + 1,
                helpRequestID: help.helpRequestID,
                dateOfSubmitting: formatDate(new Date()),
                userID: activeUser.userID
            };
            helpFeedback.push(feedbackInfo);
            setDataUpdated(prev => !prev);
        } else {
            setModalIsOpen(true);
        }
    };

    const handleDonate = () => {
        navigate(`/transaction/${help.helpRequestID}`, {
            state: {
                price: null,
                from: '/case-help',
                paymentPurpose: `Внесок для допомоги: ${help.topic}`,
                helpRequestID: help.helpRequestID,
                description: help.description
            }
        });
    };

    return (
        <div className={styles.container}>
            <img src={help.photo} alt={help.topic || 'Інформація відсутня'} className={styles.photo} />
            <h1 className={styles.topic}>{help.topic || 'Інформація відсутня'}</h1>
            <div className={styles.details}>
                <p>{`Тип допомоги: ${help.type || 'Інформація відсутня'}`}</p>
                <p>{`Опис: ${help.description || 'Інформація відсутня'}`}</p>
                <p>{`Телефон: ${help.user.phoneNumber || 'Інформація відсутня'}`}</p>
                <p>{`Email: ${help.user.email || 'Інформація відсутня'}`}</p>
            </div>
            {activeUser ? (
                help.type === 'Матеріальна' ? (
                    !hasResponded ? (
                        <button onClick={handleDonate} className={styles.actionButton}>Зробити внесок</button>
                    ) : (
                        <div className={styles.responseInfo}>
                            <p>{`Ви відгукнулись на цей запит: ${responseInfo.dateOfSubmitting}`}</p>
                            <button onClick={handleDonate} className={styles.actionButton}>Зробити внесок знову</button>
                        </div>
                    )
                ) : (
                    !hasResponded ? (
                        <button onClick={handleRespond} className={styles.actionButton}>Відгукнутися</button>
                    ) : (
                        <div className={styles.responseInfo}>
                            <p>{`Ви відгукнулись на цей запит: ${responseInfo.dateOfSubmitting}`}</p>
                            <div>
                                <p>Дані для комунікації:</p>
                                <p>{help.user?.phoneNumber || 'Інформація відсутня'}</p>
                                <p>{help.user?.email || 'Інформація відсутня'}</p>
                            </div>
                            <p>Був доданим користувачем: {activeUser.userName} {activeUser.userLastName}</p>
                        </div>
                    )
                )
            ) : (
                <button onClick={() => setModalIsOpen(true)} className={styles.actionButton}>Відгукнутися</button>
            )}
            {modalIsOpen && (
                <Modal open={modalIsOpen} closeESC={true}>
                    <ConfirmAuthorization onCancel={handleCloseModal} />
                </Modal>
            )}
        </div>
    );
};

export default CaseHelp;
