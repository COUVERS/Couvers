import { useEffect, useState } from "react"
import { Box, Typography, Button } from "@mui/material"
import { API_BASE_URL } from "../../config"
import CertificateItem from "../reusable-ui/CertificateItem"

export default function CertificateCard({ onTakeCourse }) {
    const [certificates, setCertificates] = useState([])
    const [totalCourses, setTotalCourses] = useState(0)
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadCertificates() {
            try {
                setError("")
                const token = localStorage.getItem("token")

                const res = await fetch(`${API_BASE_URL}/api/dashboard/certificates`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!res.ok) throw new Error(`Failed (${res.status})`)

                const data = await res.json()

                setCertificates(data.certificates || [])
                setTotalCourses(data.totalCourses || 0)

            } catch (e) {
                console.error("loadCertificates error:", e)
                setError(e.message || "Failed to load certificates")
            }
        }

        loadCertificates()
    }, [])

    let viewState = "none"

    if (certificates.length > 0 && certificates.length < totalCourses) {
        viewState = "several"
    } else if (totalCourses > 0 && certificates.length === totalCourses) {
        viewState = "all"
    }

    return (
        <Box>

            <Typography variant="h5">
                Certifications
            </Typography>

            {error && (
                <Typography color="error">
                    {error}
                </Typography>
            )}

            {/* NONE */}
            {viewState === "none" && (
                <Box>
                    <Typography>
                        Prove your skills. Get certified.
                    </Typography>

                    <Button onClick={onTakeCourse}>
                        Take a Course
                    </Button>
                </Box>
            )}

            {/* SEVERAL / ALL */}
            {viewState !== "none" && (
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        overflowX: "auto",
                        mt: 2
                    }}
                >
                    {certificates.map((item) => (
                        <CertificateItem
                            key={item.certificateId}
                            title={item.title}
                            iconKey={item.iconKey}
                            fileUrl={item.fileUrl}
                        />
                    ))}
                </Box>
            )}

        </Box>
    )
}