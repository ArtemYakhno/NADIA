import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {CardContext} from '../store/CardContext.jsx';
import Modal from '../modal/Modal.jsx';
import {users} from "../../datas/users.js";
import styles from './Authorization.module.css';

const Authorization = () => {
    const [phoneOrEmail, setPhoneOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalInput, setModalInput] = useState('');
    const [codeInput, setCodeInput] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [resetStage, setResetStage] = useState(1); // 1: enter phone/email, 2: enter code, 3: reset password
    const [currentUser, setCurrentUser] = useState(null);
    const {setIsTokenValid, setActiveUser} = useContext(CardContext);
    const navigate = useNavigate();

    const validateInput = () => {
        const phoneRegex = /^\+380\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!(phoneRegex.test(phoneOrEmail) || emailRegex.test(phoneOrEmail))) {
            setErrorMessage('Некоректний номер телефону або email');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleLogin = () => {
        if (!validateInput()) return;

        const user = users.find(user =>
            (user.phoneNumber === phoneOrEmail || user.email === phoneOrEmail) && user.password === password
        );

        if (user) {
            setIsTokenValid(true);
            setActiveUser(user);
            navigate('/');
        } else {
            setErrorMessage('Невірний номер телефону/email або пароль. Або такого користувача не існує!');
        }
    };

    const handleForgotPassword = () => {
        setShowModal(true);
        setResetStage(1);
        setModalInput('');
        setCodeInput('');
        setNewPassword('');
        setModalMessage('');
    };

    const handleModalSubmit = () => {
        const user = users.find(user => user.phoneNumber === modalInput || user.email === modalInput);
        if (user) {
            setCurrentUser(user);
            setModalMessage('Код відправлено! Введіть код для зміни паролю.');
            setResetStage(2);
        } else {
            setModalMessage('Користувача з таким номером телефону або email не знайдено.');
        }
    };

    const handleCodeSubmit = () => {
        const codeRegex = /^\d{4}$/;
        if (codeRegex.test(codeInput)) {
            setModalMessage('Код підтверджено! Тепер ви можете змінити пароль.');
            setResetStage(3);
        } else {
            setModalMessage('Невірний код. Будь ласка, спробуйте ще раз.');
        }
    };

    const handlePasswordReset = () => {
        if (newPassword.length < 6) {
            setModalMessage('Пароль повинен містити щонайменше 6 символів.');
            return;
        }

        const userIndex = users.findIndex(user => user.userID === currentUser.userID);
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            setModalMessage('Пароль успішно змінено! Тепер ви можете увійти.');
            setTimeout(() => {
                setShowModal(false);
                navigate('/authorization');
            }, 2000);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Авторизація</h2>
            <p className={styles.subheader}>Введіть ваш номер телефона або email</p>
            <input
                type="text"
                placeholder="Номер телефону або email"
                value={phoneOrEmail}
                onChange={e => setPhoneOrEmail(e.target.value)}
                className={styles.input}
            />
            <p className={styles.subheader}>Введіть ваш пароль</p>
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={styles.input}
            />
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={handleLogin}>Увійти</button>
                <button className={styles.button} onClick={() => navigate('/register')}>Зареєструватися</button>
                <button className={styles.button} onClick={handleForgotPassword}>Забув пароль</button>
            </div>

            <Modal open={showModal} closeESC={true}>
                <h2 className={styles.modalHeader}>Відновлення паролю</h2>
                {modalMessage && <p className={styles.modalMessage}>{modalMessage}</p>}
                {resetStage === 1 && (
                    <>
                        <input
                            type="text"
                            placeholder="Номер телефону або email"
                            value={modalInput}
                            onChange={e => setModalInput(e.target.value)}
                            className={styles.inputModal}
                        />
                        <div className={styles.modalButtonContainer}>
                            <button className={styles.button} onClick={handleModalSubmit}>Надіслати код</button>
                            <button className={`${styles.button} ${styles.greyButton}`}
                                    onClick={() => setShowModal(false)}>Повернутися
                            </button>
                        </div>

                    </>
                )}
                {resetStage === 2 && (
                    <>
                        <input
                            type="text"
                            placeholder="Введіть 4-значний код"
                            value={codeInput}
                            onChange={e => setCodeInput(e.target.value)}
                            className={styles.inputModal}
                        />
                        <div className={styles.modalButtonContainer}>
                            <button className={styles.button} onClick={handleCodeSubmit}>Підтвердити код</button>
                            <button className={`${styles.button} ${styles.greyButton}`}
                                    onClick={() => setShowModal(false)}>Повернутися
                            </button>
                        </div>
                    </>
                )}
                {resetStage === 3 && (
                    <>
                        <input
                            type="password"
                            placeholder="Новий пароль"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className={styles.inputModal}
                        />
                        <div className={styles.modalButtonContainer}>
                            <button className={styles.button} onClick={handlePasswordReset}>Змінити пароль</button>
                            <button className={`${styles.button} ${styles.greyButton}`}
                                    onClick={() => setShowModal(false)}>Повернутися
                            </button>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Authorization;
