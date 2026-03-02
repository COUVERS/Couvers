import '../global.css'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import SidebarBase from './SideBarBase'
import {
    Box,
    Typography,
    Stack,
    ListItemButton,
    Tooltip,
    IconButton
} from '@mui/material'
import FundamentalOfTeaching from "../assets/icons/FundamentalOfTeaching"
import EffectiveCommunication from "../assets/icons/EffectiveCommunication"
import EmpathyAndClassroom from "../assets/icons/EmpathyAndClassroom"
import AssessmentAndFeedback from "../assets/icons/AssessmentAndFeedback"
import LessonPlanning from "../assets/icons/LessonPlanning"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const CourseDrawer = styled(SidebarBase)({
    backgroundColor: 'var(--brand-indigo-900)',
    padding: '40px 8px',
})

const CategoryIcon = styled(Box, { shouldForwardProp: (p) => p !== 'active' })(({ active }) => ({
    width: 44,
    height: 44,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: active ? '#E0E0F8' : 'rgba(255, 255, 255, 0.1)',
    color: active ? '#2D2D5A' : '#fff',
}))

const courseCategories = [
    { id: 1, title: "Fundamentals of Teaching", icon: <FundamentalOfTeaching /> },
    { id: 2, title: "Effective Communication", icon: <EffectiveCommunication /> },
    { id: 3, title: "Empathy and Classroom Management", icon: <EmpathyAndClassroom /> },
    { id: 4, title: "Lesson Planning", icon: <LessonPlanning /> },
    { id: 5, title: "Assessment and Feedback", icon: <AssessmentAndFeedback /> },
];

export default function CourseNavigation() {
    const [open, setOpen] = useState(true)
    const [activeId, setActiveId] = useState(1)

    return (
        <CourseDrawer open={open}>
            <Box sx={{
                px: 3,
                mb: 4,
                textAlign: open ? 'left' : 'center',
                minHeight: '40px'
            }}>
                {open ? (
                    <Typography sx={{
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        color: '#fff',
                        lineHeight: 'normal'
                    }}>
                        Course Categories
                    </Typography>
                ) : (
                    <Typography sx={{ color: '#fff', fontWeight: 800 }}>C</Typography>
                )}
            </Box>

            <Stack
                spacing={2}
                sx={{
                    px: open ? 2 : 1,
                    flex: 1,
                    alignItems: open ? 'stretch' : 'center'
                }}
            >
                {courseCategories.map((course) => (
                    <Tooltip
                        key={course.id}
                        title={!open ? course.title : ""}
                        placement="right"
                        arrow
                    >
                        <ListItemButton
                            onClick={() => setActiveId(course.id)}
                            sx={{
                                borderRadius: '12px',
                                p: 1,
                                backgroundColor: activeId === course.id ? '#FFF' : 'transparent',
                                color: activeId === course.id ? '#2D2D5A' : '#FFF',
                                justifyContent: open ? 'flex-start' : 'center',
                                transition: '0.2s',
                                '&:hover': {
                                    backgroundColor: activeId === course.id ? '#FFF' : 'rgba(255,255,255,0.08)'
                                }
                            }}
                        >
                            <CategoryIcon active={activeId === course.id}>
                                {course.icon}
                            </CategoryIcon>

                            {open && (
                                <Typography
                                    sx={{
                                        ml: 2,
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: 'normal',
                                    }}
                                >
                                    {course.title}
                                </Typography>
                            )}
                        </ListItemButton>
                    </Tooltip>
                ))}
            </Stack>

            <Box sx={{ p: 2, textAlign: 'center' }}>
                <IconButton
                    onClick={() => setOpen(!open)}
                    sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
                >
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>
        </CourseDrawer>
    )
}