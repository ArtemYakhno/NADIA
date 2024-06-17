import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './MainSection.module.css';

const MainSection = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,      // Автоматична зміна слайдів
        autoplaySpeed: 5000, // Зміна слайдів кожні 5 секунд (5000 мілісекунд)
    };

    return (
        <main className={styles.main}>
          <br/>
            <br/>

            <div className={styles.sliderContainer}>
                <Slider {...settings}>
                    <div className={styles.slide}>
                        <img
                            src="https://i.obozrevatel.com/news/2020/11/2/pochemu-nelzya-tryasti-rebenka-moz.jpg?size=1944x924"
                            alt="Mother and child"/>
                        <h2>Твоя допомога потрібна прямо зараз!</h2>
                        <Link to="/help" className={styles.button}>Допомогти зараз</Link>
                    </div>
                    <div className={styles.slide}>
                        <img
                            src="https://cdn.pixabay.com/photo/2016/07/14/17/27/family-1517192_960_720.jpg"
                            alt="Grandparents"/>
                        <h2>Родичі шукають своїх близьких! Допоможи і ти!</h2>
                        <Link to="/search/page=1" className={styles.button}>Допомогти знайти</Link>
                    </div>
                    <div className={styles.slide}>
                        <img src="https://gmk.center/wp-content/uploads/2023/01/shutterstock_2130989432-1.png"
                             alt="Hands"/>
                        <h2>Потрібна допомога? Подай запит і очікуй!</h2>
                        <Link to="/request-help" className={styles.button}>Подати запит на допомогу</Link>
                    </div>
                    <div className={styles.slide}>
                        <img
                            src="https://dprda.dp.gov.ua/storage/app/uploads/public/612/c90/e15/612c90e15b053619327367.jpg"
                            alt="Missing person"/>
                        <h2>Зник ваш родич чи знайомий? Подайте запит на розшук!</h2>
                        <Link to="/request-search" className={styles.button}>Подати запит на розшук</Link>
                    </div>
                </Slider>
            </div>
            <br/>
            <br/>
            <h2 className={styles.agitation}>Ми працюємо із настпуними організаціями!</h2>
            <div className={styles.sliderContainer}>
                <Slider {...settings}>
                    <div className={styles.slide}
                         onClick={() => window.location.href = 'https://prytulafoundation.org/'}>
                        <p className={styles.gradientText}>Фонд Сергія Притули</p>
                    </div>
                    <div className={styles.slide} onClick={() => window.location.href = 'https://savelife.in.ua/'}>
                        <p className={styles.gradientText}>Повернись живим</p>
                    </div>
                    <div className={styles.slide} onClick={() => window.location.href = 'https://savelife.in.ua/'}>
                        <p className={styles.gradientText}>Твоя опора</p>
                    </div>
                    <div className={styles.slide} onClick={() => window.location.href = 'https://savelife.in.ua/'}>
                        <p className={styles.gradientText}>Життєлюб</p>
                    </div>
                </Slider>
            </div>
            <br/>
            <br/>

            <section className={styles.platformGoal}>
                <h2 className={styles.agitation}>Наша мета</h2>
                <p>{'Платформа "Надія" створена для зв\'язування людей, які потребують допомоги, з тими, хто готовий її надати.'}</p>
                <p>Це про створення надійного середовище для взаємопідтримки та сприяти швидкому реагуванню на запити
                    про допомогу або пошук зниклих осіб.</p>
            </section>
        </main>
    );
};

export default MainSection;
