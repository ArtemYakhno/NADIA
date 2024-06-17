import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { users } from "../../../datas/users.js";
import { supportRequests } from "../../../datas/supportRequests.js";
import Modal from "../../modal/Modal.jsx";
import { CardContext } from "../../store/CardContext.jsx";
import styles from './SupportRequestDetail.module.css';

const SupportRequestDetail = () => {
    const { id } = useParams();
    const { activeUser } = useContext(CardContext);
    const navigate = useNavigate();
    const request = supportRequests.find(req => req.supportRequestID === Number(id));
    const user = users.find(user => user.userID === request.userID);

    const [response, setResponse] = useState(request.solution || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (response.length < 10) {
            setError('Відповідь повинна містити мінімум 10 слів.');
            return;
        }

        const supportIndex = supportRequests.findIndex(support => support.supportRequestID === request.supportRequestID);

        if (supportIndex > -1) {
            let newSupportReques = {
                ...request,
                status: 'resolved',
                moderatorID: activeUser.userID,
                solution: response
            };
            supportRequests[supportIndex] = newSupportReques;
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false);
            }, 2000); // Модальне вікно зникне через 2 секунди
        }
    };

    if (!request) {
        return <p>Запит не знайдено</p>;
    }

    const moderator = request.moderatorID ? users.find(user => user.userID === request.moderatorID) : null;

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Деталі запиту</h2>
            <div className={styles.section}>
                <p><strong>Тема:</strong> {request.topic}</p>
                <p><strong>Опис:</strong> {request.description}</p>
            </div>
            <div className={styles.section}>
                <h3 className={styles.subheader}>Інформація про користувача</h3>
                <p><strong>Ім'я:</strong> {user.userName}</p>
                <p><strong>Прізвище:</strong> {user.userLastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p className={styles.phone}><strong>Телефон:</strong> {user.phoneNumber}</p>
            </div>
            {moderator && (
                <div className={styles.section}>
                    <h3 className={styles.subheader}>Інформація про модератора</h3>
                    <p><strong>Ім'я:</strong> {moderator.userName}</p>
                    <p><strong>Прізвище:</strong> {moderator.userLastName}</p>
                </div>
            )}
            {request.status === 'resolved' ? (
                <div className={styles.section}>
                    <h3 className={styles.subheader}>Рішення</h3>
                    <p>{request.solution}</p>
                </div>
            ) : (
                <div className={styles.section}>
                    <h3 className={styles.subheader}>Ваша відповідь</h3>
                    {error && <p className={styles.error}>{error}</p>}
                    <textarea
                        className={styles.textarea}
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Напишіть відповідь"
                    />
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={handleSubmit}>Надіслати відповідь</button>
                    </div>
                </div>
            )}
            <Modal open={modalOpen} closeESC={false}>
                <p>Відповідь надіслано!</p>
            </Modal>
        </div>
    );
};

export default SupportRequestDetail;
