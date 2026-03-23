import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import LockIcon from "@mui/icons-material/Lock"

const Badge = styled(Box, {
    shouldForwardProp: (prop) => prop !== "badgevariant",
})(({ theme, badgevariant }) => ({
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",

    fontFamily: "IBM Plex Sans",
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,

    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,

    ...(badgevariant === "completed" && {
        background: theme.palette.primary.main,
        color: "var(--Color-Secondary-Contrast)",
        border: "none",
    }),

    ...(badgevariant === "locked" && {
        border: `2px solid ${theme.palette.action.disabled}`,
        color: theme.palette.action.disabled,
        background: "transparent",
    }),
}))

export default function LessonNumberBadge({ number, variant = "default" }) {
    return (
        <Badge badgevariant={variant}>
            {variant === "locked" ? <LockIcon fontSize="small" /> : number}
        </Badge>
    )
}