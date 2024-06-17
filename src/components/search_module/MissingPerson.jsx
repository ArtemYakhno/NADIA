import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { searchInformation } from '../../datas/searchInformation.js';
import { CardContext } from "../store/CardContext.jsx";
import Modal from "../modal/Modal.jsx";
import ConfirmAuthorization from "../protection/ConfirmAuthorization.jsx";
import styles from './MissingPerson.module.css';

const MissingPerson = () => {
    const { activeUser, isTokenValid } = useContext(CardContext);
    const location = useLocation();
    const { person } = location.state;
    const [hasResponded, setHasResponded] = useState(false);
    const [responseInfo, setResponseInfo] = useState(null);
    const [dataUpdated, setDataUpdated] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        if (activeUser) {
            const response = searchInformation.find(entry => entry.userID === activeUser.userID && entry.personID === person.ID);
            if (response) {
                setHasResponded(true);
                setResponseInfo(response);
            }
        }
    }, [activeUser, person.ID, dataUpdated]);

    const handleRespond = () => {
        if (isTokenValid) {
            const formatDate = (date) => {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            };

            let searchInfo = {
                searchID: searchInformation.length + 1,
                personID: person.ID,
                dateOfSubmitting: formatDate(new Date()),
                userID: activeUser.userID
            };
            searchInformation.push(searchInfo);
            setDataUpdated(prev => !prev);
        } else {
            setModalIsOpen(true);
        }
    };

    return (
        <div className={styles.container}>
            <img src={person.photo} alt={person.fullName || 'Інформація відсутня'} className={styles.photo} />
            <h1 className={styles.name}>{person.fullName || 'Інформація відсутня'}</h1>
            <div className={styles.details}>
                <p>{`Ім'я: ${person.firstName || 'Інформація відсутня'}`}</p>
                <p>{`Прізвище: ${person.lastName || 'Інформація відсутня'}`}</p>
                <p>{`По батькові: ${person.fatherName || 'Інформація відсутня'}`}</p>
                <p>{`Дата народження: ${person.dob || 'Інформація відсутня'}`}</p>
                <p>{`Місце зникнення: ${person.lastSeenLocation || 'Інформація відсутня'}`}</p>
                <p>{`Дата зникнення: ${person.dom || 'Інформація відсутня'}`}</p>
                <p>{`Стать: ${person.sex || 'Інформація відсутня'}`}</p>
                <p>{`Зріст: ${person.additionInformation.height || 'Інформація відсутня'}`}</p>
                <p>{`Тип тіла: ${person.additionInformation.tpBody || 'Інформація відсутня'}`}</p>
                <p>{`Тип шкіри: ${person.additionInformation.clSkin || 'Інформація відсутня'}`}</p>
                <p>{`Тип волося: ${person.additionInformation.tpHairstyle || 'Інформація відсутня'}`}</p>
                <p>{`Колір волося: ${person.additionInformation.clHair || 'Інформація відсутня'}`}</p>
                <p>{`Колір очей: ${person.additionInformation.clEyes || 'Інформація відсутня'}`}</p>
                <p>{`Опис тату: ${person.additionInformation.tattoo || 'Інформація відсутня'}`}</p>
                <p>{`Додаткова інформація: ${person.additionInformation.comment || 'Інформація відсутня'}`}</p>
                <p>{`Статус: ${person.confirmationInfo.status === 'blocked' ? `Заблокований: ${person.confirmationInfo.solution}` : 'Активний'}`}</p>
            </div>
            {activeUser ? (
                !hasResponded ? (
                    <button onClick={handleRespond} className={styles.respondButton}>Відгукнутися</button>
                ) : (
                    <div className={styles.responseInfo}>
                        <p>{`Ви відгукнулись на цей запит: ${responseInfo.dateOfSubmitting}`}</p>
                        <div>
                            <p>Дані для комунікації:</p>
                            <p>{person.user?.phoneNumber || 'Інформація відсутня'}</p>
                            <p>{person.user?.email || 'Інформація відсутня'}</p>
                        </div>
                        <p>Був доданим користувачем: {activeUser.userName} {activeUser.userLastName}</p>
                    </div>
                )
            ) : (
                <button onClick={() => setModalIsOpen(true)} className={styles.respondButton}>Відгукнутися</button>
            )}
            {modalIsOpen && (
                <Modal open={modalIsOpen} closeESC={true}>
                    <ConfirmAuthorization onCancel={handleCloseModal} />
                </Modal>
            )}
        </div>
    );
};

export default MissingPerson;
