import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { missingPeople } from '../../datas/missingPeople.js';
import { helpRequest } from '../../datas/helpRequest.js';
import { CardContext } from "../store/CardContext.jsx";
import styles from './MyRequests.module.css';

const ITEMS_PER_PAGE = 10;

export default function MyRequests() {
    const { activeUser } = useContext(CardContext);
    const navigate = useNavigate();
    const [people, setPeople] = useState([]);
    const [helpRequests, setHelpRequests] = useState([]);

    const [currentPeoplePage, setCurrentPeoplePage] = useState(1);
    const [currentHelpPage, setCurrentHelpPage] = useState(1);

    useEffect(() => {
        const myRequestsOfPeople = missingPeople.filter(person => person.user.userID === activeUser.userID);
        setPeople(myRequestsOfPeople);

        const myRequestsOfHelp = helpRequest.filter(request => request.user.userID === activeUser.userID);
        setHelpRequests(myRequestsOfHelp);
    }, [activeUser.userID]);

    const handleChangePerson = (person) => {
        navigate(`/my-search-requests/${person.ID}`, { state: { person } });
    };

    const handleDeletePerson = (personID) => {
        const index = missingPeople.findIndex(person => person.ID === personID);
        if (index !== -1) {
            missingPeople.splice(index, 1);
            setPeople(people.filter(person => person.ID !== personID));
        }
    };

    const handleChangeHelpRequest = (request) => {
        navigate(`/my-request-help/${request.helpRequestID}`, { state: { request } });
    };

    const handleDeleteHelpRequest = (requestID) => {
        const index = helpRequest.findIndex(request => request.helpRequestID === requestID);
        if (index !== -1) {
            helpRequest.splice(index, 1);
            setHelpRequests(helpRequests.filter(request => request.helpRequestID !== requestID));
        }
    };

    const totalPeoplePages = Math.ceil(people.length / ITEMS_PER_PAGE);
    const totalHelpPages = Math.ceil(helpRequests.length / ITEMS_PER_PAGE);

    const displayedPeople = people.slice((currentPeoplePage - 1) * ITEMS_PER_PAGE, currentPeoplePage * ITEMS_PER_PAGE);
    const displayedHelpRequests = helpRequests.slice((currentHelpPage - 1) * ITEMS_PER_PAGE, currentHelpPage * ITEMS_PER_PAGE);

    return (
        <div className={styles.requestsContainer}>
            <div className={styles.requestSection}>
                <h3  className={styles.centeredHeader}>Мої запити на пошук осіб</h3>
                {people.length === 0 ? (
                    <p className={styles.centeredHeader}>Ви ще не зробили жодного запиту на пошук особи</p>
                ) : (
                    <div>
                        {displayedPeople.map(person => (
                            <div key={person.ID} className={styles.requestItem}>
                                <p style={{ fontWeight: 'bold' }}>{person.fullName}</p>
                                {person.confirmationInfo.status === 'blocked' && (
                                    <p className={styles.blocked}>
                                        Користувач не був доданий до системи.<br/>
                                        Причина: {person.confirmationInfo.solution}.
                                    </p>)}
                                {person.confirmationInfo.status === 'accept' && (
                                    <p className={styles.accepted}>Користувач був успішно доданий до системи</p>
                                )}
                                {person.confirmationInfo.status === 'waiting accept' && (
                                    <p className={styles.waiting}>Корситувач знаходиться на перевірці. Очікуйте!</p>
                                )}
                                <button
                                    className={`${styles.button} ${person.confirmationInfo.status === 'waiting accept' ? styles.disabledButton : ''}`}
                                    disabled={person.confirmationInfo.status === 'waiting accept'}
                                    onClick={() => handleChangePerson(person)}
                                >
                                    Змінити дані
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDeletePerson(person.ID)}
                                >
                                    Видалити
                                </button>
                            </div>
                        ))}
                        {totalPeoplePages > 1 && (
                            <div className={styles.pagination}>
                                {Array.from({ length: totalPeoplePages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        className={styles.pageLink}
                                        onClick={() => setCurrentPeoplePage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className={styles.requestSection}>
                <h3 className={styles.centeredHeader}>Мої запити на допомогу</h3>
                {helpRequests.length === 0 ? (
                    <p className={styles.centeredHeader}>Ви ще не зробили жодного запиту на допомогу</p>
                ) : (
                    <div>
                        {displayedHelpRequests.map(request => (
                            <div key={request.helpRequestID} className={styles.requestItem}>
                                <p style={{ fontWeight: 'bold' }}>{request.topic}</p>
                                {request.confirmationInfo.status === 'blocked' && (
                                    <p className={styles.blocked}>
                                        Заявка не була додана до системи.<br/>
                                        Причина: {request.confirmationInfo.solution}.
                                    </p>)}
                                {request.confirmationInfo.status === 'accept' && (
                                    <p className={styles.accepted}>Заявка була успішно додана до системи</p>
                                )}
                                {request.confirmationInfo.status === 'waiting accept' && (
                                    <p className={styles.waiting}>Заявка знаходиться на перевірці. Очікуйте!</p>
                                )}
                                <button
                                    className={`${styles.button} ${request.confirmationInfo.status === 'waiting accept' ? styles.disabledButton : ''}`}
                                    disabled={request.confirmationInfo.status === 'waiting accept'}
                                    onClick={() => handleChangeHelpRequest(request)}
                                >
                                    Змінити дані
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDeleteHelpRequest(request.helpRequestID)}
                                >
                                    Видалити
                                </button>
                            </div>
                        ))}
                        {totalHelpPages > 1 && (
                            <div className={styles.pagination}>
                                {Array.from({length: totalHelpPages}, (_, index) => (
                                    <button
                                        key={index + 1}
                                        className={styles.pageLink}
                                        onClick={() => setCurrentHelpPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
