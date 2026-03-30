import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fetchCurrentUser, changePassword, forgotPassword } from './authApi.js'

vi.mock('../config', () => ({
    API_BASE_URL: 'http://localhost:5050'
}))

describe('authApi', () => {
    beforeEach(() => {
        global.fetch = vi.fn()
    })

    it('fetchCurrentUser calls /auth/me with Bearer token', async () => {
        global.fetch.mockResolvedValue({
        json: async () => ({ email: 'bella@test.com' })
    })

    const data = await fetchCurrentUser('abc123')

    expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5050/auth/me',
        {
            headers: {
            Authorization: 'Bearer abc123'
            }
        }
    )

    expect(data.email).toBe('bella@test.com')
    })

    it('changePassword sends POST request with JSON and token', async () => {
        global.fetch.mockResolvedValue({
        json: async () => ({ message: 'Password changed successfully' })
        })

    const data = await changePassword('abc123', 'oldpass', 'newpass123')

    expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5050/auth/change-password',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer abc123'
            },
            body: JSON.stringify({
            currentPassword: 'oldpass',
            newPassword: 'newpass123'
            })
        }
    )

    expect(data.message).toBe('Password changed successfully')
    })

    it('forgotPassword sends POST request with email', async () => {
        global.fetch.mockResolvedValue({
        json: async () => ({ message: 'Reset link sent' })
        })

    const data = await forgotPassword('bella@test.com')

    expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5050/auth/forgot-password',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: 'bella@test.com' })
        }
    )

    expect(data.message).toBe('Reset link sent')
    })
})