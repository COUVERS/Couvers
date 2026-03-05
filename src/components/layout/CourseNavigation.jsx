import '../../styles/global.css'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import SidebarBase from '../reusable-ui/SideBarBase'
import {
    Box,
    Typography,
    Stack,
    ListItemButton,
    Tooltip,
    IconButton
} from '@mui/material'
import FundamentalOfTeaching from "../../assets/icons/FundamentalOfTeaching"
import EffectiveCommunication from "../../assets/icons/EffectiveCommunication"
import EmpathyAndClassroom from "../../assets/icons/EmpathyAndClassroom"
import AssessmentAndFeedback from "../../assets/icons/AssessmentAndFeedback"
import LessonPlanning from "../../assets/icons/LessonPlanning"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const CourseDrawer = styled(SidebarBase)({
    backgroundColor: 'var(--Brand-Indigo-900)',
    height: '100vh',
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

const iconMap = {
    "Fundamentals of Teaching": <FundamentalOfTeaching />,
    "Effective Communication": <EffectiveCommunication />,
    "Empathy and Classroom Management": <EmpathyAndClassroom />,
    "Lesson Planning": <LessonPlanning />,
    "Assessment and Feedback": <AssessmentAndFeedback />,
}

export default function CourseNavigation({ courses = [], selectedCourseId, onSelectCourse }) {
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
                    <Typography sx={{
                        color: '#fff',
                        fontWeight: 500,
                        fontSize: '12px'
                    }}>
                        Course Categories
                    </Typography>
                )}
            </Box>

            <Stack
                spacing={6}
                sx={{
                    px: open ? 2 : 1,
                    alignSelf: 'stretch',

                }}
            >
                {courses.map((course) => (
                    <Tooltip
                        key={course._id}
                        title={!open ? course.title : ""}
                        placement="right"
                        arrow
                    >
                        <ListItemButton
                            onClick={() => {
                                onSelectCourse?.(course._id)
                            }}
                            sx={{
                                borderRadius: '8px',
                                p: '8px',
                                backgroundColor: activeId === course._id ? '#FFF' : 'transparent',
                                color: activeId === course._id ? '#2D2D5A' : '#FFF',
                                justifyContent: open ? 'flex-start' : 'center',
                                transition: '0.2s',
                                '&:hover': {
                                    backgroundColor: activeId === course._id ? '#FFF' : 'rgba(255,255,255,0.08)'
                                }
                            }}
                        >
                            <CategoryIcon active={selectedCourseId === course._id}>
                                {iconMap[course.title]}
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

            <Box sx={{ p: 2 }}>
                <IconButton
                    onClick={() => setOpen(!open)}
                    sx={{ color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
                >
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>
        </CourseDrawer>
    )
}