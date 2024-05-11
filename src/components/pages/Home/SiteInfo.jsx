import React from 'react';

export default function SiteInfo({ styles, loginContext, loading, activeText, activeCourse }) {
    const completeCourse = () => {
        if (loginContext.isLoggedIn && activeCourse && !loginContext.loggedInUser.completedCourses.includes(activeCourse)) {
            const updatedCompletedCourses = [...loginContext.loggedInUser.completedCourses, activeCourse];
            loginContext.setLoggedUser({
                ...loginContext.loggedInUser,
                completedCourses: updatedCompletedCourses
            });
        }
    };

    return (
        <div className={styles.home__siteInfo__container}>
            {loginContext.isLoggedIn ? (
                loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {activeText ? (
                            <>
                                <h1>{activeText.title}</h1>
                                <p>Вміст ...</p>
                                {loginContext.loggedInUser.completedCourses.includes(activeCourse) ? (
                                    <p>Цей курс вже пройдено.</p>
                                ) : (
                                    <button onClick={completeCourse}>Завершити курс</button>
                                )}
                            </>
                        ) : (
                            <p>No text found for this course.</p>
                        )}
                    </>
                )
            ) : (
                <h1 className={styles.home__siteInfo__message}>Будь ласка, увійдіть у ваш обліковий запис, щоб почати навчання</h1>
            )}
        </div>
    );
}
