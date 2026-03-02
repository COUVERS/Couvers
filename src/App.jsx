import { useState } from "react"
import Navigation from './components/Navigation'
import Course from './pages/Course'
import CourseNavigation from './components/CourseNavigation'

function App() {
  const [page, setPage] = useState("home")
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      <Navigation
        page={page}
        setPage={setPage}
        forceCollapsed={page === "courses"} 
      />

      {page === "courses" && <CourseNavigation />}

      <main style={{ flex: 1, padding: 16 }}>
        {page === "home" && <h1>Home</h1>}
        {page === "courses" && <Course />}
      </main>

    </div>
  )
}

export default App
