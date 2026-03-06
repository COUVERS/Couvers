import React, { createContext, useContext, useMemo, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"))

    const login = (newToken) => {
    const safeToken = newToken || "temp-token"
    localStorage.setItem("token", safeToken)
    setToken(safeToken)
    }

    const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    }

    const value = useMemo(
    () => ({
        isAuthed: Boolean(token),
        token,
        login,
        logout,
    }),
    [token]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}