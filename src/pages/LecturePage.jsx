import { useMemo } from "react"
import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import LectureContent from "../components/features/LectureContent"

const Page = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "var(--Color-Background-Default)",
    width: "100%",
    overflowX: "hidden",
}))

const Main = styled(Box)(() => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    minWidth: 0,
}))

const ContentWrap = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "0 24px",
    boxSizing: "border-box",
    width: "100%",
    minWidth: 0,

    [theme.breakpoints.up("md")]: {
        padding: "0 100px 0 56px",
    },
}))

const Footer = styled(Box)(({ theme }) => ({
    position: "sticky",
    bottom: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    minHeight: "76px",
    flexShrink: 0,
    background: "var(--Color-Background-Paper)",
    boxShadow:
        "0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 4px -1px rgba(0, 0, 0, 0.20)",
    width: "100%",
    boxSizing: "border-box",

    [theme.breakpoints.up("md")]: {
        minHeight: "111px",
    },
}))

const FooterInner = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "16px 24px",
    boxSizing: "border-box",
    gap: "16px",
    minWidth: 0,

    [theme.breakpoints.up("md")]: {
        padding: "0 100px 0 56px",
    },
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
                        sx={{
                            minWidth: 0,
                            flex: 1,
                            maxWidth: { xs: "50%", md: "unset" },
                        }}
                    >
                        Exit a Lecture
                    </Button>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={onTakeQuiz}
                        sx={{
                            minWidth: 0,
                            flex: 1,
                            maxWidth: { xs: "50%", md: "unset" },
                        }}
                    >
                        Take a Quiz
                    </Button>
                </FooterInner>
            </Footer>
        </Page>
    )
}