import React, { useState } from 'react';

export default function ChangingModal({ styles, course, handleCloseModal }) {
    const [paragraphs, setParagraphs] = useState(course.paragraphs);

    const handleParagraphChange = (index, event) => {
        const updatedParagraphs = [...paragraphs]
        updatedParagraphs[index] = event.target.value
        setParagraphs(updatedParagraphs)
    }

    const changeText = async() => {
        try {
            const response = await fetch(`http://localhost:5000/courses/${course._id}/paragraphs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paragraphs: paragraphs })
            });
    
            if (response.ok) {
                const updatedCourse = await response.json();
                console.log('Course updated:', updatedCourse);
                handleCloseModal();
            } else {
                console.error('Error updating course:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating course:', error);
        }
        handleCloseModal()
    }

    return (
        <>
            <div className={styles.modal__body}>
                {paragraphs.map((paragraph, index) => (
                    <textarea
                        key={index}
                        value={paragraph}
                        onChange={(event) => handleParagraphChange(index, event)}
                    />
                ))}
                <button className={styles.modal__body__submit} onClick={changeText}>Змінити</button>
            </div>
        </>
    );
}
