import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import LockIcon from "@mui/icons-material/Lock"

const Badge = styled(Box, {
    shouldForwardProp: (prop) => prop !== "badgevariant",
})(({ badgevariant }) => ({
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    boxSizing: "border-box",

    fontFamily: "IBM Plex Sans",
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,

    border: "1px solid var(--Color-Primary-_States-Outlined)",
    background: "var(--Color-Primary-Contrast)",
    color: "var(--Color-Primary-Dark)",

    ...(badgevariant === "completed" && {
        background: "var(--Color-Primary-Dark)",
        color: "var(--Color-Primary-Contrast)",
        border: "none",
    }),

    ...(badgevariant === "locked" && {
        border: "1px solid var(--Color-Action-Disabled, #E2E8F0)",
        background: "var(--Color-Action-Disabled, #E2E8F0)",
        color: "var(--Color-Text-Disabled)",
    }),
}))

export default function LessonNumberBadge({ number, variant = "default" }) {
    return (
        <Badge badgevariant={variant}>
            {variant === "locked" ? <LockIcon fontSize="small" /> : number}
        </Badge>
    )
}