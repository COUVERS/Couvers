import { useState } from "react"
import { styled } from "@mui/material/styles"
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button
} from "@mui/material"

/* =========================
   Styled Components
========================= */

const Container = styled(Box)(() => ({
  padding: "0 48px 48px 48px",
  width: "100%"
}))

const SectionTitle = styled(Typography)(() => ({
  fontSize: "var(--FontSize-Headings-h2)",
  fontWeight: 600,
  marginBottom: "16px"
}))

const QuestionTitle = styled(Typography)(() => ({
  fontSize: "var(--FontSize-Headings-h3)",
  fontWeight: 600,
  padding: "0 56px",
  marginTop: "32px",
  marginBottom: "24px"
}))

const BodyText = styled(Typography)(() => ({
  fontSize: "var(--FontSize-Body1)",
  marginBottom: "40px",
  color: "var(--Color-Text-Secondary)"
}))

const AnswersContainer = styled(Box)(() => ({
  display: "flex",
  padding: "16px 56px 32px 56px",
  flexDirection: "column",
  gap: "24px",
  width: "100%"
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

  let border = "2px solid var(--color-outline)"
  let background = "transparent"
  let color = "inherit"

  if (correct) {
    border = "2px solid #22c55e"
    background = "#22c55e"
    color = "white"
  } else if (incorrect) {
    border = "2px solid #ef4444"
    background = "#ef4444"
    color = "white"
  } else if (selected) {
    border = "2px solid var(--color-primary)"
    background = "rgba(107, 99, 255, 0.18)"
  }

  return {
    border,
    borderRadius: "12px",
    padding: "18px 20px",
    width: "100%",
    backgroundColor: background,
    color,
    display: "flex",
    alignItems: "center",
    gap: "16px",
    transition: "all 0.2s ease"
  }
})

const SubmitButton = styled(Button)(() => ({
  backgroundColor: "var(--Color-Primary-Main)",
  textTransform: "none",
  borderRadius: "8px",
  padding: "10px 28px"
}))

const ScenarioWrapper = styled(Box)(() => ({
  display: "flex",
  padding: "32px 56px",
  flexDirection: "column",
  gap: "24px"
}))

/* =========================
   COMPONENT
========================= */

export default function Quiz({
  question,
  questionNumber,
  totalQuestions,
  onSubmit
}) {

  const [selected, setSelected] = useState("")
  const [showResult, setShowResult] = useState(false)

  if (!question) return null

  const handleSubmit = () => {

  if (!showResult) {
    setShowResult(true)
    return
  }

  if (onSubmit) onSubmit(selected)

}

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

          {(question.option || []).map((option, index) => {

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
              >

                {/* ICON LEFT */}

                {showResult && correct && (
                  <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                    ✓
                  </Typography>
                )}

                {showResult && incorrect && (
                  <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                    ✕
                  </Typography>
                )}

                {/* RADIO ONLY BEFORE RESULT */}

                {!showResult && (
                  <Radio
                    value={option}
                    checked={selected === option}
                    sx={{
                      color: "var(--Color-Primary-Main)",
                      "&.Mui-checked": {
                        color: "var(--Color-Primary-Main)"
                      }
                    }}
                  />
                )}

                {/* TEXT */}

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

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "48px" }}>
       <SubmitButton
  variant="contained"
  disabled={!selected && !showResult}
  onClick={handleSubmit}
  sx={{ minWidth: 180 }}
>
  {showResult ? "Next Question" : "Send Answer"}
</SubmitButton>
      </Box>

    </Container>
  )
}