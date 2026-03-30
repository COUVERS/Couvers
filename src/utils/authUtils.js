export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isCorporateEmail(email) {
    return (
        email.endsWith('@codyacademy.edu') ||
        email.endsWith('@tete.edu')
    )
}