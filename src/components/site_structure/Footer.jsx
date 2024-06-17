import { Link } from "react-router-dom";
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLinks}>
                <Link to="/technical-support" className={styles.link}>Технічна підтримка</Link>
                <a href="https://t.me/micta" className={styles.link}>Зв'язатися із розробником</a>
                <a href='' className={styles.link}>Ліцензійна угода</a>
                <a href='' className={styles.link}>Підтримати розробника</a>
                <p className={styles.logo}>Надія</p>
            </div>
            <p className={styles.copyright}>© 2024 Надія. Всі права захищені.</p>
        </footer>
    );
};

export default Footer;
