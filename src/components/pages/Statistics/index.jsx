import React, { useContext } from 'react'
import styles from './styles/index.module.scss'
import { LoginContext, CoursesContext } from './../../../context/Context'

export default function Statistics() {
    const loginContext = useContext(LoginContext)
    const coursesContext = useContext(CoursesContext)
    return (
        <div className={styles.statistics}>
            <div className="container">
                <div className={styles.statistics__wrapper}>
                    <div className={styles.statistics__name}>
                        <h2>Name Surname</h2>
                    </div>
                    <div className={styles.statistics__progress}>
                        {loginContext.isLoggedIn ?
                            (
                                <span>Курсів пройдено: {loginContext.loggedInUser && loginContext.loggedInUser.completedCourses.length}/{coursesContext.coursesData && coursesContext.coursesData.length}</span>
                            )
                            :
                            (
                                <p>Будь ласка, увійдіть у ваш обліковий запис, щоб побачити статистику</p>
                            )
                        }

                        <span>Поточний курс: </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
