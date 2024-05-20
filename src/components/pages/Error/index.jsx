import React from 'react'
import styles from './styles/index.module.scss'

export default function Error() {
    return (
        <div className={styles.error}>
            <h1>Упс.. сталась помилка</h1>
            <h3>Сторінки за даним маршрутом не існує</h3>
        </div>
    )
}
