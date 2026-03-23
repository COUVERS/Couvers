import '../../styles/global.css'
import { useState, useEffect } from 'react'
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
//Icons
import courseIconMap from '../../assets/icons/CourseIconMap'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const CourseDrawer = styled(SidebarBase)({
    backgroundColor: 'var(--Brand-Indigo-900)',
    height: '100vh',
})

const CategoryIcon = styled(Box, { shouldForwardProp: (p) => p !== 'active' })(({ active }) => ({
    width: 48,
    height: 48,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: active ? '#E0E0F8' : 'rgba(255, 255, 255, 0.1)',
    color: active ? 'var(--Color-Secondary)' : '#fff',
}))

export default function CourseNavigation({
    courses = [],
    selectedCourseId,
    onSelectCourse,
    forceCollapsed = false,
}) {
    const [open, setOpen] = useState(true)

    useEffect(() => {
        if (forceCollapsed) {
            setOpen(false)
        }
    }, [forceCollapsed])

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
                        lineHeight: 'normal',
                        textAlign: 'center',
                    }}>
                        Course Categories
                    </Typography>
                ) : (
                    <Typography sx={{
                        color: '#fff',
                        fontWeight: 500,
                        fontSize: '12px',
                        textAlign: 'center',
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
                {courses.map((course) => {
                    const isSelected = selectedCourseId === course._id
                    const Icon = courseIconMap[course.icon]


                    return (
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
                                    backgroundColor: isSelected ? '#FFF' : 'transparent',
                                    color: isSelected ? 'var(--Color-Secondary-Dark)' : '#FFF',
                                    justifyContent: open ? 'flex-start' : 'center',
                                    transition: '0.2s',
                                    '&:hover': {
                                        backgroundColor: isSelected ? '#FFF' : 'rgba(255,255,255,0.08)'
                                    }
                                }}
                            >
                                <CategoryIcon active={isSelected}>
                                    {Icon && (
                                        <Icon bgColor={isSelected ? "#A3B2FB" : "#fff"} />
                                    )}
                                </CategoryIcon>

                                {open && (
                                    <Typography
                                        sx={{
                                            ml: 2,
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: 'normal',
                                            color: isSelected ? 'var(--Color-Secondary-Dark)' : '#FFF',
                                        }}
                                    >
                                        {course.title}
                                    </Typography>
                                )}
                            </ListItemButton>
                        </Tooltip>
                    )
                })}
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