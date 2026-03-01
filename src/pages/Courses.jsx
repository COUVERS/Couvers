import { useEffect, useState } from "react"

export default function Course() {
    const [courses, setCourses] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        ; (async () => {
            try {
                const res = await fetch("/api/courses")
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data = await res.json()
                setCourses(data)
            } catch (e) {
                setError(e.message)
            }
        })()
    }, [])

    return (
        <div style={{ padding: 16 }}>
            <h1>Courses</h1>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <ul>
                {courses.map((c) => (
                    <li key={c._id} style={{ marginBottom: 12 }}>
                        <strong>{c.title}</strong>
                        <div>{c.description}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}