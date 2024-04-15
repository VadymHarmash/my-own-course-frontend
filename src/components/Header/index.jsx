import React from 'react'
import styles from './header.module.scss'
import { NavLink } from 'react-router-dom'

export default function Header() {
    const navLinks = [
        { to: '', text: 'Home' },
        { to: 'statistics', text: 'Personal statistics' },
        { to: 'about', text: 'About us' },
        { to: 'support', text: 'Support and Contact' },
    ]

    return (
        <div className={styles.header}>
            <div className="container">
                <div className={styles.header__wrapper}>
                    <div className={styles.header__logo}>Techno</div>
                    <nav className={styles.header__navbar}>
                        <ul>
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink to={link.to} className={styles.header__navbar__link}>
                                        {link.text}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className={styles.header__signPanel}>
                        <button className={styles.header__signPanel__signButton}>Sign Up</button>
                        <button className={styles.header__signPanel__signButton}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
