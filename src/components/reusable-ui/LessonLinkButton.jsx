import React from "react"
import { Button, Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import courseIconMap from "../../assets/icons/CourseIconMap"

const actionLabelMap = {
    continue: "→ Continue",
    quiz: "→ Take a Quiz",
}

const sizeStyles = {
    lecture: {
        width: "100%",
        minHeight: 118,
    },
    quiz: {
        width: "100%",
        minHeight: 118,
    },
    compact: {
        width: "100%",
        minHeight: 72,
    },
}

const LessonButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "buttonsize",
})(({ buttonsize }) => ({
    ...sizeStyles[buttonsize],
    borderRadius: 16,
    padding: 0,
    overflow: "hidden",
    justifyContent: "flex-start",
    textTransform: "none",
    display: "flex",
    alignItems: "stretch",
}))

const IconBox = styled(Box)(() => ({
    width: 116,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.24)",
    flexShrink: 0,
}))

const Content = styled(Box)(() => ({
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "20px 24px",
    gap: 6,
}))

const ActionBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 24,
    whiteSpace: "nowrap",
    flexShrink: 0,
}))

export default function LessonLinkButton({
    courseName,
    lessonTitle,
    action = "continue",
    size = "lecture",
    onClick,
}) {
    const icon = courseIconMap[courseName] ?? null
    const actionLabel = actionLabelMap[action] ?? actionLabelMap.continue

    return (
        <LessonButton
            variant="contained"
            buttonsize={size}
            onClick={onClick}
        >
            <IconBox>
                {icon}
            </IconBox>

            <Content>
                <Typography
                    sx={{
                        fontSize: 16,
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: "inherit",
                    }}
                >
                    {courseName}
                </Typography>

                <Typography
                    sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: 1.4,
                        color: "inherit",
                        opacity: 0.9,
                    }}
                >
                    {lessonTitle}
                </Typography>
            </Content>

            <ActionBox>
                <Typography
                    sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: 1.3,
                        color: "inherit",
                    }}
                >
                    {actionLabel}
                </Typography>
            </ActionBox>
        </LessonButton>
    )
}