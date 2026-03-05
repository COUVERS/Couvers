import { styled } from '@mui/material/styles'
import Box from "@mui/material/Box"
import LockedIcon from '../../assets/icons/LockedIcon'

const Badge = styled(Box)(({ theme, variant }) => ({
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",

    fontFamily: "IBM Plex Sans",
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,

    // default style
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,

    ...(variant === "completed" && {
        background: theme.palette.primary.main,
        color: "#fff",
        border: "none",
    }),

    ...(variant === "locked" && {
        border: `2px solid ${theme.palette.action.disabled}`,
        color: theme.palette.action.disabled,
    }),
}))

export default function LessonNumberBadge({ number, variant = "default" }) {
    return (
        <Badge variant={variant}>
            {variant === "locked" ? <LockedIcon width={20} height={20} /> : number}
        </Badge>
    )
}

// HOW TO USE
//    <LessonNumberBadge number={1} variant="completed" />

//       <LessonNumberBadge number={2} variant="default" />

//       <LessonNumberBadge variant="locked" />