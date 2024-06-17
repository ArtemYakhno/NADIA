import React, { useContext } from 'react';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './Premium.module.css';
import { CardContext } from "../store/CardContext.jsx";

export default function Premium() {
    const { activeUser } = useContext(CardContext);
    const navigate = useNavigate();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const goToTransaction = () => {
        navigate(`/transaction/${activeUser.userID}`, {
            state: {
                price: 300, // Приклад ціни
                paymentPurpose: `Преміум підписка для користувача ${activeUser.userName} ${activeUser.userLastName}`,
                from: '/premium',
                description:"Преміум підписка на платформу Надія"
            }
        });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Можливості преміум</h1>
            <Slider {...settings} className={styles.slider}>
                <div className={styles.slide}>
                    <p>Додаткова кількість запитів на пошук особи</p>
                    <p>Кількість запитів збільшена із 3 до 10</p>
                </div>
                <div className={styles.slide}>
                    <p>Додаткова кількість запитів на допомогу різного типу</p>
                    <p>Кількість запитів на кожен тип допомоги збільшена із 3 до 10</p>
                </div>
                <div className={styles.slide}>
                    <p>Пріоритетність у відповіді техпідтримки</p>
                    <p>Наша підтримка відповість вам протягом 10 хвилин у робочі години</p>
                </div>
            </Slider>
            <br/>

            <div className={styles.buttonContainer}>
                {activeUser.isPremium ? (
                    <button className={`${styles.button} ${styles.disabledButton}`} disabled>Ви вже придбали підписку</button>
                ) : (
                    <button className={`${styles.button} ${styles.gradientButton}`} onClick={goToTransaction}>Придбати підписку</button>
                )}
            </div>
        </div>
    );
}
