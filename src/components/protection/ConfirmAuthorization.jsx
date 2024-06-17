import { Link } from "react-router-dom";
import React from "react";
import styles from './ConfirmAuthorization.module.css';

export default function ConfirmAuthorization({ onCancel }) {

    return (
        <div className={styles.container}>
            <p className={styles.message}>Щоб продовжити, ви повинні авторизуватися</p>
            <div className={styles.buttonContainer}>
                <Link to="/authorization" onClick={onCancel} className={`${styles.button} ${styles.authButton}`}>
                    Увійти до облікового запису
                </Link>
                <Link to="/" onClick={onCancel} className={`${styles.button} ${styles.homeButton}`}>
                    Повернутися до головного меню
                </Link>
            </div>
        </div>
    );
}
