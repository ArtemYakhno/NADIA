import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { helpRequest } from "../../../datas/helpRequest.js";
import styles from './ReviewedRequestsHelp.module.css';

const ITEMS_PER_PAGE = 10;

export default function ReviewedRequestsHelp() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const reviewedRequests = helpRequest.filter(request =>
        (request.confirmationInfo.status === 'blocked' || request.confirmationInfo.status === 'accept') &&
        request.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(reviewedRequests.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedRequests = reviewedRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleChangeRequest = (request) => {
        navigate(`/my-request-help/${request.helpRequestID}`, { state: { request } });
    };

    return (
        <div className={styles.container}>
            <h2>Перевірені запити</h2>
            <input
                type="text"
                placeholder="Пошук за темою"
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            {selectedRequests.length === 0 ? (
                <p>Немає перевірених запитів</p>
            ) : (
                <div>
                    {selectedRequests.map(request => (
                        <div key={request.helpRequestID} className={styles.requestItem}>
                            <div className={styles.infoContainer}>
                                <p>{request.topic}</p>
                                <p>{request.confirmationInfo.status === 'blocked' ? `Запит був заблокований модератором: ${request.confirmationInfo.moderatorName}. Причина: ${request.confirmationInfo.solution}` :
                                    request.confirmationInfo.status === 'accept' ? `Запит був прийнятий модератором: ${request.confirmationInfo.moderatorName}` : null}</p>
                                <p>Верифікація реєстру: <span className={request.verification.verificationRegistry ? styles.success : styles.failure}>{request.verification.verificationRegistry ? 'Успішно' : 'Невдало'}</span></p>
                                <p>Верифікація контенту: <span className={request.verification.verificationContent ? styles.success : styles.failure}>{request.verification.verificationContent ? 'Успішно' : 'Невдало'}</span></p>
                            </div>
                            <button className={styles.viewButton} onClick={() => handleChangeRequest(request)}>Переглянути дані</button>
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
