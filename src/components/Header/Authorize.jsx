import React, { useState, useContext, useRef, useEffect } from 'react'
import { LoginContext } from '../../context/Context'

export default function Authorize({ styles, setIsSignIn, setIsSignUp, setIsLogin }) {
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

    return (
        <>
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
        </>
    )
}
