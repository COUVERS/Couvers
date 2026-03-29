import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import SkillAccuracyBar from "../components/reusable-ui/SkillAccuracyBar"

export default function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { courseId, lessonId } = useParams()

  const resultData = location.state?.resultData

  if (!resultData) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">No result data found.</Typography>
      </Box>
    )
  }

  const score = resultData.correctCount ?? 0
  const total = resultData.totalQuestions ?? 0
  const answers =
    resultData.results?.map((item) => ({
      question: item.question,
      userAnswer: item.selectedAnswer,
      correctAnswer: item.correctAnswer,
      explanation: item.review,
      correct: item.isCorrect,
    })) ?? []

  const skillProgress = resultData.skillProgress
  console.log("skillProgress:", skillProgress)
  const percentage = total > 0 ? (score / total) * 100 : 0
  const passed = percentage >= 80

  const currentSkillScore =
    skillProgress?.totalLessons > 0
      ? (skillProgress.passedLessons / skillProgress.totalLessons) * 100
      : 0

  const previousSkillScore = 0

  const handleGoHome = () => {
    navigate("/")
  }

  const handleRetryQuiz = () => {
    navigate(`/courses/${courseId}/lessons/${lessonId}/quiz`)
  }

  const handleReviewLecture = () => {
    navigate(`/courses/${courseId}/lessons/${lessonId}/lecture`)
  }

  const handleNextLesson = () => {
    const nextLessonId = resultData.nextLessonId || resultData.nextLesson?._id

    if (nextLessonId) {
      navigate(`/courses/${courseId}/lessons/${nextLessonId}`)
      return
    }

    navigate(`/courses/${courseId}`)
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "var(--Color-Primary-Main)",
          fontWeight: 600,
        }}
      >
        Quiz Result
      </Typography>

      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          sx={{
            fontSize: 48,
            fontWeight: 700,
            color: passed ? "#10B981" : "#EF4444",
          }}
        >
          {passed ? "PASSED" : "FAILED"}
        </Typography>

        <Typography
          sx={{
            fontSize: 36,
            mt: 2,
            fontWeight: 600,
            color: "#0F172A",
          }}
        >
          {score} / {total}
        </Typography>
      </Box>

      {passed && (
        <Box sx={{ mb: 5 }}>
          <SkillAccuracyBar
            title="Skill Accuracy"
            label={skillProgress?.skillName || "Skill"}
            previous={previousSkillScore}
            current={currentSkillScore}
          />
        </Box>
      )}

      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 600,
          mb: 3,
          color: "#0F172A",
        }}
      >
        Quiz Review
      </Typography>

      {answers.map((item, index) => {
        const color = item.correct ? "#22c55e" : "#ef4444"

        return (
          <Accordion
            key={index}
            defaultExpanded={!passed && index === 0}
            disableGutters
            sx={{
              mb: 2,
              border: "1px solid #A5B4FC",
              borderRadius: "0px",
              boxShadow: "none",
              overflow: "hidden",
              backgroundColor: "#FFF",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    color: "#0F172A",
                    fontSize: 32,
                  }}
                />
              }
              sx={{
                minHeight: "80px",
                height: "80px",
                px: "24px",
                py: 0,
                justifyContent: "space-between",
                alignItems: "center",
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                  alignItems: "center",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    color: item.correct ? "#10B981" : "#EF4444",
                    flexShrink: 0,
                  }}
                >
                  {item.correct ? (
                    <CheckIcon sx={{ fontSize: 36 }} />
                  ) : (
                    <CloseIcon sx={{ fontSize: 36 }} />
                  )}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "20px",
                      color: "#0F172A",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.question}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748B",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.correct ? "Correct" : "Incorrect"}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                px: "24px",
                pb: "24px",
                pt: 0,
                backgroundColor: "#FFF",
              }}
            >
              <Typography sx={{ fontWeight: 700, mb: 1, color: "#0F172A", fontSize: "18px" }}>
                Your Answer
              </Typography>
              <Typography sx={{ mb: 3, color: "#0F172A", fontSize: "16px" }}>
                {item.userAnswer}
              </Typography>

              <Typography sx={{ fontWeight: 700, mb: 1, color: "#0F172A", fontSize: "18px" }}>
                Correct Answer
              </Typography>
              <Typography sx={{ mb: 3, color: "#0F172A", fontSize: "16px" }}>
                {item.correctAnswer}
              </Typography>

              <Typography sx={{ fontWeight: 700, mb: 1, color: "#0F172A", fontSize: "18px" }}>
                Explanation
              </Typography>
              <Typography sx={{ color: "#0F172A", fontSize: "16px" }}>
                {item.explanation}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 6,
          px: "56px",
          py: "24px",
          width: "100%",
          boxSizing: "border-box",
          gap: 2,
          flexWrap: "nowrap",
        }}
      >
        {passed ? (
          <>
            <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <Button
                variant="outlined"
                onClick={handleGoHome}
                sx={{
                  width: "160px",
                  height: "48px",
                  px: "40px",
                  py: "12px",
                  borderRadius: "4px",
                  border: "1px solid rgba(46, 42, 95, 0.50)",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  color: "#2E2A5F",
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: "15px",
                  fontWeight: 500,
                  letterSpacing: "0.2px",
                  textTransform: "none",

                  "&:hover": {
                    border: "1px solid rgba(46, 42, 95, 0.80)",
                    backgroundColor: "rgba(46, 42, 95, 0.04)",
                  },
                }}
              >
                Go Back Home
              </Button>

              <Button
                variant="text"
                onClick={handleRetryQuiz}
                sx={{
                  color: "#6B63FF",
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: "15px",
                  fontWeight: 500,
                  letterSpacing: "0.2px",
                  textTransform: "none",
                  padding: 0,
                  minWidth: "auto",

                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Retry Quiz
              </Button>
            </Box>

            <Button
              variant="contained"
              onClick={handleNextLesson}
              sx={{
                width: "160px",
                height: "48px",
                px: "40px",
                py: "12px",
                borderRadius: "4px",
                backgroundColor: "#6B63FF",
                boxShadow:
                  "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: "15px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
                letterSpacing: "0.2px",
                textTransform: "none",

                "&:hover": {
                  backgroundColor: "#5a52e0",
                },
              }}
            >
              Next Lesson
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              onClick={handleReviewLecture}
              sx={{
                width: "160px",
                height: "48px",
                px: "40px",
                py: "12px",
                borderRadius: "4px",
                border: "1px solid rgba(46, 42, 95, 0.50)",
                color: "#2E2A5F",
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: "15px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
                letterSpacing: "0.2px",
                textTransform: "none",
                boxSizing: "border-box",
                "&:hover": {
                  border: "1px solid rgba(46, 42, 95, 0.80)",
                  backgroundColor: "rgba(46, 42, 95, 0.04)",
                },
              }}
            >
              Review Lecture
            </Button>

            <Button
              variant="contained"
              onClick={handleRetryQuiz} // o handleNextLesson
              sx={{
                width: "160px",
                height: "48px",
                px: "40px",
                py: "12px",
                borderRadius: "4px",
                backgroundColor: "#6B63FF",
                boxShadow:
                  "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",

                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: "15px",
                fontWeight: 500,
                letterSpacing: "0.2px",
                textTransform: "none",

                "&:hover": {
                  backgroundColor: "#5a52e0",
                },
              }}
            >
              Retry Quiz
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}