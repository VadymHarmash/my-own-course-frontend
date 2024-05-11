import React, { useEffect, useState, useContext } from 'react';
import styles from './home.module.scss';
import { CoursesContext, LoginContext } from '../../../context/Context'

export default function Home() {
    const [activeCourse, setActiveCourse] = useState(1)
    const [activeText, setActiveText] = useState(null)
    const [loading, setLoading] = useState(true)
    const [courseTitles, setCourseTitles] = useState([])

    const loginContext = useContext(LoginContext)
    const coursesContext = useContext(CoursesContext)

    useEffect(() => {
        coursesContext?.coursesInit()
    }, [coursesContext])

    useEffect(() => {
        const foundText = coursesContext.coursesData && coursesContext.coursesData.find((item) => item.id === activeCourse);
        setActiveText(foundText);
        setLoading(false);
        setCourseTitles(coursesContext.coursesData && coursesContext.coursesData.map(course => course.title));
    }, [activeCourse, coursesContext.coursesData])

    return (
        <div className={styles.home}>
            <div className="container">
                <div className={styles.home__wrapper}>
                    <nav className={styles.home__catalog}>
                        {loginContext.isLoggedIn ?
                            (
                                <ul>
                                    {courseTitles.map((title, index) => {
                                        const courseId = index + 1;
                                        const isCompleted = loginContext.isLoggedIn && loginContext.loggedInUser.completedCourses.includes(courseId);
                                        return (
                                            <li
                                                key={index}
                                                className={`${index + 1 === activeCourse ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
                                                onClick={() => setActiveCourse(courseId)}
                                            >
                                                {index + 1}. {title}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )
                            :
                            (
                                <p className={styles.home__catalog__message}>Будь ласка, увійдіть у ваш обліковий запис, щоб почати навчання</p>
                            )
                        }
                    </nav>
                    <div className={styles.home__siteInfo__container}>
                        {loginContext.isLoggedIn ?
                            (
                                loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <>
                                        {activeText ? (
                                            <>
                                                <h1>{activeText.title}</h1>
                                                <p>Вміст ...</p>
                                            </>
                                        ) : (
                                            <p>No text found for this course.</p>
                                        )}
                                    </>
                                )
                            )
                            :
                            (
                                <h1 className={styles.home__siteInfo__message}>Будь ласка, увійдіть у ваш обліковий запис, щоб почати навчання</h1>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
