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

                const sortedCertificates = [...(data.certificates || [])].sort(
                    (a, b) => new Date(b.issuedAt) - new Date(a.issuedAt)
                )

                setCertificates(sortedCertificates)
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
        <Box
            sx={{
                display: "flex",
                padding: "40px 32px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "24px",
                alignSelf: "stretch",
                borderRadius: "var(--md, 8px)",
                background: "var(--Color-Background-Paper, #FFF)",
            }}
        >
            <Typography
                sx={{
                    fontSize: "var(--FontSize-Headings-h2)",
                    fontWeight: 600,
                    letterSpacing: "-0.2px",
                }}
            >
                Certifications
            </Typography>

            {error && (
                <Typography color="error">
                    {error}
                </Typography>
            )}

            {viewState === "none" && (
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "24px",
                    }}
                >
                    <Typography>
                        Prove your skills. Get certified.
                    </Typography>

                    <Button
                        variant="outlined"
                        size="large"
                        onClick={onTakeCourse}
                        sx={{
                            height: 48,
                        }}
                    >
                        Take a Course
                    </Button>
                </Box>
            )}

            {viewState !== "none" && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "24px",
                        overflowX: "auto",
                        width: "100%",
                    }}
                >
                    {certificates.map((item) => (
                        <CertificateItem
                            key={item.certificateId}
                            title={item.title || item.courseTitle || item.course?.title || "Untitled Course"}
                            iconKey={item.iconKey || item.courseIconKey || item.course?.iconKey}
                        />
                    ))}
                </Box>
            )}
        </Box>
    )
}