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
        // localStorage.removeItem('loggedInUser')
    }

    // const checkLoggedUser = () => {
    //     const loggedInUser = localStorage.getItem('loggedInUser');
    //     if (loggedInUser) {
    //         const user = JSON.parse(loggedInUser)
    //         login()
    //         setLoggedUser(user)
    //     }
    // }

    const setLoggedUser = (user) => {
        setLoggedInUser(user);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    }

    const loginValue = {
        login,
        logout,
        isLoggedIn,
        setLoggedUser,
        loggedInUser,
        // checkLoggedUser
    }
    // courses Context

    const coursesInit = async () => {
        try {
            const response = await fetch("/courses", {
                method: "GET"
            });
            const data = await response.json();
            const sortedData = data.sort((a, b) => a.id - b.id);
            setCoursesData(sortedData);
        } catch (error) {
            console.error(error);
        }
    };

    const coursesValue = {
        coursesInit,
        coursesData,
        setCoursesData
    }

    return (
        <CoursesContext.Provider value={coursesValue}>
            <LoginContext.Provider value={loginValue}>
                {children}
            </LoginContext.Provider>
        </CoursesContext.Provider>
    )
}