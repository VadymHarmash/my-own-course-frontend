import React, { useState, useContext, useRef, useEffect } from 'react'
import styles from './header.module.scss'
import { NavLink } from 'react-router-dom'
import Login from '../Login'
import { LoginContext } from '../../context/Context'

export default function Header() {
    const [isLogin, setIsLogin] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [isSignIn, setIsSignIn] = useState(false)
    const [isLogoutCalled, setIsLogoutCalled] = useState(false)

    const loginContext = useContext(LoginContext)

    const logoutRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (logoutRef.current && !logoutRef.current.contains(event.target)) {
                setIsLogoutCalled(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const navLinks = [
        { to: '', text: 'Головна сторінка' },
        { to: 'statistics', text: 'Статистика' },
        { to: 'about', text: 'Про нас' },
        { to: 'support', text: 'Підтримка і контакти' },
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
                    {loginContext.isLoggedIn ?
                        (
                            <div className={styles.header__username}>
                                <p className={styles.header__username__name} onClick={() => setIsLogoutCalled(true)}>{loginContext.loggedInUser.name}</p>
                                {isLogoutCalled && 
                                    <div onClick={() => {
                                        loginContext.logout()
                                        setIsLogoutCalled(false)
                                    }} ref={logoutRef} className={styles.header__username__logoutButton}>Вийти</div>
                                }
                            </div>
                        )
                        :
                        (
                            <div className={styles.header__signPanel}>
                                <button className={styles.header__signPanel__signButton} onClick={() => {
                                    setIsSignUp(true)
                                    setIsLogin(true)
                                }}>Реєстрація</button>
                                <button className={styles.header__signPanel__signButton} onClick={() => {
                                    setIsSignIn(true)
                                    setIsLogin(true)
                                }}>Ввійти</button>
                            </div>
                        )
                    }
                </div>
            </div>
            {isLogin && <Login isSignUp={isSignUp} setIsSignUp={setIsSignUp} isSignIn={isSignIn} setIsSignIn={setIsSignIn} setIsLogin={setIsLogin} />}
        </div >
    )
}
