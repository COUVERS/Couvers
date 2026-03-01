import { useState } from "react"
import Navigation from './components/Navigation'
import Course from './pages/Courses'

function App() {
  const [page, setPage] = useState("home")
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Navigation page={page} setPage={setPage} />
      <main style={{ flex: 1, padding: 16 }}>
        {page === "home" && <div style={{ padding: 16 }}><h1>Home</h1></div>}
        {page === "courses" && <Course />}
      </main>
    </div >
  )
}

export default App
