import React from 'react'

export default function Catalog({ styles, loginContext, courseTitles, activeCourse, setActiveCourse }) {
    return (
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
    )
}
