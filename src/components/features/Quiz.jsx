import { useState } from "react"
import { styled } from "@mui/material/styles"
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  Button
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"


/* =========================
   Styled Components
========================= */

const Container = styled(Box)(() => ({
  padding: "0 48px 48px 48px",
  width: "100%",
  boxSizing: "border-box",
}))

const SectionTitle = styled(Typography)(() => ({
  fontSize: "var(--FontSize-Headings-h2)",
  fontWeight: 600,
  marginBottom: "8px",
  lineHeight: 1.1,
}))

const QuestionTitle = styled(Typography)(() => ({
  fontSize: "var(--FontSize-Headings-h3)",
  fontWeight: 600,
  padding: "0 56px",
  marginTop: "20px",
  marginBottom: "16px",
  lineHeight: 1.1,
}))

const BodyText = styled(Typography)(() => ({
  fontSize: "var(--FontSize-Body1)",
  marginBottom: "40px",
  color: "var(--Color-Text-Secondary)"
}))

const AnswersContainer = styled(Box)(() => ({
  display: "flex",
  padding: "12px 56px 24px 56px",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
  boxSizing: "border-box",
}))

/* =========================
   OPTION STYLE
========================= */

const OptionWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "selected" &&
    prop !== "correct" &&
    prop !== "incorrect"
})(({ selected, correct, incorrect }) => {
  let border = "1px solid #A5B4FC"
  let background = "transparent"
  let color = "#0F172A"

  if (correct) {
    border = "1px solid #10B981"
    background = "#10B981"
    color = "#FFFFFF"
  } else if (incorrect) {
    border = "1px solid #EF4444"
    background = "#EF4444"
    color = "#FFFFFF"
  } else if (selected) {
    border = "1px solid rgba(107, 99, 255, 0.08)"
    background = "#A5B4FC"
    color = "#0F172A"
  }

  return {
    border,
    borderRadius: "12px",
    minWidth: "320px",
    padding: "12px",
    width: "100%",
    backgroundColor: background,
    color,
    display: "flex",
    alignItems: "center",
    gap: "20px",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  }
})

const SubmitButton = styled(Button)(() => ({
  width: "160px",
  height: "48px",
  padding: "12px 40px",
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

  "&.Mui-disabled": {
    backgroundColor: "#C7C3FF",
    color: "#FFF",
  },
}))
const ScenarioWrapper = styled(Box)(() => ({
  display: "flex",
  padding: "8px 56px 20px 56px",
  flexDirection: "column",
  gap: "12px",
  boxSizing: "border-box",
}))

/* =========================
   COMPONENT
========================= */

export default function Quiz({
  question,
  questionNumber,
  totalQuestions,
  onSubmit,
  isLastQuestion,
  onBack
}) {
  const [selected, setSelected] = useState("")
  const [showResult, setShowResult] = useState(false)

  if (!question) return null

  const handleSubmit = () => {
    if (!showResult) {
      setShowResult(true)

      if (isLastQuestion && onSubmit) {
        onSubmit(selected)
      }

      return
    }

    if (onSubmit) onSubmit(selected)
  }

  const shouldHideActionButton = showResult && isLastQuestion

  return (
    <Container>
      <ScenarioWrapper>
        <SectionTitle>Scenario</SectionTitle>
        <BodyText>{question.scenario}</BodyText>

        <SectionTitle>
          Question ({questionNumber}/{totalQuestions})
        </SectionTitle>

        <Typography sx={{ fontSize: "var(--FontSize-Body1)" }}>
          {question.question}
        </Typography>
      </ScenarioWrapper>

      <QuestionTitle>Select Your Answer</QuestionTitle>

      <AnswersContainer>
        <RadioGroup
          value={selected}
          onChange={(e) => {
            if (!showResult) setSelected(e.target.value)
          }}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }}
        >
          {(question.option || []).map((option) => {
            const isSelected = selected === option
            const isCorrect = option === question.answer

            const correct = showResult && isCorrect
            const incorrect = showResult && isSelected && !isCorrect

            return (
              <OptionWrapper
                key={option}
                selected={isSelected}
                correct={correct}
                incorrect={incorrect}
                onClick={() => {
                  if (!showResult) setSelected(option)
                }}
                sx={{
                  cursor: showResult ? "default" : "pointer"
                }}
              >
                {showResult && correct && (
                  <CheckIcon
                    sx={{
                      fontSize: 28,
                      color: "#FFFFFF",
                      flexShrink: 0,
                    }}
                  />
                )}

                {showResult && incorrect && (
                  <CloseIcon
                    sx={{
                      fontSize: 28,
                      color: "#FFFFFF",
                      flexShrink: 0,
                    }}
                  />
                )}

                {!showResult && (
                  <Radio
                    value={option}
                    checked={selected === option}
                    sx={{
                      mt: "2px",
                      color: "#2E2A5F",
                      "&.Mui-checked": {
                        color: "#4F46E5",
                      },
                    }}
                  />
                )}

                <Typography
                  sx={{
                    fontSize: "var(--FontSize-Body1)",
                    color: "inherit"
                  }}
                >
                  {option}
                </Typography>
              </OptionWrapper>
            )
          })}
        </RadioGroup>
      </AnswersContainer>

      {showResult && (
        <Typography sx={{ marginTop: "16px" }}>
          <strong>Review:</strong> {question.review}
        </Typography>
      )}

      {!shouldHideActionButton && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "48px",
            px: "56px",
            boxSizing: "border-box",
          }}
        >
          <Button
            variant="outlined"
            onClick={onBack}
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
            Return to Lecture
          </Button>

          <SubmitButton
            variant="contained"
            disabled={!selected}
            onClick={handleSubmit}
          >
            {showResult ? "Next Question" : "Submit Answer"}
          </SubmitButton>
        </Box>
      )}
    </Container>
  )
}