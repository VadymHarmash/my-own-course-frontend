import React, { useEffect, useState, useContext } from 'react';
import styles from './home.module.scss';
import { CoursesContext, LoginContext } from '../../../context/Context'
import Catalog from './Catalog'
import SiteInfo from './SiteInfo'
import Admin from './admin';

export default function Home() {
    const [activeCourse, setActiveCourse] = useState(1)
    const [activeText, setActiveText] = useState(null)
    const [loading, setLoading] = useState(true)
    const [courseTitles, setCourseTitles] = useState([])

    const loginContext = useContext(LoginContext)
    const coursesContext = useContext(CoursesContext)

    useEffect(() => {
        coursesContext?.coursesInit()
    }, [])

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
                    {loginContext.loggedInUser && loginContext.loggedInUser.isAdmin === true ?
                        (
                            <Admin styles={styles} coursesContext={coursesContext} />
                        )
                        :
                        (
                            <>
                                <Catalog styles={styles} loginContext={loginContext} courseTitles={courseTitles} activeCourse={activeCourse} setActiveCourse={setActiveCourse} />
                                <SiteInfo styles={styles} loginContext={loginContext} loading={loading} activeText={activeText} activeCourse={activeCourse} />
                            </>
                        )}
                </div>
            </div>
        </div >
    );
}
