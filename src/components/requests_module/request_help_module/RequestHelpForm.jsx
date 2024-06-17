import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { CardContext } from '../../store/CardContext.jsx';
import { helpRequest } from '../../../datas/helpRequest.js';
import styles from './RequestHelpForm.module.css';
const RequestHelpForm = () => {
    const { activeUser } = useContext(CardContext);
    const location = useLocation();
    const help = location.state?.request;

    const [formData, setFormData] = useState({
        type: '',
        topic: '',
        description: '',
        cardNumber: '',
        photo: '',
        user: {
            phoneNumber: activeUser.phoneNumber,
            email: activeUser.email
        }
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [isMaterialHelp, setIsMaterialHelp] = useState(false);

    useEffect(() => {
        if (help) {
            setFormData({
                ...help,
                user: help.user
            });
            setIsMaterialHelp(help.type === 'Матеріальна');
        }
    }, [help]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith('user.')) {
            const field = name.split('.')[1];
            setFormData(prevState => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    [field]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
        if (name === 'type') {
            setIsMaterialHelp(value === 'Матеріальна');
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.type) newErrors.type = "Тип допомоги є обов'язковим";
        if (!formData.topic) newErrors.topic = "Тема є обов'язковою";
        if (!formData.description) newErrors.description = "Опис проблеми є обов'язковим";
        if (!formData.user.phoneNumber) newErrors.phoneNumber = "Номер телефону є обов'язковим";
        if (!formData.user.email) newErrors.email = "Електронна пошта є обов'язковою";
        if (isMaterialHelp && !formData.cardNumber) newErrors.cardNumber = "Номер карти є обов'язковим";

        const phoneRegex = /^\+380\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cardRegex = /^\d{16}$/;

        if (formData.user.phoneNumber && !phoneRegex.test(formData.user.phoneNumber)) newErrors.phoneNumber = "Неправильний формат номера телефону";
        if (formData.user.email && !emailRegex.test(formData.user.email)) newErrors.email = "Неправильний формат електронної пошти";
        if (isMaterialHelp && formData.cardNumber && !cardRegex.test(formData.cardNumber)) newErrors.cardNumber = "Неправильний формат номера карти";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const exists = helpRequest.some(request => request.description === formData.description);
        if (exists) {
            setErrors({ submit: 'Такий опис вже існує в системі.' });
            return;
        }
        if (!help) {
            const maxRequests = activeUser.isPremium ? 10 : 3;
            const userRequests = helpRequest.filter(request => request.user.userID === activeUser.userID && request.type === formData.type);

            if (userRequests.length >= maxRequests) {
                if (activeUser.isPremium && userRequests.length > 10) {
                    setErrors({ submit: 'Для того, щоб додати більше, потрібно звернутися до адміністратора.' });
                } else if (!activeUser.isPremium && userRequests.length >= 3) {
                    setErrors({ submit: 'Ви можете додати лише 3 запити на одну категорію допомоги. Для того, щоб отримати більше, потрібно придбати преміум.' });
                }
                return;
            }

            const newHelpRequest = {
                helpRequestID: helpRequest.length + 1,
                type: formData.type,
                topic: formData.topic,
                description: formData.description,
                cardNumber: formData.cardNumber,
                photo: formData.photo || '/photo_2024-05-25_16-38-38.jpg?url',
                user: {
                    userID: activeUser.userID,
                    phoneNumber: formData.user.phoneNumber,
                    email: formData.user.email
                },
                confirmationInfo: {
                    moderatorName: 'Система',
                    status: 'accept',
                    solution: 'Причина не вказана'
                },
                verification: {
                    verificationRegistry: true,
                    verificationContent: true
                }
            };

            helpRequest.push(newHelpRequest);
            setSuccessMessage('Запит на допомогу успішно подано.');
        } else {
            const existingRequestIndex = helpRequest.findIndex(r => r.helpRequestID === formData.helpRequestID);

            if (existingRequestIndex > -1) {
                helpRequest[existingRequestIndex] = {
                    ...formData,
                    user: {
                        ...formData.user,
                    },
                    confirmationInfo: {
                        moderatorName: 'Система',
                        status: 'accept',
                        solution: 'Причина не вказана'
                    },
                    verification: {
                        verificationRegistry: true,
                        verificationContent: true
                    }
                };
                setSuccessMessage('Дані успішно змінені.');
            } else {
                setErrors({ submit: 'Помилка при оновленні даних.' });
            }
        }

        setFormData({
            type: '',
            topic: '',
            description: '',
            cardNumber: '',
            photo: '',
            user: {
                phoneNumber: activeUser.phoneNumber,
                email: activeUser.email
            }
        });
        setErrors({});
        setIsMaterialHelp(false);
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prevState => ({
                ...prevState,
                photo: reader.result
            }));
        };
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/jpeg, image/png, image/gif' });

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h3>Запит на допомогу</h3>
                <div>
                    <label>Тип допомоги:</label>
                    <select name="type" value={formData.type} onChange={handleChange} required>
                        <option value="">Виберіть тип допомоги</option>
                        <option value="Матеріальна">Матеріальна</option>
                        <option value="Психологічна">Психологічна</option>
                        <option value="Медична">Медична</option>
                    </select>
                    {errors.type && <p className={styles.error}>{errors.type}</p>}
                </div>
                <div>
                    <label>Тема:</label>
                    <input type="text" name="topic" value={formData.topic} onChange={handleChange} required />
                    {errors.topic && <p className={styles.error}>{errors.topic}</p>}
                </div>
                <div>
                    <label>Опис проблеми:</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                    {errors.description && <p className={styles.error}>{errors.description}</p>}
                </div>
                {isMaterialHelp && (
                    <div>
                        <label>Номер карти:</label>
                        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                        {errors.cardNumber && <p className={styles.error}>{errors.cardNumber}</p>}
                    </div>
                )}
                <div {...getRootProps()} className={styles.dropzone}>
                    <input {...getInputProps()} />
                    <p>Перетягніть фото сюди або натисніть для вибору</p>
                </div>
                {formData.photo && <img src={formData.photo} alt="Зображення" className={styles.photo} />}
                <h3>Ваші дані</h3>
                <div>
                    <label>Номер телефону:</label>
                    <input type="text" name="user.phoneNumber" value={formData.user.phoneNumber} onChange={handleChange} required />
                    {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber}</p>}
                </div>
                <div>
                    <label>Електронна пошта:</label>
                    <input type="email" name="user.email" value={formData.user.email} onChange={handleChange} required />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                </div>
                <button type="submit" className={styles.submitButton}>{help ? 'Змінити дані' : 'Подати запит'}</button>
                {errors.submit && <p className={styles.error}>{errors.submit}</p>}
                {successMessage && <p className={styles.success}>{successMessage}</p>}
            </form>
        </div>
    );
};

export default RequestHelpForm;
