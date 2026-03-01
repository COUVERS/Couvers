import { useEffect, useState } from "react"
import FundamentalOfTeaching from "../assets/icons/FundamentalOfTeaching"

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

    // const courseIcons = [
    //     { text: "FundamentalOfTeaching", icon: <FundamentalOfTeaching /> },
    // ]
    return (
        <div style={{ padding: 16 }}>
            <h1>Courses</h1>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <ul>
                {courses.map((c) => (
                    <li key={c._id} style={{ marginBottom: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <FundamentalOfTeaching size={24} />
                            <strong>{c.title}</strong>
                        </div>
                        <div>{c.description}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}