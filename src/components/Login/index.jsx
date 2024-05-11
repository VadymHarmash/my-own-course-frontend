import React, { useContext, useState } from 'react'
import styles from './styles/index.module.scss'
import { LoginContext } from '../../context/Context'

export default function Login({ isSignUp, setIsSignUp, isSignIn, setIsSignIn, setIsLogin }) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const loginContext = useContext(LoginContext)

    const isAllFieldsFilled = () => {
        return name.trim() !== '' && surname.trim() !== '' && phone.trim() !== '' && password.trim() !== ''
    }

    const userData = {
        name: name,
        password: password,
        mobile: phone,
        isAdmin: false,
        completedCourses: []
    }

    const handleSignUp = async () => {
        if (!isAllFieldsFilled()) {
            return
        }
        try {
            await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
                .then((response) => response.json())
                .then((result) => console.log(result))
        } catch (error) {
            console.error('Error:', error)
        }
        setIsSignUp(false)
        setIsLogin(false)
    }

    const handleSignIn = async () => {
        if (!phone || !password) {
            return;
        }
        try {
            await fetch("http://localhost:5000/users", {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                    const user = data.find((user) => user.password === password && user.mobile === phone);
                    if (user) {
                        loginContext.login()
                        loginContext.setLoggedUser(user)
                        setErrorMessage('')
                        setIsSignIn(false)
                        setIsLogin(false)
                    } else {
                        setErrorMessage('Невірний номер телефону або пароль')
                    }
                });
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Помилка під час входу');
        }
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
                        <form onSubmit={handleSignUp} className={styles.login__body}>
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
                            <button type='submit' disabled={!isAllFieldsFilled()}>Зареєструватися</button>
                        </form>
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
                            {/* <span>Некоректний номер телефону</span> */}
                            <label>
                                Пароль
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                            {errorMessage && (
                                <div className={styles.error}>{errorMessage}</div>
                            )}
                            {/* <span>Некоректний пароль</span> */}
                        </div>
                        <button onClick={handleSignIn} disabled={!phone || !password}>Увійти</button>
                    </div>
                )}
            </div>
        </div>
    );
}
