import { Box, Typography, IconButton, Skeleton } from "@mui/material"
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
    const point = polarToCartesian(cx, cy, radius, angle)
    return `${point.x},${point.y}`
  }).join(" ")
}

function dataPoints(cx, cy, radius, data) {
  return data
    .map((item, i) => {
      const angle = (360 / data.length) * i
      const scaledRadius = (item.value / 100) * radius
      const point = polarToCartesian(cx, cy, scaledRadius, angle)
      return `${point.x},${point.y}`
    })
    .join(" ")
}

const labelPositions = [
  { top: -40, left: "50%", transform: "translateX(-50%)" },
  { top: "35%", right: -80 },
  { bottom: -40, right: 30 },
  { bottom: -40, left: 30 },
  { top: "35%", left: -80 },
]

function SkillDevelopmentRadarChartLoading() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "#F7F7F8",
        borderRadius: 4,
        p: 4,
      }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={4}>
        <Skeleton variant="text" width={220} height={42} />
        <Skeleton variant="circular" width={32} height={32} />
      </Box>

      <Box
        sx={{
          position: "relative",
          width: SIZE,
          height: SIZE,
          ml: "120px",
          mt: 6,
        }}
      >
        <Skeleton variant="circular" width={SIZE} height={SIZE} />
      </Box>
    </Box>
  )
}

function SkillDevelopmentRadarChartEmpty() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "#F7F7F8",
        borderRadius: 4,
        p: 4,
      }}
    >
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

      <Box
        sx={{
          minHeight: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontSize={16} color="text.secondary">
          No skill data available yet.
        </Typography>
      </Box>
    </Box>
  )
}

export default function SkillDevelopmentRadarChart({
  metrics = [],
  loading = false,
}) {
  if (loading) {
    return <SkillDevelopmentRadarChartLoading />
  }

  if (!Array.isArray(metrics) || metrics.length === 0) {
    return <SkillDevelopmentRadarChartEmpty />
  }

  return (
    <Box
      sx={{
        width: "100%",
        background: "#F7F7F8",
        borderRadius: 4,
        p: 4,
      }}
    >
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

      <Box
        sx={{
          position: "relative",
          width: SIZE,
          height: SIZE,
          ml: "120px",
          mt: 6,
        }}
      >
        {metrics.map((metric, index) => (
          <Box
            key={metric.label}
            sx={{
              position: "absolute",
              textAlign: "center",
              ...labelPositions[index],
            }}
          >
            <Typography fontSize={14} fontWeight={600}>
              {metric.label}
            </Typography>

            <Typography fontSize={14}>
              {metric.value}%
            </Typography>
          </Box>
        ))}

        <svg width={SIZE} height={SIZE}>
          {Array.from({ length: LEVELS }, (_, index) => {
            const radius = (RADIUS / LEVELS) * (index + 1)

            return (
              <polygon
                key={index}
                points={polygonPoints(CENTER, CENTER, radius, metrics.length)}
                fill="none"
                stroke="#9CA3AF"
                strokeDasharray="4 4"
              />
            )
          })}

          <polygon
            points={dataPoints(CENTER, CENTER, RADIUS, metrics)}
            fill="rgba(99,102,241,0.3)"
            stroke="var(--Color-Primary-Main)"
            strokeWidth={2}
          />
        </svg>
      </Box>
    </Box>
  )
}