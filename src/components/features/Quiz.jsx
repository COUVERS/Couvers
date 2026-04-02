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

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  boxSizing: "border-box",
  padding: "0 48px 0 48px",

  [theme.breakpoints.down("sm")]: {
    padding: "0 0 16px 0",
  },
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "var(--FontSize-Headings-h2)",
  fontWeight: 600,
  marginBottom: "8px",
  lineHeight: 1.1,
  color: "var(--Color-Text-Primary)",

  [theme.breakpoints.down("sm")]: {
    fontSize: "44px",
    marginBottom: "6px",
  },
}))

const QuestionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "var(--FontSize-Headings-h3)",
  fontWeight: 600,
  padding: "0 32px",
  marginTop: "8px",
  marginBottom: "12px",
  lineHeight: 1.1,
  color: "var(--Color-Text-Primary)",

  [theme.breakpoints.down("sm")]: {
    padding: "0 24px",
    marginTop: "0",
    marginBottom: "8px",
    fontSize: "28px",
  },
}))

const BodyText = styled(Typography)(({ theme }) => ({
  fontSize: "var(--FontSize-Body1)",
  marginBottom: "20px",
  color: "var(--Color-Text-Secondary)",

  [theme.breakpoints.down("sm")]: {
    marginBottom: "16px",
    fontSize: "15px",
    lineHeight: 1.5,
  },
}))

const AnswersContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "8px 32px 12px 32px",
  flexDirection: "column",
  gap: "12px",
  width: "100%",
  boxSizing: "border-box",

  [theme.breakpoints.down("sm")]: {
    padding: "8px 24px 12px 24px",
    gap: "8px",
  },
}))

const ScenarioWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "8px 32px 12px 32px",
  flexDirection: "column",
  gap: "8px",
  boxSizing: "border-box",

  [theme.breakpoints.down("sm")]: {
    padding: "32px 24px 8px 24px",
    gap: "8px",
  },
}))

/* =========================
   OPTION STYLE
========================= */

const OptionWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "selected" &&
    prop !== "correct" &&
    prop !== "incorrect"
})(({ selected, correct, incorrect, theme }) => {
  let border = "1px solid var(--Color-Border-Default)"
  let background = "transparent"
  let color = "var(--Color-Text-Primary)"

  if (correct) {
    border = "1px solid var(--Color-Success-Main)"
    background = "var(--Color-Success-Main)"
    color = "var(--Color-Success-Contrast)"
  } else if (incorrect) {
    border = "1px solid var(--Color-Error-Main)"
    background = "var(--Color-Error-Main)"
    color = "var(--Color-Error-Contrast)"
  } else if (selected) {
    border = "1px solid var(--Color-Primary-_States-Selected)"
    background = "var(--Color-Primary-Light)"
    color = "var(--Color-Secondary-Dark)"
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

    [theme.breakpoints.down("sm")]: {
      minWidth: 0,
      padding: "12px 14px",
      gap: "12px",
      borderRadius: "16px",
    },
  }
})

const SubmitButton = styled(Button)(({ theme }) => ({
  width: "fit-content",
  height: "48px",
  padding: "12px 40px",
  borderRadius: "4px",
  backgroundColor: "var(--Color-Primary-Main)",
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
    backgroundColor: "var(--Color-Primary-Dark)",
  },

  "&.Mui-disabled": {
    backgroundColor: "var(--Color-Action-Disabled)",
    color: "var(--Color-Text-Disabled)",
  },

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "48px",
    padding: "12px 16px",
  },
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

        <Typography
          sx={{
            fontSize: "var(--FontSize-Body1)",
            color: "var(--Color-Text-Primary)",
            "@media (max-width:600px)": {
              fontSize: "15px",
              lineHeight: 1.5,
            },
          }}
        >
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
            gap: "16px",
            "@media (max-width:600px)": {
              gap: "12px",
            },
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
                {/* 🔥 ICON / RADIO FIX */}
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {!showResult ? (
                    <Radio
                      value={option}
                      checked={selected === option}
                      sx={{
                        mt: "2px",
                        color: "var(--Color-Secondary-Main)",
                        "&.Mui-checked": {
                          color: "var(--Color-Primary-Dark)",
                        },
                        "@media (max-width:600px)": {
                          p: "6px",
                          mr: "2px",
                        },
                      }}
                    />
                  ) : correct ? (
                    <CheckIcon
                      sx={{
                        fontSize: 28,
                        color: "var(--Color-Success-Contrast)",
                      }}
                    />
                  ) : incorrect ? (
                    <CloseIcon
                      sx={{
                        fontSize: 28,
                        color: "var(--Color-Error-Contrast)",
                      }}
                    />
                  ) : null}
                </Box>

                <Typography
                  sx={{
                    fontSize: "var(--FontSize-Body1)",
                    color: "inherit",
                    "@media (max-width:600px)": {
                      fontSize: "14px",
                      lineHeight: 1.45,
                    },
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
        <Typography
          sx={{
            marginTop: "16px",
            px: { xs: "24px", sm: "56px" },
            fontSize: { xs: "14px", sm: "var(--FontSize-Body1)" },
            color: "var(--Color-Text-Primary)",
          }}
        >
          <strong>Review:</strong> {question.review}
        </Typography>
      )}

      {!shouldHideActionButton && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "24px",
            px: "32px",
            boxSizing: "border-box",

            "@media (max-width:600px)": {
              position: "fixed",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1200,
              mt: 0,

              px: "24px",
              py: "16px",

              background: "var(--Color-Background-Paper)",
              boxShadow:
                "0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 4px -1px rgba(0, 0, 0, 0.20)",

              flexDirection: "row",
              gap: "8px",
              boxSizing: "border-box",
            },
          }}
        >
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
              width: "fit-content",
              height: "48px",
              px: "24px",
              py: "12px",
              borderRadius: "4px",
              border: "1px solid var(--Color-Secondary-_States-Outlined)",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              color: "var(--Color-Secondary-Main)",
              fontSize: "15px",
              fontWeight: 500,
              textTransform: "none",
              whiteSpace: "nowrap", // 🔥 importante

              "&:hover": {
                border: "1px solid var(--Color-Secondary-_States-OutlinedHovered)",
                backgroundColor: "var(--Color-Secondary-_States-HoverSubtle)",
              },
            }}
          >
            Return to Lecture
          </Button>

          <SubmitButton
            variant="contained"
            disabled={!selected}
            onClick={handleSubmit}
            sx={{
              "@media (max-width:600px)": {
                width: "50%",
                minWidth: 0,
                fontSize: "12px",
              },
            }}
          >
            {showResult ? "Next Question" : "Submit Answer"}
          </SubmitButton>
        </Box>
      )}
    </Container>
  )
}