import React, { useContext, useState } from 'react'
import { CoursesContext } from '../../../../context/Context'
import ChangingModal from './ChangingModal'

export default function List({ styles }) {
    const coursesContext = useContext(CoursesContext)
    const [selectedCourse, setSelectedCourse] = useState(null)

    const handleDeleteCourse = (courseId) => {
        fetch(`/courses/${courseId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Course deleted successfully') {
                    coursesContext.setCoursesData(prevCourses => prevCourses.filter(course => course.id !== courseId))
                } else {
                    console.error('Error deleting course:', data.error)
                }
            })
            .catch(error => {
                console.error('Error deleting course:', error)
            })
    }

    const handleEditCourse = (course) => {
        setSelectedCourse(course)
    }

    const handleCloseModal = () => {
        setSelectedCourse(null)
    }

    return (
        <>
            <table className={styles.home__admin__coursesList}>
                <thead>
                    <tr>
                        <th>Назва курсу</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {coursesContext.coursesData.map((course) => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td className={styles.buttons}>
                                <button onClick={() => handleDeleteCourse(course._id)}>Видалити</button>
                                <button onClick={() => handleEditCourse(course)}>Редагувати</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedCourse && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={handleCloseModal}>Закрити</button>
                    </div>
                    <ChangingModal course={selectedCourse} />
                </div>
            )}
        </>
    )
}
