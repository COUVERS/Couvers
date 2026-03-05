import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Links from "../reusable-ui/Links"
import LessonNumberBadge from "../reusable-ui/LessonNumberBadge"
import VerifiedIcon from "../../assets/icons/VerifiedIcon"

export default function LessonListItem({
    order,
    title,
    description,
    badgeVariant = "default",   // "completed" | "default" | "locked"
    completedAt,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 5,
            }}
        >
            <LessonNumberBadge number={order} variant={badgeVariant} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                {/* Title*/}
                <Links
                    underline="always"
                    sx={{
                        fontFamily: "IBM Plex Sans",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "normal",
                    }}
                >
                    {title}
                </Links>

                {/* Description */}
                <Typography
                    sx={{
                        fontFamily: "IBM Plex Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        color: "var(--Color-Text-Primary)",
                    }}>
                    {description}
                </Typography>

                {/* Verified + date row */}
                {completedAt && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                        }}
                    >
                        <VerifiedIcon />

                        <Typography
                            sx={{
                                fontFamily: "IBM Plex Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "normal",
                                letterSpacing: "0.1px",
                                color: "var(--Color-Text-Primary)",
                            }}
                        >
                            {completedAt} completed!
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    )
}