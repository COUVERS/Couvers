import { useEffect, useState } from "react"

export default function App() {
  const [courses, setCourses] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch courses");
        return res.json()
      })
      .then((data) => setCourses(data))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <main style={{ padding: 24 }}>
      <h1>Courses</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {courses.length === 0 && !error ? (
        <p>No courses yet.</p>
      ) : (
        <ul>
          {courses.map((c) => (
            <li key={c._id} style={{ marginBottom: 12 }}>
              <strong>{c.title}</strong>
              <div>{c.description}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
