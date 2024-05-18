import React, { useContext } from 'react'
import { CoursesContext } from '../../../../context/Context'

export default function List({ styles }) {
    const coursesContext = useContext(CoursesContext)

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

    return (
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
                        <td>
                            <button
                                onClick={() => handleDeleteCourse(course._id)}
                                className={styles.deleteButton}
                            >
                                Видалити
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
