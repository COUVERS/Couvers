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
  backgroundColor: "var(--Color-Background-Paper)",
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
  marginBottom: "24px"
}))

const BodyText = styled(Typography)(() => ({
  fontSize: "var(--FontSize-Body1)",
  marginBottom: "40px",
  color: "var(--Color-Text-Secondary)"
}))

const OptionWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected"
})(({ selected }) => ({
  border: selected
    ? "2px solid var(--Color-Border-Active)"
    : "1px solid var(--Color-Border-Default)",
  borderRadius: "12px",
  padding: "18px 20px",
  marginBottom: "16px",
  backgroundColor: selected
    ? "var(--Color-Primary-_States-Selected)"
    : "transparent",
  transition: "all 0.2s ease",
  cursor: "pointer"
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

      {/* Scenario */}
      <SectionTitle>Scenario</SectionTitle>
      <BodyText>{question.scenario}</BodyText>

      {/* Question */}
      <SectionTitle>
        Question ({questionNumber}/{totalQuestions})
      </SectionTitle>

      <Typography
        sx={{
          fontSize: "var(--FontSize-Body1)",
          marginBottom: "40px"
        }}
      >
        {question.question}
      </Typography>

      <QuestionTitle>Select Your Answer</QuestionTitle>

      <RadioGroup
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
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