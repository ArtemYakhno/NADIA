import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PersonCard.module.css';

const PersonCard = ({ person }) => {
    const navigate = useNavigate();

    const handleMoreInfo = () => {
        navigate(`/missing-person/${person.ID}`, { state: { person } });
    };

    return (
        <div className={styles.personCard}>
            <img src={person.photo} alt={person.fullName} className={styles.photo} />
            <div className={styles.details}>
                <h3 className={styles.name}>{person.fullName}</h3>
                <p className={styles.info}>Дата народження: {person.dob}</p>
                <button onClick={handleMoreInfo} className={styles.button}>Переглянути більше</button>
            </div>
        </div>
    );
};

export default PersonCard;
