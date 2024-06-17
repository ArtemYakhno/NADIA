import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../../store/CardContext.jsx";
import { helpRequest } from "../../../datas/helpRequest.js";
import styles from './PendingRequestsHelp.module.css';

const ITEMS_PER_PAGE = 10;

export default function PendingRequestsHelp({ onUpdate }) {
    const { activeUser } = useContext(CardContext);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [violationInfo, setViolationInfo] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangeRequest = (request) => {
        navigate(`/my-request-help/${request.helpRequestID}`, { state: { request } });
    };

    const handleBlockRequest = (requestID) => {
        const index = helpRequest.findIndex(request => request.helpRequestID === requestID);
        if (index !== -1) {
            helpRequest[index].confirmationInfo.status = 'blocked';
            helpRequest[index].confirmationInfo.moderatorName = `${activeUser.userName} ${activeUser.userLastName}`;
            helpRequest[index].confirmationInfo.solution = violationInfo[requestID] || 'Причина не вказана';
            onUpdate([...helpRequest]);
        }
    };

    const handleAcceptRequest = (requestID) => {
        const index = helpRequest.findIndex(request => request.helpRequestID === requestID);
        if (index !== -1) {
            helpRequest[index].confirmationInfo.status = 'accept';
            helpRequest[index].confirmationInfo.moderatorName = `${activeUser.userName} ${activeUser.userLastName}`;
            helpRequest[index].confirmationInfo.solution = null;
            onUpdate([...helpRequest]);
        }
    };

    const handleViolationInfoChange = (event, requestID) => {
        setViolationInfo({
            ...violationInfo,
            [requestID]: event.target.value
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const pendingRequests = helpRequest.filter(request =>
        request.confirmationInfo.status === 'waiting accept' &&
        request.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(pendingRequests.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedRequests = pendingRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles.container}>
            <h2>Активні запити на перевірку</h2>
            <input
                type="text"
                placeholder="Пошук за темою"
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            {selectedRequests.length === 0 ? (
                <p>Наразі це все. Ще не зробили жодного запиту на допомогу який потребує перевірки</p>
            ) : (
                <div>
                    {selectedRequests.map(request => (
                        <div key={request.helpRequestID} className={styles.requestItem}>
                            <div className={styles.infoContainer}>
                                <p>{request.topic}</p>
                                <p>{request.confirmationInfo.status === 'waiting accept' ? 'Очікує прийняття рішення' : null}</p>
                                <p>Верифікація реєстру: <span className={request.verification.verificationRegistry ? styles.success : styles.failure}>{request.verification.verificationRegistry ? 'Успішно' : 'Невдало'}</span></p>
                                <p>Верифікація контенту: <span className={request.verification.verificationContent ? styles.success : styles.failure}>{request.verification.verificationContent ? 'Успішно' : 'Невдало'}</span></p>
                            </div>
                            <div className={styles.buttonGroup}>
                                <button className={styles.viewButton} onClick={() => handleChangeRequest(request)}>Переглянути дані</button>
                                <textarea
                                    placeholder="Введіть інформацію про порушення"
                                    value={violationInfo[request.helpRequestID] || ''}
                                    onChange={(event) => handleViolationInfoChange(event, request.helpRequestID)}
                                    className={styles.textarea}
                                />
                                <button className={styles.blockButton} onClick={() => handleBlockRequest(request.helpRequestID)}>Заблокувати</button>
                                <button className={styles.acceptButton} onClick={() => handleAcceptRequest(request.helpRequestID)}>Схвалити</button>
                            </div>
                        </div>
                    ))}
                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={currentPage === index + 1 ? styles.activePage : styles.pageLink}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
