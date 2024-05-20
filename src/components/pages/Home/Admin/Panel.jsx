import React, { useState, useContext } from 'react'
import { CoursesContext } from '../../../../context/Context'

export default function Panel({ styles }) {
    const [courseName, setCourseName] = useState('');
    const [paragraphs, setParagraphs] = useState([]);

    const coursesContext = useContext(CoursesContext)

    const addParagraph = () => {
        const newParagraphs = [...paragraphs, ""];
        setParagraphs(newParagraphs);
    };

    const handleCourseNameChange = (e) => setCourseName(e.target.value);

    const handleParagraphChange = (index, text) => {
        const newParagraphs = [...paragraphs];
        newParagraphs[index] = text;
        setParagraphs(newParagraphs);
    };

    const courseData = {
        id: coursesContext?.coursesData.length + 1,
        title: courseName,
        paragraphs: paragraphs
    };

    const createCourse = async () => {
        try {
            await fetch("/courses", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData)
            })
                .then((response) => response.json())
                .then((result) => console.log(result))
        } catch (error) {
            console.error('Error:', error)
        }

        setCourseName('')
    }

    return (
        <div className={styles.home__admin__add}>
            <div className={styles.home__admin__form}>
                <label>
                    Назва курсу:
                    <input
                        type="text"
                        value={courseName}
                        onChange={handleCourseNameChange}
                    />
                </label>
            </div>
            <div className={styles.home__admin__paragraphs}>
                {paragraphs.map((paragraph, index) => (
                    <div key={index} className={styles.home__admin__paragraph}>
                        <label>
                            Параграф {index + 1}:
                            <textarea
                                value={paragraph}
                                onChange={(e) => handleParagraphChange(index, e.target.value)}
                            />
                        </label>
                    </div>
                ))}
            </div>
            <div className={styles.buttons}>
                <button onClick={addParagraph} className={styles.home__admin__addParagraph}>Додати параграф</button>
                <button onClick={createCourse}>Створити курс</button>
            </div>
        </div>
    )
}
