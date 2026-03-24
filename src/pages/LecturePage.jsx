import { useMemo, useState } from "react"
import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import LectureContent from "../components/features/LectureContent"

const Page = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "var(--Color-Background-Default)",
}))

const Main = styled(Box)(() => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "32px",
}))

const ContentWrap = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "0 100px 0 56px",
    boxSizing: "border-box",
}))

const Footer = styled(Box)(() => ({
    position: "sticky",
    bottom: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    height: "111px",
    flexShrink: 0,
    background: "var(--Color-Background-Paper, #FFF)",
    boxShadow:
        "0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 4px -1px rgba(0, 0, 0, 0.20)",
}))

const FooterInner = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0 100px 0 56px",
    boxSizing: "border-box",
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
            <ContentWrap>
                <Main>
                    <LectureContent lesson={activeLesson} />
                </Main>
            </ContentWrap>
            <Footer>
                <FooterInner>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={onExit}
                    >
                        Exit a Lecture
                    </Button>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={onTakeQuiz}
                    >
                        Take a Quiz
                    </Button>
                </FooterInner>
            </Footer>
        </Page >
    )
}