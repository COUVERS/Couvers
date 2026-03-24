import { Box, Typography, IconButton, Skeleton, Tooltip } from "@mui/material"
import HelpIcon from "@mui/icons-material/Help"

const SIZE = 260
const CENTER = SIZE / 2
const RADIUS = 78
const LEVELS = 5

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
  { top: 10, left: "50%", transform: "translateX(-50%)" },
  { top: "32%", right: -100 },   // 👈 menos agresivo
  { bottom: 10, right: -10 },   // 👈 más hacia adentro
  { bottom: 10, left: -10 },
  { top: "32%", left: -100 },
]

const tooltipProps = {
  title: "Your skills will improve as you progress through the quiz.",
  placement: "right",
  arrow: true,
  enterTouchDelay: 0,
  componentsProps: {
    tooltip: {
      sx: {
        backgroundColor: "#2E2A5F",
        color: "#FFF",
        fontFamily: '"IBM Plex Sans", sans-serif',
        fontSize: "10px",
        fontWeight: 500,
        lineHeight: "14px",
        borderRadius: "10px",
        px: "16px",
        py: "10px",
        maxWidth: "140px",
        whiteSpace: "normal",
      },
    },
    arrow: {
      sx: {
        color: "#2E2A5F",
      },
    },
  },
}

function HelpTooltipButton() {
  return (
    <Tooltip {...tooltipProps}>
      <IconButton
        disableRipple
        disableFocusRipple
        sx={{
          width: 40,
          height: 40,
          p: 0,
          color: "#2E2A5F",
          borderRadius: "50%",
          backgroundColor: "transparent",
          boxShadow: "none",

          "&:hover": {
            color: "#3730A3",
            backgroundColor: "transparent",
            boxShadow: "none",
          },

          "&.Mui-focusVisible": {
            backgroundColor: "transparent",
            boxShadow: "none",
            outline: "none",
          },

          "& .MuiTouchRipple-root": {
            display: "none",
          },
        }}
      >
        <HelpIcon />
      </IconButton>
    </Tooltip>
  )
}

function SkillDevelopmentCard({ children, loading = false }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "472px",
        px: "32px",
        py: "40px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
        borderRadius: "8px",
        background: "var(--Color-Background-Paper, #FFF)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER CORREGIDO */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          width: "fit-content",
        }}
      >
        {loading ? (
          <>
            <Skeleton variant="text" width={250} height={48} />
            <Skeleton variant="circular" width={32} height={32} />
          </>
        ) : (
          <>
            <Typography
              sx={{
                color: "var(--Color-Text-Primary, #0F172A)",
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                letterSpacing: "-0.2px",
                whiteSpace: "nowrap",
              }}
            >
              Skill Development
            </Typography>

            <HelpTooltipButton />
          </>
        )}
      </Box>

      {children}
    </Box>
  )
}

function SkillDevelopmentRadarChartLoading() {
  return (
    <SkillDevelopmentCard loading>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: "32px",
        }}
      >
        <Skeleton variant="circular" width={220} height={220} />
      </Box>
    </SkillDevelopmentCard>
  )
}

function SkillDevelopmentRadarChartEmpty() {
  return (
    <SkillDevelopmentCard>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "text.secondary",
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          No skill data available yet.
        </Typography>
      </Box>
    </SkillDevelopmentCard>
  )
}

export default function SkillDevelopmentRadarChart({
  metrics = [],
  loading = false,
}) {
  if (loading) return <SkillDevelopmentRadarChartLoading />

  if (!Array.isArray(metrics) || metrics.length === 0) {
    return <SkillDevelopmentRadarChartEmpty />
  }

  return (
    <SkillDevelopmentCard>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: SIZE,
            height: SIZE,
          }}
        >
          {metrics.map((metric, index) => (
            <Box
              key={metric.label}
              sx={{
                position: "absolute",
                textAlign: "center",
                width: 150,
                ...labelPositions[index],
              }}
            >
              <Typography
                sx={{
                  color: "var(--Color-Text-Primary, #0F172A)",
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                {metric.label}
              </Typography>

              <Typography fontSize="12px">
                {metric.value}%
              </Typography>
            </Box>
          ))}

          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
            {/* contorno exterior sólido */}
            <polygon
              points={polygonPoints(CENTER, CENTER, RADIUS, metrics.length)}
              fill="none"
              stroke="#676767"
              strokeWidth={1.2}
            />

            {/* niveles internos punteados */}
            {Array.from({ length: LEVELS - 1 }, (_, index) => {
              const radius = (RADIUS / LEVELS) * (index + 1)

              return (
                <polygon
                  key={index}
                  points={polygonPoints(CENTER, CENTER, radius, metrics.length)}
                  fill="none"
                  stroke="#6B7280"
                  strokeDasharray="4 4"
                  strokeWidth={1.2}
                />
              )
            })}

            {/* área del radar */}
            <polygon
              points={dataPoints(CENTER, CENTER, RADIUS, metrics)}
              fill="rgba(99,102,241,0.28)"
              stroke="var(--Color-Primary-Main)"
              strokeWidth={2}
            />
          </svg>
        </Box>
      </Box>
    </SkillDevelopmentCard>
  )
}