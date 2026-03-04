import { useMemo, useState } from "react"
import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"
import Navigation from "../components/Navigation"
import ContentsSidebar from "../components/ContentsSidebar"
import LectureContent from "../components/LectureContent"
import CustomButton from "../Reusable-Components/CustomButton"

const Page = styled(Box)(() => ({
    display: "flex",
    minHeight: "100vh",
    background: "var(--Color-Background-Default)",
}))

const Right = styled(Box)(() => ({
    flex: 1,
    display: "flex",
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
    onSelectLesson,
    onExit,
    onTakeQuiz,
}) {
    const activeLesson = useMemo(
    () => lessons.find((l) => String(l._id) === String(activeLessonId)) || lessons[0],
    [lessons, activeLessonId]
    )

    const [openLessonId, setOpenLessonId] = useState(
    activeLesson ? String(activeLesson._id) : null
    )

    const handleSelectLesson = (id) => {
    setOpenLessonId(String(id))
    onSelectLesson?.(String(id))
    }

    return (
    <Page>
        {/* <Navigation /> */}

        <Right>
        <ContentsSidebar
            lessons={lessons}
            activeLessonId={activeLesson ? String(activeLesson._id) : ""}
            openLessonId={openLessonId}
            onToggleLesson={(id) =>
            setOpenLessonId((prev) => (prev === String(id) ? null : String(id)))
            }
            onSelectLesson={handleSelectLesson}
            onSelectQuiz={(lessonId) => onTakeQuiz?.(String(lessonId))}
        />

        <Main>
            <LectureContent lesson={activeLesson} />

            <Footer>
            <CustomButton variant="outlined" color="secondary" onClick={onExit}>
                Exit a Lecture
            </CustomButton>

            <CustomButton
                variant="contained"
                color="primary"
                onClick={() => onTakeQuiz?.(String(activeLesson?._id))}
                disabled={!activeLesson}
            >
                Take a Quiz
            </CustomButton>
            </Footer>
        </Main>
        </Right>
    </Page>
    )
}