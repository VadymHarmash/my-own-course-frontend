import React, { useState } from 'react'
import styles from './header.module.scss'
import Login from '../Login'
import NavBar from './NavBar'
import Authorize from './Authorize'

export default function Header() {
    const [isLogin, setIsLogin] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [isSignIn, setIsSignIn] = useState(false)
    
    return (
        <div className={styles.header}>
            <div className="container">
                <div className={styles.header__wrapper}>
                    <div className={styles.header__logo}>Techno</div>
                    <NavBar styles={styles} />
                    <Authorize styles={styles} setIsSignIn={setIsSignIn} setIsSignUp={setIsSignIn} setIsLogin={setIsLogin} />
                </div>
            </div>
            {isLogin && <Login isSignUp={isSignUp} setIsSignUp={setIsSignUp} isSignIn={isSignIn} setIsSignIn={setIsSignIn} setIsLogin={setIsLogin} />}
        </div >
    )
}
