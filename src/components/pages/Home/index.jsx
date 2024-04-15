import React, { useState } from 'react';
import styles from './home.module.scss';
import { courses } from './courses';
import { texts } from './texts';

export default function Home() {
    const [activeCourse, setActiveCourse] = useState(1);

    const activeText = activeCourse ? texts.find((text) => text.id === activeCourse) : null;

    return (
        <div className={styles.home}>
            <div className="container">
                <div className={styles.home__wrapper}>
                    <nav className={styles.home__catalog}>
                        <ul>
                            {courses.map((course) => (
                                <li
                                    key={course.id}
                                    className={course.id === activeCourse ? styles.active : ''}
                                    onClick={() => setActiveCourse(course.id)}
                                >
                                    {course.id}. {course.name}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className={styles.home__siteInfo__container}>
                        {activeText && (
                            <>
                                <h1>{activeText.title}</h1>
                                <p>Вміст ...</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
