import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { missingPeople } from "../../../datas/missingPeople.js";
import styles from './ReviewedRequestsSearch.module.css';

const ITEMS_PER_PAGE = 10;

export default function ReviewedRequestsSearch() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const reviewedRequests = missingPeople.filter(person =>
        (person.confirmationInfo.status === 'blocked' || person.confirmationInfo.status === 'accept') &&
        person.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(reviewedRequests.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedPeople = reviewedRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleChangePerson = (person) => {
        navigate(`/my-search-requests/${person.ID}`, { state: { person } });
    };

    return (
        <div className={styles.container}>
            <h2>Перевірені запити</h2>
            <input
                type="text"
                placeholder="Пошук за ПІБ"
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            {selectedPeople.length === 0 ? (
                <p>Немає перевірених запитів</p>
            ) : (
                <div>
                    {selectedPeople.map(person => (
                        <div key={person.ID} className={styles.requestItem}>
                            <div className={styles.infoContainer}>
                                <p style={{ fontWeight: 'bold' }}>{person.fullName}</p>
                                <p>{person.confirmationInfo.status === 'blocked' ? `Користувач був заблокований модератором: ${person.confirmationInfo.moderatorName}. Причина: ${person.confirmationInfo.solution}` :
                                    person.confirmationInfo.status === 'accept' ? `Користувач був прийнятий модератором: ${person.confirmationInfo.moderatorName}` : null}</p>
                                <p>Верифікація реєстру МВС: <span className={person.verification.verificationMIA ? styles.success : styles.failure}>{person.verification.verificationMIA ? 'Успішно' : 'Невдало'}</span></p>
                                <p>Верифікація інших реєстрів: <span className={person.verification.verificationOtherRegistry ? styles.success : styles.failure}>{person.verification.verificationOtherRegistry ? 'Успішно' : 'Невдало'}</span></p>
                                <p>Верифікація контенту: <span className={person.verification.verificationContent ? styles.success : styles.failure}>{person.verification.verificationContent ? 'Успішно' : 'Невдало'}</span></p>
                                <p>Особа військова: <span className={person.isMilitary ? styles.failure : styles.success}>{person.isMilitary ? 'Так' : 'Ні'}</span></p>
                            </div>
                            <button className={styles.viewButton} onClick={() => handleChangePerson(person)}>Переглянути дані</button>
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
