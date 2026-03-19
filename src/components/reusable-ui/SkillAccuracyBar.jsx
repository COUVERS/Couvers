import { Box, Typography } from "@mui/material"

export default function SkillAccuracyBar({
  title = "Skill Accuracy",
  label = "Skill",
  previous = 0,
  current = 0
}) {
  const safePrevious = Math.max(0, Math.min(100, Number(previous) || 0))
  const safeCurrent = Math.max(0, Math.min(100, Number(current) || 0))
  const growth = safeCurrent - safePrevious

  return (
    <Box sx={{ width: "100%", mb: 6 }}>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 700,
          color: "#111827",
          mb: 3
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mb: 2
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            color: "#111827"
          }}
        >
          {label}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "flex-end"
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
              Previous
            </Typography>
            <Typography sx={{ fontSize: 16, color: "#374151" }}>
              {safePrevious}%
            </Typography>
          </Box>

          <Typography sx={{ fontSize: 18, color: "#6366f1", mb: "2px" }}>
            →
          </Typography>

          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: 12, color: "#111827" }}>
              Current
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
              {safeCurrent}%
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: 12, color: "#111827" }}>
              Growth
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
              {growth >= 0 ? `(+${growth}%)` : `(${growth}%)`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: 4,
          backgroundColor: "#dbe4ff",
          borderRadius: 999
        }}
      >
        <Box
          sx={{
            width: `${safeCurrent}%`,
            height: "100%",
            backgroundColor: "#6366f1",
            borderRadius: 999
          }}
        />
      </Box>
    </Box>
  )
}