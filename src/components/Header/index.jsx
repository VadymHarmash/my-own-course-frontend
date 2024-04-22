import React, { useState } from 'react'
import styles from './header.module.scss'
import { NavLink } from 'react-router-dom'
import Login from '../Login'

export default function Header() {
    const [isLogin, setIsLogin] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [isSignIn, setIsSignIn] = useState(false)

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
                        <button className={styles.header__signPanel__signButton} onClick={() => {
                            setIsSignUp(true)
                            setIsLogin(true)
                        }}>Sign Up</button>
                        <button className={styles.header__signPanel__signButton} onClick={() => {
                            setIsSignIn(true)
                            setIsLogin(true)
                        }}>Sign In</button>
                    </div>
                </div>
            </div>
            {isLogin && <Login isSignUp={isSignUp} setIsSignUp={setIsSignUp} isSignIn={isSignIn} setIsSignIn={setIsSignIn} setIsLogin={setIsLogin} />}
        </div>
    )
}
