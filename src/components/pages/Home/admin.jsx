import React, { useState } from 'react';

export default function Admin({ styles, coursesContext }) {
    const [courseName, setCourseName] = useState('');
    const [paragraphs, setParagraphs] = useState([]);

    const addParagraph = () => {
        const newParagraphs = [...paragraphs, ""];
        setParagraphs(newParagraphs);
    };

    const handleCourseNameChange = (e) => {
        setCourseName(e.target.value);
    };

    const handleParagraphChange = (index, text) => {
        const newParagraphs = [...paragraphs];
        newParagraphs[index] = text;
        setParagraphs(newParagraphs);
    };

    const courseData = {
        id: coursesContext?.coursesData.length + 1,
        title: courseName
    }

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
        <div className={styles.home__admin}>
            <table className={styles.home__admin__table}>
                <tbody>
                    <tr>
                        <td>Назва курсу</td>
                        <td>
                            <input 
                                type="text"
                                value={courseName}
                                onChange={handleCourseNameChange}
                            />
                        </td>
                    </tr>
                    {paragraphs.map((paragraph, index) => (
                        <tr key={index}>
                            <td>Параграф {index + 1}</td>
                            <td>
                                <textarea
                                    type="text"
                                    value={paragraph}
                                    onChange={(e) => handleParagraphChange(index, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={addParagraph} className={styles.home__admin__addParagraph}>Додати параграф</button>
            <button onClick={createCourse}>Створити курс</button>
        </div>
    );
}
