import { Box, Typography, IconButton } from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

const SIZE = 200
const CENTER = SIZE / 2
const RADIUS = 60
const LEVELS = 4

function polarToCartesian(cx, cy, radius, angle) {
  const rad = ((angle - 90) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  }
}

function polygonPoints(cx, cy, radius, count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (360 / count) * i
    const p = polarToCartesian(cx, cy, radius, angle)
    return `${p.x},${p.y}`
  }).join(" ")
}

function dataPoints(cx, cy, radius, data) {
  return data
    .map((item, i) => {
      const angle = (360 / data.length) * i
      const scaled = (item.value / 100) * radius
      const p = polarToCartesian(cx, cy, scaled, angle)
      return `${p.x},${p.y}`
    })
    .join(" ")
}

export default function SkillDevelopmentRadarChart({ metrics }) {

  const defaultMetrics = [
    { label: "Lesson Structure", value: 82 },
    { label: "Explanation Clarity", value: 75 },
    { label: "Assessment", value: 20 },
    { label: "Pacing", value: 80 },
    { label: "Student Engagement", value: 52 },
  ]

  const data = metrics || defaultMetrics

 const labelPositions = [
  { top: -40, left: "50%", transform: "translateX(-50%)" },
  { top: "35%", right: -80 },
  { bottom: -40, right: 30 },
  { bottom: -40, left: 30 },
  { top: "35%", left: -80 },
]

  return (
    <Box
      sx={{
        width: "100%",
        background: "#F7F7F8",
        borderRadius: 4,
        p: 4,
      }}
    >

      {/* HEADER */}

      <Box display="flex" alignItems="center" gap={1} mb={4}>
        <Typography fontSize={28} fontWeight={700}>
          Skill Development
        </Typography>

        <IconButton
          size="small"
          sx={{
            width: 32,
            height: 32,
            background: "var(--Color-Primary-Main)",
            color: "#fff",
            "&:hover": {
              background: "var(--Color-Primary-Main)",
            },
          }}
        >
          <HelpOutlineIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* CHART */}

      <Box
  sx={{
    position: "relative",
    width: SIZE,
    height: SIZE,
    ml: "120px",   // mueve el radar hacia la derecha
    mt: 6
  }}
>

        {/* LABELS */}

        {data.map((m, i) => (
          <Box
            key={m.label}
            sx={{
              position: "absolute",
              textAlign: "center",
              ...labelPositions[i],
            }}
          >
            <Typography fontSize={14} fontWeight={600}>
              {m.label}
            </Typography>

            <Typography fontSize={14}>
              {m.value}%
            </Typography>
          </Box>
        ))}

        {/* SVG */}

        <svg width={SIZE} height={SIZE}>

          {Array.from({ length: LEVELS }, (_, i) => {
            const r = (RADIUS / LEVELS) * (i + 1)

            return (
              <polygon
                key={i}
                points={polygonPoints(CENTER, CENTER, r, data.length)}
                fill="none"
                stroke="#9CA3AF"
                strokeDasharray="4 4"
              />
            )
          })}

          <polygon
            points={dataPoints(CENTER, CENTER, RADIUS, data)}
            fill="rgba(99,102,241,0.3)"
            stroke="var(--Color-Primary-Main)"
            strokeWidth={2}
          />

        </svg>
      </Box>
    </Box>
  )
}