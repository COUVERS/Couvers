import '../../styles/global.css'
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import SidebarBase from '../reusable-ui/SideBarBase'
import {
    Box,
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
    color: active ? 'var(--Color-Secondary)' : 'var(--Color-Secondary-Contrast)',
}))

export default function CourseNavigation({
    courses = [],
    selectedCourseId,
    onSelectCourse,
    forceCollapsed = false,
    isMobileDrawer = false,
}) {
    const [open, setOpen] = useState(true)
    console.log('isMobileDrawer', isMobileDrawer)

    useEffect(() => {
        if (forceCollapsed) {
            setOpen(false)
        }
    }, [forceCollapsed])

    return (
        <CourseDrawer
            open={open}
            drawerCustomWidth={open ? 240 : 88}
        >
            <Box
                sx={{
                    mb: 4,
                    minHeight: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: open ? 'var(--FontSize-Headings-h3)' : '12px',
                    fontWeight: open ? 600 : 500,
                    color: 'var(--Color-Secondary-Contrast)',
                    textAlign: 'center',
                }}
            >
                Course Categories
            </Box>

            <Stack
                // spacing={6} very wide？？
                spacing={5}
                sx={{
                    px: open ? "16px" : 1,
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
                            slotProps={{
                                tooltip: {
                                    sx: {
                                        backgroundColor: "var(--Color-Secondary-Light)",
                                        maxWidth: "120px",
                                        whiteSpace: "normal",
                                        boxShadow: "0px 4px 12px rgba(0,0,0,0.35)",
                                        fontSize: "12px",
                                        px: "8px",
                                        py: "6px",
                                        fontWeight: 400,
                                        borderRadius: "8px",
                                    },
                                },
                                arrow: {
                                    sx: {
                                        color: "var(--Color-Secondary-Light)",
                                        "&:before": {
                                            boxShadow: "0px 4px 12px rgba(0,0,0,0.22)",
                                        },
                                    },
                                },
                            }}
                        >
                            <ListItemButton
                                onClick={() => {
                                    onSelectCourse?.(course._id)
                                }}
                                sx={{
                                    borderRadius: '8px',
                                    p: isSelected && !open ? '4px' : 1,
                                    gap: 1,
                                    backgroundColor: isSelected ? 'var(--Color-Secondary-Contrast)' : 'transparent',
                                    color: isSelected ? 'var(--Color-Secondary-Dark)' : 'var(--Color-Secondary-Contrast)',
                                    justifyContent: open ? 'flex-start' : 'center',
                                    transition: '0.2s',
                                    '&:hover': {
                                        backgroundColor: isSelected ? 'var(--Color-Secondary-Contrast)' : 'rgba(255,255,255,0.08)'
                                    }
                                }}
                            >
                                <CategoryIcon active={isSelected}>
                                    <Box
                                        sx={{
                                            borderRadius: '4px',
                                            overflow: 'hidden',
                                            display: 'flex',
                                        }}
                                    >
                                        {Icon && (
                                            <Icon bgColor={isSelected ? "#A3B2FB" : "var(--Color-Secondary-Contrast)"}
                                            />
                                        )}
                                    </Box>
                                </CategoryIcon>

                                {open && (
                                    <Box
                                        component="span"
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            color: isSelected
                                                ? 'var(--Color-Secondary-Dark)'
                                                : 'var(--Color-Secondary-Contrast)',
                                        }}
                                    >
                                        {course.title}
                                    </Box>
                                )}
                            </ListItemButton>
                        </Tooltip>
                    )
                })}
            </Stack>


            {!isMobileDrawer && (
                <Box sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'flex-end',

                }}>
                    <IconButton
                        onClick={() => setOpen(!open)}
                        sx={{
                            color: 'var(--Color-Secondary-Contrast)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
                        }}
                    >
                        {open ? <ChevronLeftIcon sx={{ fontSize: 32 }} /> : <ChevronRightIcon sx={{ fontSize: 32 }} />}
                    </IconButton>
                </Box>
            )}
        </CourseDrawer>
    )
}