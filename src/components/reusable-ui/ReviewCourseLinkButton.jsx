import { Button, Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
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
    height: "100px",
    minHeight: "80px",
    borderRadius: 12,
    padding: 0,
    overflow: "hidden",
    justifyContent: "flex-start",
    textTransform: "none",
    display: "flex",
    alignItems: "stretch",
}))

const IconBox = styled(Box)(() => ({
    width: 100,
    display: "flex",
    alignItems: "stretch",
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
    padding: "20px 24px",
    gap: 8,
}))

const ActionBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 24,
    whiteSpace: "nowrap",
    flexShrink: 0,
}))

export default function ReviewCourseLinkButton({
    courseName,
    iconKey,
    reviewTitle,
    size = "default",
    onClick,
}) {
    const Icon = courseIconMap[iconKey]

    return (
        <ReviewButton
            variant="outlined"
            buttonsize={size}
            onClick={onClick}
        >
            <IconBox>
                {Icon && <Icon size={100} />}
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