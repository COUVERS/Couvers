import { useMemo, useState } from "react"
import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import LectureContent from "../components/features/LectureContent"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

const Page = styled(Box)(() => ({
    display: "flex",
    minHeight: "100vh",
    background: "var(--Color-Background-Default)",
}))

const Main = styled(Box)(() => ({
    flex: 1,
    padding: "48px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
}))

const Footer = styled(Box)(() => ({
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "24px",
}))

export default function LecturePage({
    lessons = [],
    activeLessonId,
    onExit,
    onTakeQuiz,
}) {
    const activeLesson = useMemo(
        () => lessons.find((l) => String(l._id) === String(activeLessonId)) || lessons[0],
        [lessons, activeLessonId]
    )

    return (
        <Page>
            <Main>
                <LectureContent lesson={activeLesson} />

                <Footer>
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={onExit}
                    >
                        Exit a Lecture
                    </Button>

                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ChevronRightIcon />}
                        onClick={onTakeQuiz}
                    >
                        Take a Quiz
                    </Button>
                </Footer>
            </Main>
        </Page>
    )
}