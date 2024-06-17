import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../../../datas/users.js';
import { supportRequests } from '../../../datas/supportRequests.js';
import styles from './ModeratorTechnicalSupport.module.css';

const ITEMS_PER_PAGE = 8;

const ModeratorTechnicalSupport = () => {
    const navigate = useNavigate();
    const [currentActivePage, setCurrentActivePage] = useState(1);
    const [currentResolvedPage, setCurrentResolvedPage] = useState(1);

    const activeRequests = supportRequests.filter(request => request.status === 'active')
        .sort((a, b) => {
            const userA = users.find(user => user.userID === a.userID);
            const userB = users.find(user => user.userID === b.userID);
            return userB.isPremium - userA.isPremium;
        });

    const resolvedRequests = supportRequests.filter(request => request.status === 'resolved');

    const totalActivePages = Math.ceil(activeRequests.length / ITEMS_PER_PAGE);
    const totalResolvedPages = Math.ceil(resolvedRequests.length / ITEMS_PER_PAGE);

    const displayedActiveRequests = activeRequests.slice((currentActivePage - 1) * ITEMS_PER_PAGE, currentActivePage * ITEMS_PER_PAGE);
    const displayedResolvedRequests = resolvedRequests.slice((currentResolvedPage - 1) * ITEMS_PER_PAGE, currentResolvedPage * ITEMS_PER_PAGE);

    return (
        <div className={styles.supportContainer}>
            <div className={styles.requestSection}>
                <h3 className={styles.centeredHeader}>Активні заявки</h3>
                {activeRequests.length > 0 ? (
                    <div>
                        {displayedActiveRequests.map(request => {
                            const user = users.find(user => user.userID === request.userID);
                            return (
                                <div key={request.supportRequestID} className={styles.requestItem}>
                                    <div className={styles.textContainer}>
                                        <strong>{request.topic}</strong>
                                        <p>Користувач: {user.userName} {user.userLastName} ({user.isPremium ? 'Преміум' : 'Звичайний'})</p>
                                    </div>
                                    <button className={styles.button} onClick={() => navigate(`/moderator-request/${request.supportRequestID}`)}>Переглянути</button>
                                </div>
                            );
                        })}
                        {totalActivePages > 1 && (
                            <div className={styles.pagination}>
                                {Array.from({ length: totalActivePages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        className={styles.pageLink}
                                        onClick={() => setCurrentActivePage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className={styles.centeredHeader}>Наразі це все! Поки активних заявок на підтримку немає</p>
                )}
            </div>

            <div className={styles.requestSection}>
                <h3 className={styles.centeredHeader}>Вирішені заявки</h3>
                {resolvedRequests.length > 0 ? (
                    <div>
                        {displayedResolvedRequests.map(request => {
                            const moderator = users.find(user => user.userID === request.moderatorID);
                            return (
                                <div key={request.supportRequestID} className={styles.requestItem}>
                                    <div className={styles.textContainer}>
                                        <strong>{request.topic}</strong>
                                        <p>Модератор: {moderator.userName} {moderator.userLastName}</p>
                                    </div>
                                    <button className={styles.button} onClick={() => navigate(`/moderator-request/${request.supportRequestID}`)}>Переглянути</button>
                                </div>
                            );
                        })}
                        {totalResolvedPages > 1 && (
                            <div className={styles.pagination}>
                                {Array.from({ length: totalResolvedPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        className={styles.pageLink}
                                        onClick={() => setCurrentResolvedPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className={styles.centeredHeader}>Жодної заявки ще не було розглянуто</p>
                )}
            </div>
        </div>
    );
};

export default ModeratorTechnicalSupport;
