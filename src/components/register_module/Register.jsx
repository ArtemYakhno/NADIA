import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContext } from '../store/CardContext.jsx';
import Modal from '../modal/Modal.jsx';
import { users } from "../../datas/users.js";
import styles from './Register.module.css';

const Register = () => {
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [modalInput, setModalInput] = useState('');
    const [codeError, setCodeError] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const { setActiveUser } = useContext(CardContext);
    const navigate = useNavigate();

    const validateInput = () => {
        const phoneRegex = /^\+380\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!validateName(userName) || !validateName(userLastName)) {
            setErrorMessage('Ім\'я та прізвище повинні містити більше 1 символу');
            return false;
        }
        if (!phoneRegex.test(phoneNumber)) {
            setErrorMessage('Некоректний номер телефону');
            return false;
        }
        if (!emailRegex.test(email)) {
            setErrorMessage('Некоректний email');
            return false;
        }
        if (users.some(user => user.phoneNumber === phoneNumber || user.email === email)) {
            setErrorMessage('Користувач з таким номером телефону або email вже існує');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const validateName = (name) => {
        return name.length > 1;
    };

    const handleRegister = () => {
        if (!validateInput()) return;

        setNewPhoneNumber(phoneNumber);
        setNewEmail(email);
        setShowPhoneModal(true);
    };

    const saveUserData = () => {
        const newUser = {
            userID: users.length + 1,
            userName,
            userLastName,
            phoneNumber: newPhoneNumber,
            email: newEmail,
            userRole: 'visitor',
            isPremium: false,
            password,
        };

        users.push(newUser);
        setActiveUser(newUser);
        setSuccessMessage('Реєстрація успішна! Ви будете перенаправлені на сторінку авторизації.');
        setTimeout(() => {
            navigate('/authorization');
        }, 2000);
    };

    const handlePhoneModalSubmit = () => {
        if (/^\d{4}$/.test(modalInput)) {
            setShowPhoneModal(false);
            setModalInput('');
            setCodeError('');
            setShowEmailModal(true);
        } else {
            setCodeError('Код не правильний');
        }
    };

    const handleEmailModalSubmit = () => {
        if (/^\d{4}$/.test(modalInput)) {
            setShowEmailModal(false);
            setCodeError('');
            setModalInput('');
            saveUserData();
        } else {
            setCodeError('Код не правильний');
        }
    };

    const handleModalCancel = () => {
        setShowPhoneModal(false);
        setShowEmailModal(false);
        setModalInput('');
    };

    return (
        <div className={styles.container}>
            <h2>Реєстрація</h2>
            <p>Ваше ім'я</p>
            <input
                type="text"
                placeholder="Ім'я"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className={styles.input}
            />
            <p>Ваше призвіще</p>
            <input
                type="text"
                placeholder="Прізвище"
                value={userLastName}
                onChange={e => setUserLastName(e.target.value)}
                className={styles.input}
            />
            <p>Ваш номер телефону</p>
            <input
                type="text"
                placeholder="Номер телефону"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                className={styles.input}
            />
            <p>Ваша пошта</p>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.input}
            />
            <p>Придумайте пароль</p>
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={styles.input}
            />
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <button onClick={handleRegister} className={styles.button}>Зареєструватися</button>
            {successMessage && <p className={styles.success}>{successMessage}</p>}

            <Modal open={showPhoneModal} closeESC={true}>
                <h2>Підтвердження номера телефону</h2>
                <input
                    type="text"
                    placeholder="Введіть код"
                    value={modalInput}
                    onChange={e => setModalInput(e.target.value)}
                    className={styles.input}
                />
                {codeError && <p className={styles.error}>{codeError}</p>}
                <div className={styles.modalButtonContainer}>
                    <button onClick={handlePhoneModalSubmit} className={styles.button}>Підтвердити</button>
                    <button onClick={handleModalCancel} className={`${styles.button} ${styles.greyButton}`}>Скасувати</button>
                </div>
            </Modal>

            <Modal open={showEmailModal} closeESC={true}>
                <h2>Підтвердження email</h2>
                <input
                    type="text"
                    placeholder="Введіть код"
                    value={modalInput}
                    onChange={e => setModalInput(e.target.value)}
                    className={styles.input}
                />
                {codeError && <p className={styles.error}>{codeError}</p>}
                <div className={styles.modalButtonContainer}>
                    <button onClick={handleEmailModalSubmit} className={styles.button}>Підтвердити</button>
                    <button onClick={handleModalCancel} className={`${styles.button} ${styles.greyButton}`}>Скасувати</button>
                </div>
            </Modal>
        </div>
    );
};

export default Register;
