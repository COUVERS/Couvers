export async function fetchDashboardCourses(token) {
    const res = await fetch(`${API_BASE_URL}/api/dashboard/courses`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}
