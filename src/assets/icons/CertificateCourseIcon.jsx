import { Box } from "@mui/material"
import courseIconMap from "../../assets/icons/CourseIconMap"
import CertificateBadgeIcon from "../../assets/icons/CertificateBadgeIcon"

export default function CertificateCourseIcon({ iconKey }) {
    const IconComponent = courseIconMap[iconKey]

    if (!IconComponent) return null

    return (
        <Box
            sx={{
                position: "relative",
                width: 88,
                height: 88,
            }}
        >
            <IconComponent />

            <CertificateBadgeIcon
                style={{
                    position: "absolute",
                    top: -8,
                    right: -10,
                    width: 28,
                    height: 32,
                }}
            />
        </Box>
    )
}