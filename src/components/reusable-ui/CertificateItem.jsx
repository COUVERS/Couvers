import { Box, Typography } from "@mui/material"
import DownloadIcon from "@mui/icons-material/Download"
import CertificateCourseIcon from "../../assets/icons/CertificateCourseIcon"
import { getCertificateDownloadUrlByKey } from "../../services/certificates"

export default function CertificateItem({
    title,
    iconKey,
}) {
    const handleDownload = async () => {
        try {
            const url = await getCertificateDownloadUrlByKey(iconKey)
            window.open(url, "_blank")
        } catch (err) {
            console.error("certificate download error:", err)
            alert("Failed to download certificate")
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                width: "120px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                flexShrink: 0,
            }}
        >
            <CertificateCourseIcon iconKey={iconKey} />

            <Typography
                sx={{
                    alignSelf: "stretch",
                    color: "var(--Color-Text-Dark)",
                    fontSize: "var(--FontSize-Body-M)",
                    fontWeight: 600,
                    lineHeight: 1.4,
                }}
            >
                {title}
            </Typography>

            <Box
                component="button"
                type="button"
                onClick={handleDownload}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--Color-Primary-Main)",
                    textDecoration: "none",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                }}
            >
                <DownloadIcon fontSize="small" />
                <Typography
                    sx={{
                        color: "var(--Color-Primary-Main)",
                        fontSize: "var(--FontSize-Body-S)",
                        fontWeight: 500,
                        lineHeight: 1.4,
                    }}
                >
                    Download
                </Typography>
            </Box>
        </Box>
    )
}