import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/Authcontext"

export default function ProtectedRoute({ children }) {
    const auth = useAuth()

    if (!auth) {
    return <div>Loading auth...</div>
    }

    if (!auth.isAuthed) {
    return <Navigate to="/login" replace />
    }
    return children
}