import { describe, it, expect } from 'vitest'
import { isValidEmail, isCorporateEmail } from './authUtils.js'

describe('isValidEmail', () => {
    it('returns true for valid email', () => {
        expect(isValidEmail('test@test.com')).toBe(true)
    })

    it('returns false for invalid email', () => {
        expect(isValidEmail('test')).toBe(false)
    })
})

describe('isCorporateEmail', () => {
    it('returns true for allowed domains', () => {
        expect(isCorporateEmail('user@codyacademy.edu')).toBe(true)
        expect(isCorporateEmail('user@tete.edu')).toBe(true)
    })

    it('returns false for other domains', () => {
        expect(isCorporateEmail('user@gmail.com')).toBe(false)
    })
})