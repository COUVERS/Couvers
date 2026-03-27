import { Button, Box, Typography } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { styled, useTheme } from "@mui/material/styles"
import courseIconMap from "../../assets/icons/CourseIconMap"

const sizeStyles = {
    default: {
        width: "100%",
        minHeight: 118,
    },
    compact: {
        width: "100%",
        minHeight: 72,
    },
}

const ReviewButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "buttonsize",
})(({ buttonsize }) => ({
    ...sizeStyles[buttonsize],
    minHeight: "80px",
    borderRadius: 12,
    padding: 0,
    overflow: "hidden",
    justifyContent: "flex-start",
    textTransform: "none",
    display: "flex",
    alignItems: "stretch",
    "@media (min-width:899px) and (max-width:1305px)": {
        minHeight: "96px",
    },
}))

const IconBox = styled(Box)(() => ({
    width: 80,
    display: "flex",
    alignItems: "stretch",
    alignSelf: "stretch",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
}))

const Content = styled(Box)(() => ({
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "left",
    padding: "8px 32px",
    gap: 4,
    "@media (min-width:899px) and (max-width:1305px)": {
        padding: "8px 20px",
    },
}))

const ActionBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 24,
    whiteSpace: "nowrap",
    flexShrink: 0,
    "@media (min-width:899px) and (max-width:1305px)": {
        paddingRight: 16,
    },
    "@media (max-width:650px)": {
        display: "none",
    },
}))

export default function ReviewCourseLinkButton({
    courseName,
    iconKey,
    reviewTitle,
    size = "default",
    onClick,
}) {
    const theme = useTheme()
    const isMediumRange = useMediaQuery(
        "(min-width:899px) and (max-width:1305px)"
    )
    const iconSize = isMediumRange ? 96 : 80

    const Icon = courseIconMap[iconKey]

    return (
        <ReviewButton
            variant="outlined"
            buttonsize={size}
            onClick={onClick}
        >
            {Icon && <Icon size={iconSize} />}

            <Content>
                <Typography
                    sx={{
                        fontSize: "var(--FontSize-Body1)",
                        fontWeight: 600,
                        lineHeight: "var(--LineHeight-Body1)",
                        letterSpacing: "var(--LetterSpace-Body1)",
                        color: "inherit",
                        "@media (min-width:899px) and (max-width:1305px)": {
                            lineHeight: "22px",
                        },
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
                    {reviewTitle}
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
                    → Retake
                </Typography>
            </ActionBox>
        </ReviewButton>
    )
}