import React, { createContext, useState } from 'react'

export const LoginContext = createContext(null)

export default function Context({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState(null)

    const login = () => {
        setIsLoggedIn(true)
    }

    const logout = () => {
        setIsLoggedIn(false)
    }

    const setLoggedUser = (user) => {
        setLoggedInUser(user)
    }

    const value = {
        login,
        logout,
        isLoggedIn,
        setLoggedUser,
        loggedInUser
    }

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    )
}