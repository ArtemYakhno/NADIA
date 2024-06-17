import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContext } from "../store/CardContext.jsx";
import { searchInformation } from "../../datas/searchInformation.js";
import { missingPeople } from "../../datas/missingPeople.js";
import { helpRequest } from "../../datas/helpRequest.js";
import { helpFeedback } from "../../datas/helpFeedback.js";
import styles from './MyContributions.module.css';

const ITEMS_PER_PAGE = 10;

export default function MyContributions() {
    const [userSubmissions, setUserSubmissions] = useState([]);
    const [userHelpFeedback, setUserHelpFeedback] = useState([]);
    const { activeUser } = useContext(CardContext);
    const navigate = useNavigate();

    const [currentSearchPage, setCurrentSearchPage] = useState(1);
    const [currentHelpPage, setCurrentHelpPage] = useState(1);

    useEffect(() => {
        const submissions = searchInformation.filter(submission => submission.userID === activeUser.userID);
        setUserSubmissions(submissions);

        const feedbacks = helpFeedback.filter(feedback => feedback.userID === activeUser.userID);
        setUserHelpFeedback(feedbacks);
    }, [activeUser.userID]);

    const handleDeletePerson = (personID) => {
        const index = searchInformation.findIndex(item =>
            item.userID === activeUser.userID && item.personID === personID
        );

        if (index !== -1) {
            searchInformation.splice(index, 1);
            setUserSubmissions(searchInformation.filter(submission => submission.userID === activeUser.userID));
        }
    };

    const handleDeleteHelp = (helpRequestID) => {
        const index = helpRequest.findIndex(request => request.helpRequestID === helpRequestID);

        if (index !== -1) {
            helpRequest.splice(index, 1);
            setUserHelpFeedback(helpFeedback.filter(feedback => feedback.userID === activeUser.userID));
        }
    };

    const handleMoreInfoPerson = (person) => {
        navigate(`/missing-person/${person.ID}`, { state: { person } });
    };

    const handleMoreInfoHelp = (help) => {
        navigate(`/case-help/${help.helpRequestID}`, { state: { help } });
    };

    const people = userSubmissions.map(submission =>
        missingPeople.find(person => person.ID === submission.personID)
    ).filter(person => person !== undefined);

    const userHelps = userHelpFeedback.map(feedback =>
        helpRequest.find(request => request.helpRequestID === feedback.helpRequestID)
    ).filter(request => request !== undefined);

    const totalSearchPages = Math.ceil(people.length / ITEMS_PER_PAGE);
    const totalHelpPages = Math.ceil(userHelps.length / ITEMS_PER_PAGE);

    const displayedPeople = people.slice((currentSearchPage - 1) * ITEMS_PER_PAGE, currentSearchPage * ITEMS_PER_PAGE);
    const displayedHelps = userHelps.slice((currentHelpPage - 1) * ITEMS_PER_PAGE, currentHelpPage * ITEMS_PER_PAGE);

    return (
        <div className={styles.contributionsContainer}>
            <div className={styles.contributionSection}>
                <h3 className={styles.contributionHeader}>Мій внесок по пошуку осіб:</h3>
                {people.length === 0 ? (
                    <p className={styles.contributionHeader}>Ви ще не зробили жодний внесок</p>
                ) : (
                    <ul className={styles.contributionList}>
                        {displayedPeople.map(person => (
                            <li key={person.ID} className={styles.contributionItem}>
                                <p style={{ fontWeight: 'bold' }}>{person.fullName}</p>
                                <div>
                                    <button className={styles.button} onClick={() => handleMoreInfoPerson(person)}>Переглянути більше</button>
                                    <button className={styles.deleteButton} onClick={() => handleDeletePerson(person.ID)}>Позбутися</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {totalSearchPages > 1 && (
                    <div className={styles.pagination}>
                        {Array.from({ length: totalSearchPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={styles.pageLink}
                                onClick={() => setCurrentSearchPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.contributionSection}>
                <h3 className={styles.contributionHeader}>Мій внесок по допомозі:</h3>
                {userHelps.length === 0 ? (
                    <p className={styles.contributionHeader}>Ви ще не зробили жодний внесок по допомозі</p>
                ) : (
                    <ul className={styles.contributionList}>
                        {displayedHelps.map(request => (
                            <li key={request.helpRequestID} className={styles.contributionItem}>
                                <p style={{ fontWeight: 'bold' }}>{request.topic}</p>
                                <div>
                                    <button className={styles.button} onClick={() => handleMoreInfoHelp(request)}>Переглянути більше</button>
                                    <button className={styles.deleteButton} onClick={() => handleDeleteHelp(request.helpRequestID)}>Позбутися</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {totalHelpPages > 1 && (
                    <div className={styles.pagination}>
                        {Array.from({ length: totalHelpPages }, (_, index) => (
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
        </div>
    );
}
