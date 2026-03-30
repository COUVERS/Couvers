import { API_BASE_URL } from '../config'

export async function fetchCurrentUser(token) {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
        Authorization: `Bearer ${token}`
        }
    })

    return response.json()
}

export async function changePassword(token, currentPassword, newPassword) {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
    })

    return response.json()
}

export async function forgotPassword(email) {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })

    return response.json()
}