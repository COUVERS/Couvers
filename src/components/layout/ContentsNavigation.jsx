import { useEffect, useState } from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import ContentsNavItem from "../reusable-ui/ContentsNavItem"

import SidebarBase from "../reusable-ui/SideBarBase"
//Icons
import IconButton from "@mui/material/IconButton"
import LessonLectureIcon from "../../assets/icons/LessonLectureIcon"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"

const expandedWidth = 389
const mobileExpandedWidth = 320
const collapsedWidth = 40

const ContentsDrawer = styled(SidebarBase, {
    shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobileDrawer",
})(({ open, isMobileDrawer }) => ({
    width: open
        ? (isMobileDrawer ? mobileExpandedWidth : expandedWidth)
        : collapsedWidth,
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
    isMobileDrawer = false,
}) {
    const [open, setOpen] = useState(true)

    useEffect(() => {
        if (forceCollapsed) {
            setOpen(false)
        }
    }, [forceCollapsed])

    const [selectedContentType, setSelectedContentType] = useState("lecture")

    return (
        <ContentsDrawer
            open={open}
            isMobileDrawer={isMobileDrawer}
            sx={{
                pl: isMobileDrawer ? 2 : 3,
                pr: isMobileDrawer ? 2 : 2,
                py: isMobileDrawer ? 4 : 5,
            }}
        >
            {open ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 3,
                    }}
                >
                    <Box
                        sx={{
                            fontSize: isMobileDrawer ? 24 : 28,
                            fontWeight: 500,
                            m: 0,
                        }}
                    >
                        Contents
                    </Box>

                    {!isMobileDrawer && (
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
                            }}
                        >
                            <ChevronLeftIcon sx={{ fontSize: 32 }} />
                        </IconButton>
                    )}
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 2,
                    }}
                >
                    {!isMobileDrawer && (
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
                                transform: "translateX(20px)",
                            }}
                        >
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
                        </IconButton>
                    )}
                </Box>
            )}

            {open && (
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
            )}
        </ContentsDrawer>
    )
}