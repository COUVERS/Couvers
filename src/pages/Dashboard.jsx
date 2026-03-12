import { Box } from "@mui/material"
import ContinueLearningCard from "../components/features/ContinueLearningCard"
import CourseCompletionProgress from "../components/features/CourseCompletionBar"
import SkillDevelopmentRadarChart from "../components/reusable-ui/SkillDevelopmentRadarChart";

export default function Dashboard({ onStartCourse }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                p: 3,
            }}
        >
            <ContinueLearningCard onStart={onStartCourse} />

            <CourseCompletionProgress />
            <SkillDevelopmentRadarChart />
        </Box>
    )
}