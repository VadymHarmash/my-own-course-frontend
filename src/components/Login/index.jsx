import React, { useState } from 'react'
import styles from './styles/index.module.scss'

export default function Login({ isSignUp, setIsSignUp, isSignIn, setIsSignIn, setIsLogin }) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const isAllFieldsFilled = () => {
        return name.trim() !== '' && surname.trim() !== '' && phone.trim() !== '' && password.trim() !== ''
    }

    const handleSignUp = () => {
        if (!isAllFieldsFilled()) {
            return
        }
        console.log(name, surname, phone, password)
        setIsSignUp(false)
        setIsLogin(false)
    }

    const handleSignIn = () => {
        if (!phone || !password) {
            return
        }
        console.log(phone, password)
        setIsSignIn(false)
        setIsLogin(false)
    }

    return (
        <div className={styles.login}>
            <div className={styles.login__wrapper}>
                {isSignUp && (
                    <div className={styles.login__content}>
                        <div className={styles.login__header}>
                            <div className={styles.login__header__text}>
                                <p>Ввійдіть або зареєструйтесь, щоб відстежувати прогрес</p>
                                <p>Заповніть всі поля</p>
                            </div>
                            <span className={styles.login__header__close} onClick={() => {
                                setIsSignUp(false);
                                setIsLogin(false);
                            }}>X</span>
                        </div>
                        <div className={styles.login__body}>
                            <label>
                                Ім'я
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label>
                                Прізвище
                                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                            </label>
                            <label>
                                Номер телефону
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </label>
                            <label>
                                Пароль
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                        </div>
                        <button onClick={handleSignUp} disabled={!isAllFieldsFilled()}>Зареєструватися</button>
                    </div>
                )}
                {isSignIn && (
                    <div className={styles.login__content}>
                        <div className={styles.login__header}>
                            <div className={styles.login__header__text}>
                                <p>Ввійдіть або зареєструйтесь, щоб відстежувати прогрес</p>
                                <p>Заповніть всі поля</p>
                            </div>
                            <span className={styles.login__header__close} onClick={() => {
                                setIsSignIn(false);
                                setIsLogin(false);
                            }}>X</span>
                        </div>
                        <div className={styles.login__body}>
                            <label>
                                Номер телефону
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </label>
                            <label>
                                Пароль
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                        </div>
                        <button onClick={handleSignIn} disabled={!phone || !password}>Увійти</button>
                    </div>
                )}
            </div>
        </div>
    );
}
