import { Box, Typography } from "@mui/material"
import CertificateCourseIcon from "../../assets/icons/CertificateCourseIcon"
import DownloadIcon from '@mui/icons-material/Download';

export default function CertificateItem({
    title,
    iconKey,
    fileUrl,
}) {
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
                component={fileUrl ? "a" : "button"}
                href={fileUrl || undefined}
                type={fileUrl ? undefined : "button"}
                download={fileUrl ? true : undefined}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--Color-Primary-Main)",
                    textDecoration: "none",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: fileUrl ? "pointer" : "default",
                }}
            >
                <DownloadIcon />
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