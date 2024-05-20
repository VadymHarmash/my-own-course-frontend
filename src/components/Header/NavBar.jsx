import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar({ styles }) {
    const navLinks = [
        { to: '', text: 'Головна сторінка' },
        { to: 'statistics', text: 'Статистика' },
        { to: 'about', text: 'Про нас' },
        { to: 'support', text: 'Підтримка і контакти' },
    ]

    return (
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
    )
}
