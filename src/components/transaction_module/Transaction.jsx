import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CardContext } from '../store/CardContext.jsx';
import { users } from "../../datas/users.js";
import { helpFeedback } from "../../datas/helpFeedback.js";
import styles from './Transaction.module.css';

export default function Transaction() {
    const location = useLocation();
    const { price, from, paymentPurpose, helpRequestID, description } = location.state || {};
    const { activeUser } = useContext(CardContext);

    const [formData, setFormData] = useState({
        cardNumber: '',
        cvv: '',
        amount: price || '',
        expiryMonth: '',
        expiryYear: '',
    });

    const [formErrors, setFormErrors] = useState({
        cardNumber: '',
        cvv: '',
        amount: '',
        expiryMonth: '',
        expiryYear: '',
    });

    const [transactionSuccess, setTransactionSuccess] = useState(null);

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let valid = true;
        const errors = {
            cardNumber: '',
            cvv: '',
            amount: '',
            expiryMonth: '',
            expiryYear: '',
        };

        const cardRegex = /^\d{16}$/;
        const cvvRegex = /^\d{3}$/;

        if (!cardRegex.test(formData.cardNumber)) {
            errors.cardNumber = 'Некоректний номер карти';
            valid = false;
        }

        if (!cvvRegex.test(formData.cvv)) {
            errors.cvv = 'Некоректний CVV код';
            valid = false;
        }

        if (!price && (isNaN(formData.amount) || formData.amount < 10)) {
            errors.amount = 'Сума повинна бути числом і не меншою за 10 грн';
            valid = false;
        }

        if (formData.expiryMonth === '' || formData.expiryYear === '') {
            errors.expiryMonth = 'Виберіть місяць та рік закінчення карти';
            errors.expiryYear = 'Виберіть місяць та рік закінчення карти';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const onPremiumTransaction = (userID) => {
        const userIndex = users.findIndex(user => user.userID === userID);
        if (userIndex !== -1) {
            users[userIndex].isPremium = true;
            console.log(`Користувач ${users[userIndex].userName} оновлено на преміум.`);
        }
    };

    const onHelpTransaction = (userID, helpRequestID) => {
        const feedbackIndex = helpFeedback.findIndex(feedback => feedback.userID === userID && feedback.helpRequestID === helpRequestID);
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }

        if (feedbackIndex !== -1) {
            helpFeedback[feedbackIndex].dateOfSubmitting = formatDate(new Date());
            console.log(`Оновлено дату внеску для користувача ${userID} на запит ${helpRequestID}.`);
        } else {
            const feedbackInfo = {
                helpFeedback: helpFeedback.length + 1,
                helpRequestID: helpRequestID,
                dateOfSubmitting: formatDate(new Date()),
                userID: userID
            };
            helpFeedback.push(feedbackInfo);
            console.log(`Внесок на допомогу зроблено користувачем ${userID} для запиту ${helpRequestID}.`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (from === '/premium') {
            onPremiumTransaction(activeUser.userID);
        } else if (from === '/case-help' && helpRequestID) {
            onHelpTransaction(activeUser.userID, helpRequestID);
        }

        setTransactionSuccess("Транзакція успішна! Дякуємо за ваш внесок");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>{paymentPurpose}</h1>
            <p className={styles.description}>{description}</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Номер карти:</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    {formErrors.cardNumber && <p className={styles.error}>{formErrors.cardNumber}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label>CVV:</label>
                    <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    {formErrors.cvv && <p className={styles.error}>{formErrors.cvv}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label>Місяць закінчення карти:</label>
                    <select
                        name="expiryMonth"
                        value={formData.expiryMonth}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Оберіть місяць</option>
                        {months.map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                    {formErrors.expiryMonth && <p className={styles.error}>{formErrors.expiryMonth}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label>Рік закінчення карти:</label>
                    <select
                        name="expiryYear"
                        value={formData.expiryYear}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Оберіть рік</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    {formErrors.expiryYear && <p className={styles.error}>{formErrors.expiryYear}</p>}
                </div>
                {!price ? (
                    <div className={styles.formGroup}>
                        <p>Введіть бажану суму внеску</p>
                        <label>Сума:</label>
                        <input
                            type="text"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {formErrors.amount && <p className={styles.error}>{formErrors.amount}</p>}
                    </div>
                ) : (
                    <p>Ціна підписки: {price}</p>
                )}
                <button type="submit" className={styles.button}>Здійснити транзакцію</button>
            </form>
            {transactionSuccess && (
                <p className={styles.success}>{transactionSuccess}</p>
            )}
        </div>
    );
}
