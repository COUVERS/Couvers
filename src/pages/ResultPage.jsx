import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import SkillAccuracyBar from "../components/reusable-ui/SkillAccuracyBar"

export default function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { courseId, lessonId } = useParams()
  const isMobile = useMediaQuery("(max-width:600px)")

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
    <Box
      sx={{
        px: { xs: 3, sm: 4 },
        pt: { xs: 3, sm: 4 },
        pb: { xs: 12, sm: 4 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "28px", sm: "40px" },
          fontWeight: 600,
          mb: { xs: 4, sm: 5 },
          color: "var(--Color-Primary-Main)",
          lineHeight: 1.1,
        }}
      >
        Quiz Result
      </Typography>

      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 5, sm: 6 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 44, sm: 48 },
            fontWeight: 700,
            color: passed ? "#10B981" : "#EF4444",
            lineHeight: 1.1,
          }}
        >
          {passed ? "PASSED" : "FAILED"}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 44, sm: 36 },
            mt: { xs: 3, sm: 2 },
            fontWeight: 600,
            color: "var(--Color-Primary-Main)",
            lineHeight: 1.1,
          }}
        >
          {score} / {total}
        </Typography>
      </Box>

      <Box sx={{ mb: { xs: 5, sm: 5 } }}>
        <SkillAccuracyBar
          title="Skill Accuracy"
          label={skillProgress?.skillName || "Skill"}
          previous={previousSkillScore}
          current={currentSkillScore}
        />
      </Box>

      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 600,
          mb: 3,
          color: "#0F172A",
          lineHeight: 1.1,
        }}
      >
        Quiz Review
      </Typography>

      {answers.map((item, index) => {
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
                    fontSize: { xs: 28, sm: 32 },
                  }}
                />
              }
              sx={{
                minHeight: { xs: "88px", sm: "80px" },
                px: { xs: "16px", sm: "24px" },
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
                  gap: { xs: "14px", sm: "20px" },
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 28, sm: 36 },
                    height: { xs: 28, sm: 36 },
                    color: item.correct ? "#10B981" : "#EF4444",
                    flexShrink: 0,
                  }}
                >
                  {item.correct ? (
                    <CheckIcon sx={{ fontSize: { xs: 28, sm: 36 } }} />
                  ) : (
                    <CloseIcon sx={{ fontSize: { xs: 28, sm: 36 } }} />
                  )}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "18px", sm: "20px" },
                      color: "#0F172A",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.question}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748B",
                      fontSize: { xs: "12px", sm: "16px" },
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
                px: { xs: "16px", sm: "24px" },
                pb: { xs: "16px", sm: "24px" },
                pt: 0,
                backgroundColor: "#FFF",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "#0F172A",
                  fontSize: { xs: "16px", sm: "18px" },
                }}
              >
                Your Answer
              </Typography>
              <Typography
                sx={{
                  mb: 3,
                  color: "#0F172A",
                  fontSize: { xs: "14px", sm: "16px" },
                  lineHeight: 1.45,
                }}
              >
                {item.userAnswer}
              </Typography>

              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "#0F172A",
                  fontSize: { xs: "16px", sm: "18px" },
                }}
              >
                Correct Answer
              </Typography>
              <Typography
                sx={{
                  mb: 3,
                  color: "#0F172A",
                  fontSize: { xs: "14px", sm: "16px" },
                  lineHeight: 1.45,
                }}
              >
                {item.correctAnswer}
              </Typography>

              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "#0F172A",
                  fontSize: { xs: "16px", sm: "18px" },
                }}
              >
                Explanation
              </Typography>
              <Typography
                sx={{
                  color: "#0F172A",
                  fontSize: { xs: "14px", sm: "16px" },
                  lineHeight: 1.45,
                }}
              >
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
          px: { xs: "24px", sm: "56px" },
          py: { xs: "16px", sm: "24px" },
          width: "100%",
          boxSizing: "border-box",
          gap: { xs: 1, sm: 2 },
          flexWrap: "nowrap",
          "@media (max-width:600px)": {
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
            mt: 0,
            background: "var(--Color-Background-Paper, #FFF)",
            boxShadow:
              "0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 4px -1px rgba(0, 0, 0, 0.20)",
          },
        }}
      >
        {passed ? (
          <>
            {isMobile ? (
              <Button
                variant="outlined"
                onClick={handleGoHome}
                sx={{
                  width: "50%",
                  minWidth: 0,
                  height: "48px",
                  px: "12px",
                  py: "12px",
                  borderRadius: "4px",
                  border: "1px solid rgba(46, 42, 95, 0.50)",
                  color: "#2E2A5F",
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: "12px",
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
            ) : (
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
            )}

            <Button
              variant="contained"
              onClick={handleNextLesson}
              sx={{
                width: isMobile ? "50%" : "160px",
                minWidth: 0,
                height: "48px",
                px: isMobile ? "12px" : "40px",
                py: "12px",
                borderRadius: "4px",
                backgroundColor: "#6B63FF",
                boxShadow:
                  "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: isMobile ? "12px" : "15px",
                fontWeight: 500,
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
                width: isMobile ? "50%" : "160px",
                minWidth: 0,
                height: "48px",
                px: isMobile ? "12px" : "40px",
                py: "12px",
                borderRadius: "4px",
                border: "1px solid rgba(46, 42, 95, 0.50)",
                color: "#2E2A5F",
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: isMobile ? "12px" : "15px",
                fontWeight: 500,
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
              onClick={handleRetryQuiz}
              sx={{
                width: isMobile ? "50%" : "160px",
                minWidth: 0,
                height: "48px",
                px: isMobile ? "12px" : "40px",
                py: "12px",
                borderRadius: "4px",
                backgroundColor: "#6B63FF",
                boxShadow:
                  "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: isMobile ? "12px" : "15px",
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