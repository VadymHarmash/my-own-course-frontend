import React, { useContext } from 'react';
import styles from './styles/index.module.scss';
import { LoginContext, CoursesContext } from '../../../context/Context';

export default function Statistics() {
    const loginContext = useContext(LoginContext);
    const coursesContext = useContext(CoursesContext);

    return (
        <div className={styles.statistics}>
            <div className="container">
                <div className={styles.statistics__wrapper}>
                    {loginContext.isLoggedIn ? (
                        <>
                            <div className={styles.statistics__name}>
                                <h2>{loginContext.loggedInUser && loginContext.loggedInUser.name}</h2>
                            </div>
                            <div className={styles.statistics__progress}>
                                <span>
                                    Курсів пройдено: {loginContext.loggedInUser.completedCourses.length}/{coursesContext.coursesData.length}
                                </span>
                            </div>
                        </>
                    ) : (
                        <p>Будь ласка, увійдіть у ваш обліковий запис, щоб побачити статистику</p>
                    )}
                </div>
            </div>
        </div>
    );
}
