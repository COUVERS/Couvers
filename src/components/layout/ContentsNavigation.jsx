import { useEffect, useState } from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Links from "../reusable-ui/Links"
import ContentsNavItem from "../reusable-ui/ContentsNavItem"

import SidebarBase from "../reusable-ui/SideBarBase"
//Icons
import IconButton from "@mui/material/IconButton"
import LessonLectureIcon from "../../assets/icons/LessonLectureIcon"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"

const expandedWidth = 389
const collapsedWidth = 40

const ContentsDrawer = styled(SidebarBase)(({ open }) => ({
    width: open ? expandedWidth : collapsedWidth,
    backgroundColor: "var(--Brand-Indigo-900)",
    color: "var(--Color-Secondary-Contrast)",
    overflowX: open ? "hidden" : "visible",
}))

export default function ContentsNavigation({
    lessons = [],
    selectedLesson,
    onSelectLecture,
    onSelectQuiz,
    onBack,
    forceCollapsed = false,
}) {
    const [open, setOpen] = useState(true)

    useEffect(() => {
        if (forceCollapsed) {
            setOpen(false)
        }
    }, [forceCollapsed])

    const [selectedContentType, setSelectedContentType] = useState("lecture")
    return (
        <ContentsDrawer open={open}
            sx={{
                p: 3,

            }}>

            {/* collapse / expand button */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: open ? "flex-end" : "center",
                    mb: 2
                }}
            >
                <IconButton
                    onClick={() => setOpen(!open)}
                    sx={{
                        color: "var(--Color-Secondary-Contrast)",
                        p: 0,
                        width: 48,
                        height: 48,
                        minWidth: 36,
                        minHeight: 36,
                        "&:hover": {
                            backgroundColor: "transparent",
                        },
                        transform: open ? "none" : "translateX(20px)",
                    }}
                >
                    {open ? (
                        <ChevronLeftIcon sx={{ fontSize: 32 }} />
                    ) : (
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "var(--Color-Secondary-Main)",
                                color: "var(--Color-Secondary-Contrast)",
                                "& svg": {
                                    width: "36px",
                                    height: "36px",
                                    display: "block",
                                },
                                "& path": {
                                    fill: "var(--Color-Secondary-Contrast)",
                                },
                            }}
                        >
                            <LessonLectureIcon />
                        </Box>
                    )}
                </IconButton>
            </Box>

            {open && (
                <>
                    <Typography
                        sx={{
                            fontSize: 28,
                            fontWeight: 500,
                            mb: 4
                        }}
                    >
                        Contents
                    </Typography>

                    {/* Lesson list */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

                        {lessons.map((lesson) => (
                            <ContentsNavItem
                                key={lesson._id}
                                lesson={lesson}
                                activeType={
                                    selectedLesson?._id === lesson._id
                                        ? selectedContentType
                                        : null
                                }
                                onLectureClick={(clickedLesson) => {
                                    onSelectLecture?.(clickedLesson)
                                    setSelectedContentType("lecture")
                                }}
                                onQuizClick={(clickedLesson) => {
                                    onSelectQuiz?.(clickedLesson)
                                    setSelectedContentType("quiz")
                                }}
                            />
                        ))}

                    </Box>
                </>
            )}

        </ContentsDrawer>
    )
}