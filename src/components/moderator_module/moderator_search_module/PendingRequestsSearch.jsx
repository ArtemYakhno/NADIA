import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../../store/CardContext.jsx";
import { missingPeople } from "../../../datas/missingPeople.js";
import styles from './PendingRequestsSearch.module.css';

const ITEMS_PER_PAGE = 10;

export default function PendingRequestsSearch({ onUpdate }) {
    const { activeUser } = useContext(CardContext);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [violationInfo, setViolationInfo] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangePerson = (person) => {
        navigate(`/my-search-requests/${person.ID}`, { state: { person } });
    };

    const handleBlockRequest = (personID) => {
        const index = missingPeople.findIndex(person => person.ID === personID);
        if (index !== -1) {
            missingPeople[index].confirmationInfo.status = 'blocked';
            missingPeople[index].confirmationInfo.moderatorName = `${activeUser.userName} ${activeUser.userLastName}`;
            missingPeople[index].confirmationInfo.solution = violationInfo[personID] || 'Причина не вказана';
            // Trigger update
            onUpdate([...missingPeople]);
        }
    };

    const handleAcceptRequest = (personID) => {
        const index = missingPeople.findIndex(person => person.ID === personID);
        if (index !== -1) {
            missingPeople[index].confirmationInfo.status = 'accept';
            missingPeople[index].confirmationInfo.moderatorName = `${activeUser.userName} ${activeUser.userLastName}`;
            missingPeople[index].confirmationInfo.solution = null;
            // Trigger update
            onUpdate([...missingPeople]);
        }
    };

    const handleViolationInfoChange = (event, personID) => {
        setViolationInfo({
            ...violationInfo,
            [personID]: event.target.value
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const pendingRequests = missingPeople.filter(person =>
        person.confirmationInfo.status === 'waiting accept' &&
        person.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(pendingRequests.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedPeople = pendingRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles.container}>
            <h2>Активні запити на перевірку</h2>
            <input
                type="text"
                placeholder="Пошук за ПІБ"
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            {selectedPeople.length === 0 ? (
                <p>Наразі це все. Ще не зробили жодного запиту на пошук особи який потребує перевірки</p>
            ) : (
                <div>
                    {selectedPeople.map(person => (
                        <div key={person.ID} className={styles.requestItem}>
                            <div className={styles.infoContainer}>
                                <p style={{ fontWeight: 'bold' }}>{person.fullName}</p>
                                <p>{person.confirmationInfo.status === 'waiting accept' ? 'Очікує прийняття рішення' : null}</p>
                                <p>Верифікація реєстру МВС: <span className={person.verification.verificationMIA ? styles.success : styles.failure}>{person.verification.verificationMIA ? 'Успішно' : 'Невдало'}</span></p>
                                <p>Верифікація інших реєстрів: <span className={person.verification.verificationOtherRegistry ? styles.success : styles.failure}>{person.verification.verificationOtherRegistry ? 'Успішно' : 'Невдало'}</span></p>
                                <p>Верифікація контенту: <span className={person.verification.verificationContent ? styles.success : styles.failure}>{person.verification.verificationContent ? 'Успішно' : 'Невдало'}</span></p>
                                <p>Особа військова: <span className={person.isMilitary ? styles.failure : styles.success}>{person.isMilitary ? 'Так' : 'Ні'}</span></p>
                            </div>
                            <div className={styles.buttonGroup}>
                                <button className={styles.viewButton} onClick={() => handleChangePerson(person)}>Переглянути дані</button>
                                <textarea
                                    placeholder="Введіть інформацію про порушення"
                                    value={violationInfo[person.ID] || ''}
                                    onChange={(event) => handleViolationInfoChange(event, person.ID)}
                                    className={styles.textarea}
                                />
                                <button className={styles.blockButton} onClick={() => handleBlockRequest(person.ID)}>Заблокувати</button>
                                <button className={styles.acceptButton} onClick={() => handleAcceptRequest(person.ID)}>Схвалити</button>
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
