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
          <Accordion
            key={index}
            defaultExpanded={index === 0}
            disableGutters
            sx={{
              mb: 2,
              border: "1px solid #d1d5db",
              borderRadius: "16px",
              boxShadow: "none",
              overflow: "hidden",
              backgroundColor: "#fff",
              "&:before": {
                display: "none"
              }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                px: 3,
                py: 2,
                "& .MuiAccordionSummary-content": {
                  margin: 0
                }
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Typography
                  sx={{
                    color,
                    fontWeight: "bold",
                    fontSize: 24,
                    lineHeight: 1,
                    mt: "2px"
                  }}
                >
                  {item.correct ? "✓" : "✕"}
                </Typography>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#0f172a"
                    }}
                  >
                    {item.question}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6b7280",
                      fontSize: 16,
                      mt: 0.5
                    }}
                  >
                    {item.correct ? "Correct" : "Incorrect"}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                px: 3,
                pb: 3,
                pt: 0
              }}
            >
              <Typography sx={{ fontWeight: 700, mb: 1, color: "#0f172a" }}>
                Your Answer
              </Typography>
              <Typography sx={{ mb: 3, color: "#0f172a" }}>
                {item.userAnswer}
              </Typography>

              <Typography sx={{ fontWeight: 700, mb: 1, color: "#0f172a" }}>
                Correct Answer
              </Typography>
              <Typography sx={{ mb: 3, color: "#0f172a" }}>
                {item.correctAnswer}
              </Typography>

              <Typography sx={{ fontWeight: 700, mb: 1, color: "#0f172a" }}>
                Explanation
              </Typography>
              <Typography sx={{ color: "#0f172a" }}>
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
          mt: 6
        }}
      >
        <Button variant="outlined" onClick={onBack}>
          Review Lecture
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