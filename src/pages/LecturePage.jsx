import { useMemo, useLayoutEffect, useRef, useState } from "react"
import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import LectureContent from "../components/features/LectureContent"

const Page = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    background: "var(--Color-Background-Default)",
    width: "100%",
    overflowX: "hidden",
}))

const Main = styled(Box)(({ theme }) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    minWidth: 0,
    minHeight: 0,
    paddingBottom: "110px",
    marginTop: "32px",

    [theme.breakpoints.up("md")]: {
        paddingBottom: "143px",
    },
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
    position: "fixed",
    bottom: 0,
    zIndex: 1200,

    display: "flex",
    alignItems: "center",
    minHeight: "76px",
    flexShrink: 0,
    background: "var(--Color-Background-Paper)",
    boxShadow:
        "0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 4px -1px rgba(0, 0, 0, 0.20)",
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

    const pageRef = useRef(null)
    const contentRef = useRef(null)
    const [footerRect, setFooterRect] = useState(null)

    const activeLesson = useMemo(
        () => lessons.find((l) => String(l._id) === String(activeLessonId)) || lessons[0],
        [lessons, activeLessonId]
    )


    useLayoutEffect(() => {
        if (!contentRef.current) return

        const updateRect = () => {
            const rect = contentRef.current.getBoundingClientRect()
            setFooterRect({
                left: rect.left,
                width: rect.width,
            })
        }

        updateRect()

        const resizeObserver = new ResizeObserver(updateRect)
        resizeObserver.observe(contentRef.current)
        window.addEventListener("resize", updateRect)

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener("resize", updateRect)
        }
    }, [])

    return (
        <Page ref={pageRef}>
            <ContentWrap ref={contentRef}>
                <Main>
                    <LectureContent lesson={activeLesson} />
                </Main>
            </ContentWrap>

            {footerRect && (
                <Footer
                    style={{
                        left: `${footerRect.left}px`,
                        width: `${footerRect.width}px`,
                    }}>
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
            )}
        </Page>
    )
}