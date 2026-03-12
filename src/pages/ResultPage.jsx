import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export default function ResultPage({ score, total, answers, onRetry, onBack }) {

  const percentage = (score / total) * 100
  const passed = percentage >= 80

  return (
    <Box sx={{ p: 4 }}>

      <Typography variant="h4" sx={{ mb: 4 }}>
        Quiz Result
      </Typography>

      {/* PASS / FAIL */}

      <Box sx={{ textAlign: "center", mb: 6 }}>

        <Typography
          sx={{
            fontSize: 48,
            fontWeight: 700,
            color: passed ? "#22c55e" : "#ef4444"
          }}
        >
          {passed ? "PASSED" : "FAILED"}
        </Typography>

        <Typography sx={{ fontSize: 36, mt: 2 }}>
          {score} / {total}
        </Typography>

      </Box>

      {/* QUIZ REVIEW */}

      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 600,
          mb: 3
        }}
      >
        Quiz Review
      </Typography>

      {answers.map((item, index) => {

        const color = item.correct ? "#22c55e" : "#ef4444"

        return (
          <Accordion key={index} sx={{ mb: 2 }}>

            <AccordionSummary expandIcon={<ExpandMoreIcon />}>

              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>

                <Typography sx={{ color, fontWeight: "bold" }}>
                  {item.correct ? "✓" : "✕"}
                </Typography>

                <Box>

                  <Typography sx={{ fontWeight: 600 }}>
                    {item.question}
                  </Typography>

                  <Typography sx={{ color: "gray" }}>
                    {item.correct ? "Correct" : "Incorrect"}
                  </Typography>

                </Box>

              </Box>

            </AccordionSummary>

            <AccordionDetails>

              {!item.correct && (
                <>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Your Answer:</strong> {item.userAnswer}
                  </Typography>

                  <Typography sx={{ mb: 1 }}>
                    <strong>Correct Answer:</strong> {item.correctAnswer}
                  </Typography>
                </>
              )}

              <Typography>
                <strong>Explanation:</strong> {item.explanation}
              </Typography>

            </AccordionDetails>

          </Accordion>
        )
      })}

      {/* BUTTONS */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 6
        }}
      >

        <Button variant="outlined" onClick={onBack}>
          Go Back Home
        </Button>

        {!passed && (
          <Button variant="contained" onClick={onRetry}>
            Retry Quiz
          </Button>
        )}

      </Box>

    </Box>
  )
}