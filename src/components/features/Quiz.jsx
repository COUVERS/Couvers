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
  backgroundColor: "var(--color-surface)",
  borderRadius: "16px",
  padding: "48px",
  maxWidth: "900px"
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
  alignItems: "flex-start",
  gap: "24px",
  alignSelf: "stretch",
  borderRadius: "8px",
  backgroundColor: "var(--color-surface)",
  width: "100%"
}))

const OptionWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected"
})(({ selected }) => ({
  border: selected
    ? "2px solid var(--color-primary)"
    : "2px solid var(--color-outline)",
  borderRadius: "12px",
  padding: "18px 20px",
  width: "100%",
  backgroundColor: selected
    ? "rgba(107, 99, 255, 0.18)"
    : "transparent",
  transition: "all 0.2s ease",
  cursor: "pointer",

  "&:hover": {
    border: "2px solid var(--color-primary)",
    backgroundColor: selected
      ? "rgba(107, 99, 255, 0.18)"
      : "rgba(107, 99, 255, 0.05)"
  }
}))

const SubmitButton = styled(Button)(() => ({
  backgroundColor: "var(--Color-Primary-Main)",
  textTransform: "none",
  borderRadius: "8px",
  padding: "10px 28px",
  "&:hover": {
    backgroundColor: "var(--Color-Primary-Dark)"
  }
}))

const ScenarioWrapper = styled(Box)(() => ({
  display: "flex",
  padding: "32px 56px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "24px",
  alignSelf: "stretch",
  background: "var(--color-surface)"
}))

/* =========================
   Component
========================= */

export default function Quiz({
  question,
  questionNumber,
  totalQuestions,
  onSubmit
}) {
  const [selected, setSelected] = useState("")

  if (!question) return null

  const handleSubmit = () => {
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

      {/* Answers */}
      <QuestionTitle>Select Your Answer</QuestionTitle>

      <AnswersContainer>
        <RadioGroup
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
  sx={{
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  }}
>
          {question.options.map((option, index) => (
            <OptionWrapper
              key={index}
              selected={selected === option}
            >
              <FormControlLabel
                value={option}
                control={
                  <Radio
                    sx={{
                      color: "var(--Color-Primary-Main)",
                      "&.Mui-checked": {
                        color: "var(--Color-Primary-Main)"
                      }
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: "var(--FontSize-Body1)",
                      color: "var(--Color-Text-Primary)"
                    }}
                  >
                    {option}
                  </Typography>
                }
              />
            </OptionWrapper>
          ))}
        </RadioGroup>
      </AnswersContainer>

      {/* Submit */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "48px" }}>
        <SubmitButton
          variant="contained"
          disabled={!selected}
          onClick={handleSubmit}
        >
          Send Answer
        </SubmitButton>
      </Box>

    </Container>
  )
}