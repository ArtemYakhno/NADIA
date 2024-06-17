import React, {useContext, useState} from 'react';
import {CardContext} from '../store/CardContext.jsx';
import Modal from '../modal/Modal.jsx';
import {users} from "../../datas/users.js";
import styles from './Account.module.css';

const Account = () => {
    const {activeUser, setActiveUser} = useContext(CardContext);
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState(activeUser.userName);
    const [userLastName, setUserLastName] = useState(activeUser.userLastName);
    const [phoneNumber, setPhoneNumber] = useState(activeUser.phoneNumber);
    const [email, setEmail] = useState(activeUser.email);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [modalInput, setModalInput] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [codeError, setCodeError] = useState('');

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^\+380\d{9}$/;
        return phoneRegex.test(phone);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateName = (name) => {
        return name.length > 1;
    };

    const validateCode = (code) => {
        const codeRegex = /^\d{4}$/;
        return codeRegex.test(code);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setSuccessMessage('');
    };

    const handleSaveChanges = () => {
        if (!validateName(userName) || !validateName(userLastName)) {
            setErrorMessage('Ім\'я та прізвище повинні містити більше 1 символу');
            return;
        }
        if (!validatePhoneNumber(phoneNumber)) {
            setErrorMessage('Некоректний номер телефону');
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage('Некоректний email');
            return;
        }

        if (phoneNumber !== activeUser.phoneNumber) {
            setNewPhoneNumber(phoneNumber);
            setShowPhoneModal(true);
        } else if (email !== activeUser.email) {
            setNewEmail(email);
            setShowEmailModal(true);
        } else {
            saveUserData();
        }
    };

    const saveUserData = () => {
        const userIndex = users.findIndex(user => user.userID === activeUser.userID);
        if (userIndex !== -1) {
            users[userIndex] = {
                ...users[userIndex],
                userName,
                userLastName,
                phoneNumber,
                email
            };
            setActiveUser(users[userIndex]);
        }
        setErrorMessage('');
        setSuccessMessage('Дані збережено');
        setIsEditing(false);
    };

    const handlePhoneModalSubmit = () => {
        if (validateCode(modalInput)) {
            setPhoneNumber(newPhoneNumber);
            setShowPhoneModal(false);
            setCodeError('');
            setModalInput('');
            if (email !== activeUser.email) {
                setNewEmail(email);
                setShowEmailModal(true);
            } else {
                saveUserData();
            }
        } else {
            setCodeError('Код не правильний');
        }
    };

    const handleEmailModalSubmit = () => {
        if (validateCode(modalInput)) {
            setShowEmailModal(false);
            setCodeError('');
            setModalInput('');
            saveUserData();
        } else {
            setCodeError('Код не правильний');
        }
    };

    const handlePasswordChange = () => {
        setShowPasswordModal(true);
        setOldPassword('');
        setNewPassword('');
    };

    const handlePasswordSubmit = () => {
        if (oldPassword === activeUser.password) {
            const userIndex = users.findIndex(user => user.userID === activeUser.userID);
            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                setActiveUser(users[userIndex]);
                setShowPasswordModal(false);
                setSuccessMessage('Пароль успішно змінено');
            }
        } else {
            setCodeError('Старий пароль невірний');
        }
    };

    const handleModalCancel = () => {
        setShowPhoneModal(false);
        setShowEmailModal(false);
        setShowPasswordModal(false);
        setModalInput('');
        setOldPassword('');
        setNewPassword('');

    };

    const handleBack = () => {
        setIsEditing(false); // Вихід з режиму редагування
        // Revert to the active user data
        setUserName(activeUser.userName);
        setUserLastName(activeUser.userLastName);
        setPhoneNumber(activeUser.phoneNumber);
        setEmail(activeUser.email);
        setErrorMessage('');
        setSuccessMessage('');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Мій акаунт</h2>
            {isEditing ? (
                <>
                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label>Ім'я:</label>
                            <input value={userName} onChange={e => setUserName(e.target.value)}/>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Прізвище:</label>
                            <input value={userLastName} onChange={e => setUserLastName(e.target.value)}/>
                        </div>
                    </div>
                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label>Номер телефону:</label>
                            <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Email:</label>
                            <input value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={handleSaveChanges}>Підтвердити</button>
                        <button className={`${styles.button} ${styles.backButton}`} onClick={handleBack}>Повернутися назад</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.nameRow}>
                        <p className={styles.fullName}>{userName} {userLastName}</p>
                    </div>
                    <div className={styles.inputRow}>
                        <p>Номер телефону: {phoneNumber}</p>
                        <p>Email: {email}</p>
                    </div>
                    <div className={styles.buttonRow}>
                        <button className={styles.button} onClick={handleEditClick}>Змінити дані</button>
                        <button className={styles.buttonRight} onClick={handlePasswordChange}>Змінити пароль</button>
                    </div>
                    <p>Роль користувача: {activeUser.userRole === 'visitor' ? 'Відвідувач' : 'Модератор'}</p>
                    <p>Підписка: {activeUser.isPremium ? 'Наявна' : 'Не придбана'}</p>
                </>
            )}
            {successMessage && <p className={styles.success}>{successMessage}</p>}

            <Modal open={showPhoneModal} closeESC={true}>
                <h2>Підтвердження номера телефону</h2>
                <input
                    type="text"
                    placeholder="Введіть код"
                    value={modalInput}
                    onChange={e => setModalInput(e.target.value)}
                    className={styles.modalInput}
                />
                {codeError && <p className={styles.error}>{codeError}</p>}
                <div className={styles.modalButtonContainer}>
                    <button className={styles.button} onClick={handlePhoneModalSubmit}>Підтвердити</button>
                    <button className={`${styles.button} ${styles.backButton}`} onClick={handleModalCancel}>Скасувати</button>
                </div>
            </Modal>

            <Modal open={showEmailModal} closeESC={true}>
                <h2>Підтвердження email</h2>
                <input
                    type="text"
                    placeholder="Введіть код"
                    value={modalInput}
                    onChange={e => setModalInput(e.target.value)}
                    className={styles.modalInput}
                />
                {codeError && <p className={styles.error}>{codeError}</p>}
                <div className={styles.modalButtonContainer}>
                    <button className={styles.button} onClick={handleEmailModalSubmit}>Підтвердити</button>
                    <button className={`${styles.button} ${styles.backButton}`} onClick={handleModalCancel}>Скасувати</button>
                </div>
            </Modal>

            <Modal open={showPasswordModal} closeESC={true}>
                <h2>Зміна паролю</h2>
                <input
                    type="password"
                    placeholder="Старий пароль"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    className={styles.modalInput}
                />
                <input
                    type="password"
                    placeholder="Новий пароль"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className={styles.modalInput}
                />
                {codeError && <p className={styles.error}>{codeError}</p>}
                <div className={styles.modalButtonContainer}>
                    <button className={styles.button} onClick={handlePasswordSubmit}>Змінити пароль</button>
                    <button className={`${styles.button} ${styles.backButton}`} onClick={handleModalCancel}>Скасувати</button>
                </div>
            </Modal>
        </div>
    );
};

export default Account;
