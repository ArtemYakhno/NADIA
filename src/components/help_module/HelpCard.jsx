import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HelpCard.module.css';

const HelpCard = ({ help }) => {
    const navigate = useNavigate();

    const handleMoreInfo = () => {
        navigate(`/case-help/${help.helpRequestID}`, { state: { help } });
    };

    return (
        <div className={styles.helpCard}>
            <img src={help.photo} alt={help.topic} className={styles.photo} />
            <div className={styles.details}>
                <h3 className={styles.topic}>{help.topic}</h3>
                <p className={styles.type}>Тип допомоги: {help.type}</p>
                <button onClick={handleMoreInfo} className={styles.button}>Переглянути більше</button>
            </div>
        </div>
    );
};

export default HelpCard;
