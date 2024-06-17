import React, { useState, useContext } from 'react';
import { supportRequests } from '../../datas/supportRequests.js';
import { CardContext } from '../store/CardContext.jsx';
import { faq } from "../../datas/faq.js";
import Modal from "../modal/Modal.jsx";
import styles from './TechnicalSupport.module.css';

const TechnicalSupport = () => {
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const { activeUser } = useContext(CardContext);

    const handleSubmit = () => {
        if (topic.length < 5) {
            setError('Тема повинна містити мінімум 5 символів.');
            return;
        }
        if (description.length < 30) {
            setError('Опис проблеми повинен містити мінімум 30 символів.');
            return;
        }

        const newRequest = {
            supportRequestID: Math.random(), // Генеруємо випадковий ID
            userID: activeUser.userID,
            moderatorID: null,
            topic,
            description,
            status: 'active',
            solution: null
        };

        supportRequests.push(newRequest);
        setModalOpen(true);
        setTimeout(() => {
            setModalOpen(false);
        }, 2000); // Модальне вікно зникне через 2 секунди
        setTopic('');
        setDescription('');
        setError('');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Технічна підтримка</h2>
            {error && <p className={styles.error}>{error}</p>}
            <label className={styles.label}>
                Тема питання:
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={styles.input}
                />
            </label>
            <label className={styles.label}>
                Опис проблеми:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.textarea}
                />
            </label>
            <button className={styles.button} onClick={handleSubmit}>Надіслати</button>
            <Modal open={modalOpen} closeESC={false}>
                <p>Запит надіслано!</p>
            </Modal>
            <div className={styles.faq}>
                <h2 className={styles.header}>Поширені питання</h2>
                {faq.map((item, index) => (
                    <div key={index} className={styles.faqItem}>
                        <h3>{item.question}</h3>
                        <p>{item.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechnicalSupport;
