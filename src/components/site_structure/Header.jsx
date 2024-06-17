import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { CardContext } from '../store/CardContext.jsx';
import styles from './Header.module.css';

const Header = () => {
    const { isTokenValid, activeUser, setActiveUser, setIsTokenValid } = useContext(CardContext);

    function logOut() {
        setActiveUser(null);
        setIsTokenValid(false);
    }

    const accountPossibility = isTokenValid ? (
        <div className={styles.userDropdown}>
            <div className={`${styles.dropbtn} ${styles.UserAuth} ${styles.gradientText}`}>{activeUser.userName}</div>
            <div className={styles.dropdownContent}>
                <Link to="/my-contributions">Мій внесок</Link>
                <Link to="/my-requests">Мої запити</Link>
                <Link to="/premium">Придбати підписку</Link>
                <Link to="/account">Мій обліковий запис</Link>
                <Link to="/technical-support">Технічна підтримка</Link>
                <Link to="/" onClick={logOut}>Вийти</Link>
            </div>
        </div>
    ) : (
        <Link to="/authorization" className={`${styles.accountAuthorization} ${styles.UserAuth} ${styles.gradientText}`}>Увійти</Link>
    );

    const moderatorPossibility = isTokenValid && activeUser.isPremium ? (
        <div className={styles.userDropdown}>
            <div className={styles.dropbtn}>Модерація</div>
            <div className={styles.dropdownContent}>
                <Link to="/moderator-request-search">Запити на розшук</Link>
                <Link to="/moderator-request-help">Запити на допомогу</Link>
                <Link to="/moderator-technical-support">Запитання користувачів</Link>
            </div>
        </div>
    ) : null;

    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <Link to="/" className={styles.logo}>Надія</Link>
                <nav className={styles.nav}>
                    <Link to="/search/1" className={styles.navLink}>Пошук</Link>
                    <Link to="/help/1" className={styles.navLink}>Допомога</Link>
                    <div className={styles.dropdown}>
                        <div className={styles.dropbtn}>Подати запит</div>
                        <div className={styles.dropdownContent}>
                            <Link to="/request-help">Подати запит на допомогу</Link>
                            <Link to="/request-search">Подати запит на пошук особи</Link>
                        </div>
                    </div>
                </nav>
            </div>
            <div className={styles.headerRight}>
                {moderatorPossibility}
                {accountPossibility}
            </div>
        </header>
    );
};

export default Header;
