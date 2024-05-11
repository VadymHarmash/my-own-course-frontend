import React, { createContext, useState } from 'react'

export const LoginContext = createContext(null)
export const CoursesContext = createContext(null)

export default function Context({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [coursesData, setCoursesData] = useState([])

    // login Context

    const login = () => {
        setIsLoggedIn(true)
    }

    const logout = () => {
        setIsLoggedIn(false)
    }

    const setLoggedUser = (user) => {
        setLoggedInUser(user)
    }

    const loginValue = {
        login,
        logout,
        isLoggedIn,
        setLoggedUser,
        loggedInUser
    }

    // courses Context

    const coursesInit = () => {
        fetch("/courses", {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a, b) => a.id - b.id)
                setCoursesData(sortedData)
            })
    }

    const coursesValue = {
        coursesInit,
        coursesData
    }

    return (
        <CoursesContext.Provider value={coursesValue}>
            <LoginContext.Provider value={loginValue}>
                {children}
            </LoginContext.Provider>
        </CoursesContext.Provider>
    )
}