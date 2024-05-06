import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';

export default function Home() {
    const [activeCourse, setActiveCourse] = useState(1);
    const [activeText, setActiveText] = useState(null);
    const [loading, setLoading] = useState(true);
    const [courseTitles, setCourseTitles] = useState([]);
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("/courses", {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => setData(data))
    }, [])

    useEffect(() => {
        const foundText = data && data.find((item) => item.id === activeCourse);
        setActiveText(foundText);
        setLoading(false);
        setCourseTitles(data && data.map(course => course.title));
    }, [activeCourse, data])

return (
    <div className={styles.home}>
        <div className="container">
            <div className={styles.home__wrapper}>
                <nav className={styles.home__catalog}>
                    <ul>
                        {courseTitles.map((title, index) => (
                            <li
                                key={index}
                                className={index + 1 === activeCourse ? styles.active : ''}
                                onClick={() => setActiveCourse(index + 1)}
                            >
                                {index + 1}. {title}
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className={styles.home__siteInfo__container}>
                    {loading ? (
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
                    )}
                </div>
            </div>
        </div>
    </div>
);
}
