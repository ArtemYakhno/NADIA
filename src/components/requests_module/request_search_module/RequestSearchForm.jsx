import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { CardContext } from '../../store/CardContext.jsx';
import { missingPeople } from '../../../datas/missingPeople.js';
import styles from './RequestSearchForm.module.css';

const RequestSearchForm = () => {
    const { activeUser } = useContext(CardContext);
    const location = useLocation();
    const person = location.state?.person;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        fatherName: '',
        dob: '',
        lastSeenLocation: '',
        dom: '',
        isMilitary: false,
        sex: '',
        bornLocation:'',
        identificationNumber:'',
        additionInformation: {
            height: '',
            tpBody: '',
            tpHairstyle: '',
            clEyes: '',
            clSkin: '',
            clHair: '',
            tattoo: '',
            comment: ''
        },
        user: {
            phoneNumber: activeUser.phoneNumber,
            email: activeUser.email
        },
        photo: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [militaryWarning, setMilitaryWarning] = useState(false);

    useEffect(() => {
        if (person) {
            setFormData({
                ...person,
                user: person.user,
                additionInformation: {
                    ...person.additionInformation,
                }
            });
            setMilitaryWarning(person.isMilitary);
        }
    }, [person]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const nameParts = name.split('.');

        if (nameParts.length > 1) {
            setFormData(prevState => ({
                ...prevState,
                [nameParts[0]]: {
                    ...prevState[nameParts[0]],
                    [nameParts[1]]: type === 'checkbox' ? checked : value,
                },
            }));
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }

        if (name === 'isMilitary' && type === 'checkbox') {
            setMilitaryWarning(checked);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'Ім\'я є обов\'язковим';
        if (!formData.lastName) newErrors.lastName = 'Прізвище є обов\'язковим';
        if (!formData.fatherName) newErrors.fatherName = 'По батькові є обов\'язковим';
        if (!formData.sex) newErrors.sex = 'Стать є обов\'язковою';
        if (!formData.user.phoneNumber) newErrors.user = { phoneNumber: 'Номер телефону є обов\'язковим' };
        if (!formData.user.email) newErrors.user = { ...newErrors.user, email: 'Електронна пошта є обов\'язковою' };

        const nameRegex = /^[a-zA-Zа-яА-ЯЇїІіЄєҐґ]+$/;
        const phoneRegex = /^\+380\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData.firstName && !nameRegex.test(formData.firstName)) newErrors.firstName = 'Неправильний формат імені';
        if (formData.lastName && !nameRegex.test(formData.lastName)) newErrors.lastName = 'Неправильний формат прізвища';
        if (formData.fatherName && !nameRegex.test(formData.fatherName)) newErrors.fatherName = 'Неправильний формат по батькові';
        if (formData.user.phoneNumber && !phoneRegex.test(formData.user.phoneNumber)) newErrors.user = { ...newErrors.user, phoneNumber: 'Неправильний формат номера телефону' };
        if (formData.user.email && !emailRegex.test(formData.user.email)) newErrors.user = { ...newErrors.user, email: 'Неправильний формат електронної пошти' };

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        if (!person) {
            const exists = missingPeople.some(p =>
                p.fullName === `${formData.lastName} ${formData.firstName} ${formData.fatherName}` && p.dob === formData.dob
            );
            if (exists) {
                setErrors({ submit: 'Такий користувач вже існує в системі.' });
                return;
            }

            const maxRequests = activeUser.isPremium ? 10 : 3;
            const userRequests = missingPeople.filter(p => p.user.userID === activeUser.userID);

            if (userRequests.length >= maxRequests) {
                if (activeUser.isPremium && userRequests.length > 10) {
                    setErrors({ submit: 'Для того, щоб додати більше, потрібно звернутися до адміністратора.' });
                } else if (!activeUser.isPremium && userRequests.length >= 3) {
                    setErrors({ submit: 'Ви можете додати лише 3 запита. Для того, щоб отримати більше, потрібно придбати преміум.' });
                }
                return;
            }

            const newPerson = {
                ID: missingPeople.length + 1,
                fullName: `${formData.lastName} ${formData.firstName} ${formData.fatherName}`,
                firstName: formData.firstName,
                lastName: formData.lastName,
                fatherName: formData.fatherName,
                dob: formData.dob,
                lastSeenLocation: formData.lastSeenLocation,
                dom: formData.dom,
                isMilitary: formData.isMilitary,
                sex: formData.sex,
                bornLocation: formData.bornLocation,
                identificationNumber: formData.identificationNumber,
                additionInformation: formData.additionInformation,
                photo: formData.photo || '/008-010_dis_club.jpg?url',
                user: {
                    userID: activeUser.userID,
                    phoneNumber: formData.user.phoneNumber,
                    email: formData.user.email
                }
            };

            if (formData.isMilitary) {
                newPerson.confirmationInfo = { status: 'waiting accept', moderatorName: '' };
                newPerson.verification = { verificationContent: true, verificationOtherRegistry: true, verificationMIA: false };
            } else {
                newPerson.confirmationInfo = { status: 'accept', moderatorName: 'Cистема' };
                newPerson.verification = { verificationContent: true, verificationOtherRegistry: true, verificationMIA: true };
            }

            missingPeople.push(newPerson);
            setSuccessMessage('Запит успішно подано.');
        } else {
            const personIndex = missingPeople.findIndex(p => p.ID === formData.ID);

            if (personIndex > -1) {
                const newPerson = {
                    ...formData,
                    fullName: `${formData.lastName} ${formData.firstName} ${formData.fatherName}`,
                    confirmationInfo: formData.isMilitary
                        ? { status: 'waiting accept', moderatorName: '' }
                        : { status: 'accept', moderatorName: 'Cистема' },
                    verification: formData.isMilitary
                        ? { verificationContent: true, verificationOtherRegistry: true, verificationMIA: false }
                        : { verificationContent: true, verificationOtherRegistry: true, verificationMIA: true }
                };

                missingPeople[personIndex] = newPerson;
                setSuccessMessage('Дані успішно змінені.');
            } else {
                setErrors({ submit: 'Помилка при оновленні даних.' });
            }
        }
        if(!person){
            setFormData({
                firstName: '',
                lastName: '',
                fatherName: '',
                dob: '',
                lastSeenLocation: '',
                dom: '',
                isMilitary: false,
                sex: '',
                bornLocation:'',
                identificationNumber:'',
                additionInformation: {
                    height: '',
                    tpBody: '',
                    tpHairstyle: '',
                    clEyes: '',
                    clSkin: '',
                    clHair: '',
                    tattoo: '',
                    comment: ''
                },
                user: {
                    phoneNumber: activeUser.phoneNumber,
                    email: activeUser.email
                },
                photo: ''
            });
        }

        setErrors({});
        setMilitaryWarning(false);
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
                <h3>Дані особи</h3>
                <p>Якщо ви не знаєте якусь інформацію про особу, залиште поле незаповненим!</p>
                <div {...getRootProps()} className={styles.dropzone}>
                    <input {...getInputProps()} />
                    <p>Перетягніть фото сюди або натисніть для вибору</p>
                </div>
                {formData.photo && <img src={formData.photo} alt="Зображення" className={styles.photo} />}
                <div>
                    <label>Ім'я:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <span>Обов'язкове поле</span>
                    {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
                </div>
                <div>
                    <label>Прізвище:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <span>Обов'язкове поле</span>
                    {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
                </div>
                <div>
                    <label>По батькові:</label>
                    <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        required
                    />
                    <span>Обов'язкове поле</span>
                    {errors.fatherName && <p className={styles.error}>{errors.fatherName}</p>}
                </div>
                <div>
                    <label>Дата народження:</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                    <span>Обов'язкове поле</span>
                    {errors.dob && <p className={styles.error}>{errors.dob}</p>}
                </div>
                <div>
                <label>Місце народження:</label>
                    <input
                        type="text"
                        name="bornLocation"
                        value={formData.bornLocation}
                        onChange={handleChange}
                    />
                    {errors.bornLocation && <p className={styles.error}>{errors.bornLocation}</p>}
                </div>
                <div>
                    <label>Ідентифікаційний номер:</label>
                    <input
                        type="text"
                        name="identificationNumber"
                        value={formData.identificationNumber}
                        onChange={handleChange}
                    />
                    {errors.identificationNumber && <p className={styles.error}>{errors.identificationNumber}</p>}
                </div>
                <div>
                    <label>Місце зникнення:</label>
                    <input
                        type="text"
                        name="lastSeenLocation"
                        value={formData.lastSeenLocation}
                        onChange={handleChange}
                    />
                    {errors.lastSeenLocation && <p className={styles.error}>{errors.lastSeenLocation}</p>}
                </div>
                <div>
                    <label>Дата зникнення:</label>
                    <input
                        type="date"
                        name="dom"
                        value={formData.dom}
                        onChange={handleChange}
                    />
                    {errors.dom && <p className={styles.error}>{errors.dom}</p>}
                </div>
                <div>
                    <label>Чи військовий:</label>
                    <input
                        type="checkbox"
                        name="isMilitary"
                        checked={formData.isMilitary}
                        onChange={handleChange}
                    />
                    {militaryWarning && (
                        <div className={styles.militaryWarning}>
                            <p>Сайт не несе відповідальності за інформацію, яка потенційно може бути використана ворогом. Будь ласка, збережіть своїх родичів/знайомих і не передавайте жодної важливої інформації, таку як: фото у військовій формі, позивний, бригада, професія, інше. Якщо ви бажаєте надати пошук для військового, рекомендуємо прочитати наступну інформацію - <a href='https://pravo-ua.com/service/operations-and-maintenance/'>клацніть тут</a></p>
                            <p>Примітка: інформація про військових не розповсюджується на сайті. Ця інформація буде заблокована для всіх відвідувачів сайту.</p>
                        </div>
                    )}
                </div>
                <div>
                    <label>Стать:</label>
                    <select required name="sex" value={formData.sex} onChange={handleChange}>
                        <option value="">Виберіть стать</option>
                        <option value="Чоловіча">Чоловіча</option>
                        <option value="Жіноча">Жіноча</option>
                    </select>
                    <span>Обов'язкове поле</span>
                    {errors.sex && <p className={styles.error}>{errors.sex}</p>}
                </div>
                <div>
                    <label>Зріст:</label>
                    <input
                        type="text"
                        name="additionInformation.height"
                        value={formData.additionInformation.height}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Тип тіла:</label>
                    <select name="additionInformation.tpBody" value={formData.additionInformation.tpBody} onChange={handleChange}>
                        <option value="">Виберіть тип тіла</option>
                        <option value="Худе">Худе</option>
                        <option value="Середнє">Середнє</option>
                        <option value="Повне">Повне</option>
                    </select>
                </div>
                <div>
                    <label>Тип зачіски:</label>
                    <select name="additionInformation.tpHairstyle" value={formData.additionInformation.tpHairstyle} onChange={handleChange}>
                        <option value="">Виберіть тип зачіски</option>
                        <option value="Коротке">Коротке</option>
                        <option value="Довге">Довге</option>
                        <option value="Кучеряве">Кучеряве</option>
                        <option value="Відсутнє">Відсутнє</option>
                    </select>
                </div>
                <div>
                    <label>Колір очей:</label>
                    <select name="additionInformation.clEyes" value={formData.additionInformation.clEyes} onChange={handleChange}>
                        <option value="">Виберіть колір очей</option>
                        <option value="Блакитні">Блакитні</option>
                        <option value="Карі">Карі</option>
                        <option value="Чорні">Чорні</option>
                        <option value="Жовті">Жовті</option>
                        <option value="Зелені">Зелені</option>
                        <option value="Кольорові">Кольорові</option>
                    </select>
                </div>
                <div>
                    <label>Тип шкіри:</label>
                    <select name="additionInformation.clSkin" value={formData.additionInformation.clSkin} onChange={handleChange}>
                        <option value="">Виберіть тип шкіри</option>
                        <option value="Світлий">Світлий</option>
                        <option value="Темний">Темний</option>
                        <option value="Дуже світлий">Дуже світлий</option>
                    </select>
                </div>
                <div>
                    <label>Колір волосся:</label>
                    <select name="additionInformation.clHair" value={formData.additionInformation.clHair} onChange={handleChange}>
                        <option value="">Виберіть колір волосся</option>
                        <option value="Коричневий">Коричневий</option>
                        <option value="Чорне">Чорне</option>
                        <option value="Руде">Руде</option>
                        <option value="Біле">Біле</option>
                        <option value="Кольорове">Кольорове</option>
                    </select>
                </div>
                <div>
                    <label>Опис тату:</label>
                    <input
                        type="text"
                        name="additionInformation.tattoo"
                        value={formData.additionInformation.tattoo}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Додаткова інформація:</label>
                    <input
                        type="text"
                        name="additionInformation.comment"
                        value={formData.additionInformation.comment}
                        onChange={handleChange}
                    />
                </div>
                <h3>Ваші дані</h3>
                <div>
                    <label>Номер телефону:</label>
                    <input
                        type="text"
                        name="user.phoneNumber"
                        value={formData.user.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    <span>Обов'язкове поле</span>
                    {errors.user && errors.user.phoneNumber && <p className={styles.error}>{errors.user.phoneNumber}</p>}
                </div>
                <div>
                    <label>Електронна пошта:</label>
                    <input
                        type="email"
                        name="user.email"
                        value={formData.user.email}
                        onChange={handleChange}
                        required
                    />
                    <span>Обов'язкове поле</span>
                    {errors.user && errors.user.email && <p className={styles.error}>{errors.user.email}</p>}
                </div>
                <button type="submit" className={styles.submitButton}>{person ? 'Змінити дані' : 'Подати запит'}</button>
                {errors.submit && <p className={styles.error}>{errors.submit}</p>}
                {successMessage && <p className={styles.success}>{successMessage}</p>}
            </form>
        </div>
    );
};

export default RequestSearchForm;
