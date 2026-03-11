import { useState } from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Links from "../reusable-ui/Links"
import ContentsNavItem from "../reusable-ui/ContentsNavItem"
import SidebarBase from "../reusable-ui/SideBarBase"
import ListItemButton from "@mui/material/ListItemButton"
//Icons
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"

const expandedWidth = 389
const collapsedWidth = 40

const ContentsDrawer = styled(SidebarBase)(({ open }) => ({
    width: open ? expandedWidth : collapsedWidth,
    backgroundColor: "var(--Brand-Indigo-900)",
    color: "#fff",
}))

export default function ContentsNavigation({
    lessons = [],
    selectedLesson,
    onSelectLesson,
    onBack,
}) {
    const [open, setOpen] = useState(true)
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
                    sx={{ color: "#fff" }}
                >
                    {open ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
            </Box>

            {open && (
                <>
                    <Typography
                        sx={{
                            fontSize: 20,
                            fontWeight: 600,
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
                                    onSelectLesson?.(clickedLesson)
                                    setSelectedContentType("lecture")
                                }}
                                onQuizClick={(clickedLesson) => {
                                    onSelectLesson?.(clickedLesson)
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