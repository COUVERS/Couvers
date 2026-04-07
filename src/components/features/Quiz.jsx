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

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  boxSizing: "border-box",
  padding: "0 48px 0 48px",

  [theme.breakpoints.down("sm")]: {
    padding: "0 0 104px 0",
  },
}))

const SmallSectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"IBM Plex Sans", sans-serif',
  fontWeight: 600,
  color: "var(--Color-Text-Primary)",
  fontSize: "32px",
  lineHeight: 1.2,
  marginBottom: "8px",

  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
    lineHeight: "28px",
    marginBottom: "8px",
  },
}))

const QuestionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"IBM Plex Sans", sans-serif',
  fontWeight: 600,
  color: "var(--Color-Text-Primary)",
  padding: "0 32px",
  marginTop: "12px",
  marginBottom: "12px",
  fontSize: "32px",
  lineHeight: 1.2,

  [theme.breakpoints.down("sm")]: {
    padding: "0 24px",
    marginTop: "8px",
    marginBottom: "8px",
    fontSize: "18px",
    lineHeight: "28px",
  },
}))

const BodyText = styled(Typography)(({ theme }) => ({
  fontFamily: '"IBM Plex Sans", sans-serif',
  fontSize: "16px",
  lineHeight: "24px",
  color: "var(--Color-Text-Secondary)",
  marginBottom: "0",

  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
    lineHeight: "24px",
  },
}))

const AnswersContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "16px 32px 24px 32px",
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
  flexDirection: "column",
  padding: "24px 32px",
  gap: "24px",
  boxSizing: "border-box",

  "@media (max-height:820px) and (min-width:601px)": {
    padding: "20px 32px",
    gap: "16px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "32px 24px",
    gap: "24px",
  },
}))

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
      return
    }

    if (onSubmit) {
      onSubmit(selected, { isFinal: isLastQuestion })
    }
  }

  return (
    <Container>
      <ScenarioWrapper>
        <Box>
          <SmallSectionTitle>Scenario</SmallSectionTitle>
          <BodyText>{question.scenario}</BodyText>
        </Box>

        <Box>
          <SmallSectionTitle>
            Question ({questionNumber}/{totalQuestions})
          </SmallSectionTitle>

          <Typography
            sx={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: "16px",
              lineHeight: "24px",
              color: "var(--Color-Text-Primary)",
              "@media (max-width:600px)": {
                fontSize: "16px",
                lineHeight: "24px",
              },
            }}
          >
            {question.question}
          </Typography>
        </Box>
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
            marginBottom: { xs: "24px", sm: "32px" },
            px: { xs: "24px", sm: "56px" },
            fontSize: { xs: "14px", sm: "var(--FontSize-Body1)" },
            color: "var(--Color-Text-Primary)",
          }}
        >
          <strong>Review:</strong> {question.review}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: showResult && isLastQuestion ? "flex-end" : "space-between",
          alignItems: "center",
          mt: { xs: "24px", sm: 0 },
          ml: { xs: 0, sm: "-48px" },
          width: { xs: "100%", sm: "calc(100% + 96px)" },
          minHeight: { xs: "80px", sm: "104px" },
          pl: { xs: "24px", sm: "56px" },
          pr: { xs: "24px", sm: "110px" },
          pt: { xs: "16px", sm: "24px" },
          pb: { xs: "16px", sm: "24px" },
          background: "var(--Color-Background-Paper)",
          boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.12)",
          boxSizing: "border-box",

          "@media (max-width:600px)": {
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
            mt: 0,
            ml: 0,
            width: "100%",
            minHeight: "80px",
            pl: "24px",
            pr: "24px",
            pt: "16px",
            pb: "16px",
            gap: "8px",
            justifyContent: showResult && isLastQuestion ? "flex-end" : "space-between",
          },
        }}
      >
        {!(showResult && isLastQuestion) && (
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
              whiteSpace: "nowrap",
              "&:hover": {
                border: "1px solid var(--Color-Secondary-_States-OutlinedHovered)",
                backgroundColor: "var(--Color-Secondary-_States-HoverSubtle)",
              },
            }}
          >
            Return to Lecture
          </Button>
        )}

        <SubmitButton
          variant="contained"
          disabled={!selected && !showResult}
          onClick={handleSubmit}
          sx={{
            "@media (max-width:600px)": {
              width: "50%",
              minWidth: 0,
              fontSize: "12px",
            },
          }}
        >
          {showResult
            ? isLastQuestion
              ? "Check the Result"
              : "Next Question"
            : "Submit Answer"}
        </SubmitButton>
      </Box>
    </Container>
  )
}