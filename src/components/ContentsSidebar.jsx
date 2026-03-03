import { styled } from "@mui/material/styles"
import { Box, Typography, Button, Divider } from "@mui/material"

const Wrapper = styled(Box)(() => ({
    width: 360,
    height: "100vh",
    backgroundColor: "var(--Color-Secondary-Main)",
    color: "var(--Color-Secondary-Contrast)",
    padding: "40px 24px",
    boxSizing: "border-box",
    overflowY: "auto",
}))

const HeaderRow = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
}))

const Title = styled(Typography)(() => ({
    fontSize: "var(--FontSize-Headings-h2)",
    fontWeight: 600,
}))

const LessonBlock = styled(Box, {
    shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
    borderRadius: 12,
    padding: "12px",
    marginBottom: "16px",
    backgroundColor: active ? "var(--Color-Secondary-_States-Selected)" : "transparent",
    border: active ? "1px solid var(--Color-Secondary-_States-Outlined)" : "1px solid transparent",
}))

const LessonTitleBtn = styled(Button)(() => ({
    width: "100%",
    justifyContent: "flex-start",
    textTransform: "none",
    color: "inherit",
    padding: "8px 8px",
    borderRadius: 10,
    fontSize: "var(--FontSize-Body1)",
}))

const SubRow = styled(Box)(() => ({
    display: "grid",
    gap: 6,
    paddingLeft: 26,
    marginTop: 6,
}))

const SubBtn = styled(Button)(() => ({
    justifyContent: "flex-start",
    textTransform: "none",
    color: "inherit",
    opacity: 0.95,
    padding: "6px 8px",
    borderRadius: 10,
    fontSize: "var(--FontSize-Body2)",
    textDecoration: "underline",
}))

const Dot = styled("span")(() => ({
    width: 12,
    height: 12,
    borderRadius: 999,
    border: "2px solid var(--Color-Secondary-Contrast)",
    display: "inline-block",
    marginRight: 10,
    opacity: 0.9,
}))

export default function ContentsSidebar({
    lessons = [],
    activeLessonId,
    openLessonId,
    onToggleLesson,
    onSelectLesson,
    onSelectQuiz,
}) {
    return (
    <Wrapper>
        <HeaderRow>
        <Box>
            <Typography sx={{ opacity: 0.9, mb: 1 }}>Lesson-Lecture</Typography>
            <Title>Contents</Title>
            </Box>
            <Box sx={{ opacity: 0.9, fontSize: 22, cursor: "pointer" }}>‹</Box>
        </HeaderRow>

        <Divider sx={{ borderColor: "var(--Color-Secondary-_States-FocusVisible)", mb: 2 }} />

        {lessons
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((lesson) => {
            const id = String(lesson._id)
            const isActive = id === String(activeLessonId)
            const isOpen = id === String(openLessonId)

            return (
            <LessonBlock key={id} active={isActive}>
                <LessonTitleBtn
                onClick={() => {
                    onToggleLesson?.(id)
                    onSelectLesson?.(id)
                }}
                >
                <Dot />
                {lesson.title}
                </LessonTitleBtn>

                {isOpen && (
                <SubRow>
                    <SubBtn onClick={() => onSelectLesson?.(id)}>Lecture</SubBtn>
                    <SubBtn onClick={() => onSelectQuiz?.(id)}>Quiz</SubBtn>
                </SubRow>
                )}
            </LessonBlock>
            )
        })}
    </Wrapper>
  )
}