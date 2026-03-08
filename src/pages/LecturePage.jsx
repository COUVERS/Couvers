import { useMemo, useState } from "react"
import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import LectureContent from "../components/features/LectureContent"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
// import CustomButton from "../components/reusable-ui/CustomButton"

const Page = styled(Box)(() => ({
    display: "flex",
    minHeight: "100vh",
    background: "var(--Color-Background-Default)",
}))

// const Right = styled(Box)(() => ({
//     flex: 1,
//     display: "flex",
// }))

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
    // onSelectLesson,
    onExit,
    onTakeQuiz,
}) {
    const activeLesson = useMemo(
        () => lessons.find((l) => String(l._id) === String(activeLessonId)) || lessons[0],
        [lessons, activeLessonId]
    )

    // const [openLessonId, setOpenLessonId] = useState(
    //     activeLesson ? String(activeLesson._id) : null
    // )

    // const handleSelectLesson = (id) => {
    //     setOpenLessonId(String(id))
    //     onSelectLesson?.(String(id))
    // }

    return (
        <Page>
            {/* <Right>
                <ContentsSidebar
                    lessons={lessons}
                    activeLessonId={activeLesson ? String(activeLesson._id) : ""}
                    openLessonId={openLessonId}
                    onToggleLesson={(id) =>
                        setOpenLessonId((prev) => (prev === String(id) ? null : String(id)))
                    }
                    onSelectLesson={handleSelectLesson}
                    onSelectQuiz={(lessonId) => onTakeQuiz?.(String(lessonId))}
                /> */}

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
            {/* </Right> */}
        </Page>
    )
}