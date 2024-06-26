import React from 'react';

export default function SiteInfo({ styles, loginContext, loading, activeText, activeCourse }) {
    const completeCourse = async () => {
        const response = await fetch(`http://localhost:5000/users/${loginContext.loggedInUser._id}/completedCourses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseId: activeCourse })
        });

        if (response.ok) {
            const updatedUser = await response.json()
            loginContext.setLoggedUser(updatedUser)
            console.log(updatedUser)
        } else {
            console.error('Error in course completing')
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
                                <div className={styles.home__siteInfo__paragraphs}>
                                    {activeText.paragraphs.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                                {loginContext.loggedInUser.completedCourses.includes(activeCourse) ? (
                                    <p>Цей курс вже пройдено.</p>
                                ) : (
                                    <>
                                        {activeText.testQuestions && activeText.testsAnswers && activeText.testQuestions.map((testQuestion, index) => (
                                            <div key={index}>
                                                <p>{testQuestion}</p>
                                                {activeText.testsAnswers[index] && activeText.testsAnswers.map((testsAnswer, answerIndex) => (
                                                    <label key={answerIndex}>
                                                        <input type="radio" name={`answer_${index}`} value={testsAnswer} />
                                                        {testsAnswer}
                                                    </label>
                                                ))}
                                            </div>
                                        ))}
                                        <button onClick={completeCourse}>Завершити курс</button>
                                    </>
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