import React from 'react'
import styles from './styles/index.module.scss'

export default function Statistics() {
    return (
        <div className={styles.statistics}>
            <div className="container">
                <div className={styles.statistics__wrapper}>
                    <div className={styles.statistics__name}>
                        <h2>Name Surname</h2>
                    </div>
                    <div className={styles.statistics__progress}>
                        <span>Курсів пройдено: 2/11</span>
                        <span>Поточний курс: </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
