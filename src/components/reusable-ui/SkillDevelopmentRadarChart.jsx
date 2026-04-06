import {
  Box,
  Typography,
  IconButton,
  Skeleton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import HelpIcon from "@mui/icons-material/Help"

// Constants
const CHART = {
  SIZE: 300,
  RADIUS: 95,
  LEVELS: 5,
}
const CENTER = CHART.SIZE / 2

// Geometry helpers

function polarToCartesian(cx, cy, radius, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
}

function buildPolygonPoints(cx, cy, radius, count) {
  return Array.from({ length: count }, (_, i) => {
    const { x, y } = polarToCartesian(cx, cy, radius, (360 / count) * i)
    return `${x},${y}`
  }).join(" ")
}

function buildDataPoints(cx, cy, maxRadius, data) {
  return data
    .map((item, i) => {
      const scaled = (item.value / 100) * maxRadius
      const { x, y } = polarToCartesian(cx, cy, scaled, (360 / data.length) * i)
      return `${x},${y}`
    })
    .join(" ")
}

// Desktop: absolute positions around the SVG (original behaviour, unchanged).
const DESKTOP_LABEL_POSITIONS = [
  { top: 10, left: "50%", transform: "translateX(-50%)" },
  { top: "32%", right: -100 },
  { bottom: 10, right: -10 },
  { bottom: 10, left: -10 },
  { top: "32%", left: -100 },
]

// Mobile: maps each skill index to a CSS-grid placement.(4-column grid)
const MOBILE_GRID_PLACEMENTS = [
  { gridColumn: "1 / span 4", gridRow: 1, textAlign: "center", alignSelf: "center" },
  { gridColumn: 4, gridRow: 2, textAlign: "left", alignSelf: "center" },
  { gridColumn: "3 / span 2", gridRow: 3, textAlign: "center", alignSelf: "center" },
  { gridColumn: "1 / span 2", gridRow: 3, textAlign: "center", alignSelf: "center" },
  { gridColumn: 1, gridRow: 2, textAlign: "right", alignSelf: "center" },
]

const SKILL_DESCRIPTIONS = {
  "Lesson Structure":
    "Ability to organize lesson components in a clear and logical sequence.",
  "Explanation Clarity":
    "Ability to explain concepts, objectives, and instructions clearly and understandably.",
  Assessment:
    "Ability to check and evaluate learner understanding during and after instruction.",
  Pacing: "Ability to manage lesson timing and progression effectively.",
  "Student Engagement":
    "Ability to maintain learner attention, participation, and involvement during instruction.",
}

// tooltip styles
function makeTooltipSx(bg, maxWidth = 140) {
  return {
    tooltip: {
      sx: {
        backgroundColor: bg,
        color: "#FFF",
        fontFamily: '"IBM Plex Sans", sans-serif',
        fontSize: "10px",
        fontWeight: 500,
        lineHeight: "14px",
        borderRadius: "10px",
        px: "16px",
        py: "10px",
        maxWidth,
        whiteSpace: "normal",
      },
    },
    arrow: { sx: { color: bg } },
  }
}

const HELP_TOOLTIP_PROPS = {
  title: "Your skills will improve as you progress through the quiz.",
  placement: "right",
  arrow: true,
  enterTouchDelay: 0,
  componentsProps: makeTooltipSx("#2E2A5F"),
}

const SKILL_TOOLTIP_COMPONENTS = makeTooltipSx("#1E3A8A", 220)

// Sub-components

function HelpTooltipButton() {
  return (
    <Tooltip {...HELP_TOOLTIP_PROPS}>
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
          "&:hover": { color: "#3730A3", backgroundColor: "transparent", boxShadow: "none" },
          "&.Mui-focusVisible": { backgroundColor: "transparent", boxShadow: "none", outline: "none" },
          "& .MuiTouchRipple-root": { display: "none" },
        }}
      >
        <HelpIcon />
      </IconButton>
    </Tooltip>
  )
}

function CardShell({ loading = false, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        px: { xs: "16px", sm: "32px" },
        py: "40px",
        flexDirection: "column",
        // alignItems: "stretch", // 여기 수정
        // gap: "8px",
        alignItems: "flex-start",
        gap: 3,
        borderRadius: "8px",
        background: "var(--Color-Background-Paper, #FFF)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          pr: "56px",
          boxSizing: "border-box",
        }}
      >
        {loading ? (
          <>
            <Skeleton variant="text" width={250} height={48} />
            <Box sx={{ position: "absolute", top: 0, right: 0 }}>
              <Skeleton variant="circular" width={32} height={32} />
            </Box>
          </>
        ) : (
          <>
            <Typography
              component="div"
              sx={{
                color: "var(--Color-Text-Primary, #0F172A)",
                fontFamily: '"IBM Plex Sans"',
                fontSize: {
                  xs: "24px",
                  sm: "28px",
                  md: "32px",
                },
                fontWeight: 600,
                letterSpacing: "-0.2px",
                lineHeight: 1.2,
                whiteSpace: "nowrap",
              }}
            >
              Skill Development
            </Typography>

            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              <HelpTooltipButton />
            </Box>
          </>
        )}
      </Box>

      {children}
    </Box>
  )
}
function CenteredContent({ children }) {
  return (
    <Box sx={{ flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </Box>
  )
}

function SkillLabelText({ metric, textAlign = "center" }) {
  const name = metric.label ?? metric.skill
  const value = metric.value ?? metric.score ?? 0

  return (
    <Tooltip
      title={
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: "12px", mb: "4px" }}>{name}</Typography>
          <Typography sx={{ fontSize: "10px", lineHeight: "14px", opacity: 0.9 }}>
            {SKILL_DESCRIPTIONS[name] ?? "No description available"}
          </Typography>
        </Box>
      }
      arrow
      placement="top"
      enterTouchDelay={0}
      componentsProps={SKILL_TOOLTIP_COMPONENTS}
    >
      <Box sx={{
        cursor: "pointer",
        textAlign,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // width: "100%",
        gap: "4px",
      }}>
        <Typography
          sx={{
            color: "var(--Color-Text-Primary, #0F172A)",
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "18px",
            letterSpacing: "0.1px",
            whiteSpace: "nowrap",


            "@media (min-width:899px) and (max-width:1300px)": {
              whiteSpace: "normal",
              lineHeight: "18px",
              maxWidth: 110,
            },

            "@media (max-width:599px)": {
              whiteSpace: "normal",
              maxWidth: "110px",
              textAlign: "center",
            },
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            color: "var(--Color-Text-Primary, #0F172A)",
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
          }}
        >
          {value}%
        </Typography>
      </Box>
    </Tooltip>
  )
}

function RadarSvg({ metrics, size = CHART.SIZE }) {
  const { RADIUS, LEVELS } = CHART
  const center = size / 2
  const radius = (RADIUS / CHART.SIZE) * size

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      style={{ display: "block" }}
    >
      {Array.from({ length: LEVELS - 1 }, (_, i) => (
        <polygon
          key={i}
          points={buildPolygonPoints(
            center,
            center,
            (radius / LEVELS) * (i + 1),
            metrics.length
          )}
          fill="none"
          stroke="#6B7280"
          strokeDasharray="4 4"
          strokeWidth={1.2}
        />
      ))}

      <polygon
        points={buildPolygonPoints(center, center, radius, metrics.length)}
        fill="none"
        stroke="#6B7280"
        strokeWidth={1.5}
      />

      <polygon
        points={buildDataPoints(center, center, radius, metrics)}
        fill="rgba(99,102,241,0.28)"
        stroke="var(--Color-Primary-Main)"
        strokeWidth={2}
      />
    </svg>
  )
}

// Desktop layout

function DesktopChart({ metrics, isTightDesktop = false }) {
  const chartSize = isTightDesktop ? 230 : CHART.SIZE

  return (
    <CenteredContent>
      <Box
        sx={{
          position: "relative",
          width: chartSize,
          height: `calc(${chartSize}px + 28px)`,
          pt: "28px",
        }}
      >
        {metrics.map((metric, index) => (
          <Box
            key={metric.label ?? metric.skill ?? index}
            sx={{
              position: "absolute",
              textAlign: "center",
              width: 150,
              overflow: "hidden",
              zIndex: 2,
              ...DESKTOP_LABEL_POSITIONS[index],

              ...(isTightDesktop && index === 0 ? { top: 10 } : {}),
              ...(isTightDesktop && index === 1 ? { right: -70 } : {}),
              ...(isTightDesktop && index === 2 ? { bottom: -10, right: -20 } : {}),
              ...(isTightDesktop && index === 3 ? { bottom: -10, left: -20 } : {}),
              ...(isTightDesktop && index === 4 ? { left: -78 } : {}),
            }}
          >
            <SkillLabelText metric={metric} textAlign="center" />
          </Box>
        ))}

        <Box sx={{ position: "relative", zIndex: 1, pointerEvents: "none" }}>
          <RadarSvg metrics={metrics} size={chartSize} />
        </Box>
      </Box>
    </CenteredContent>
  )
}

// Mobile layout (grid)
function MobileChart({ metrics }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gridTemplateRows: "repeat(3, fit-content(100%))",
        columnGap: "4px",
        rowGap: "4px",
        py: "16px",
        width: "100%",
      }}
    >
      {metrics.map((metric, index) => {
        const placement = MOBILE_GRID_PLACEMENTS[index]
        if (!placement) return null
        return (
          <Box key={metric.label ?? metric.skill ?? index} sx={{ ...placement }}>
            <SkillLabelText metric={metric} textAlign={placement.textAlign} />
          </Box>
        )
      })}

      <Box
        sx={{
          gridColumn: "1 / span 4",
          gridRow: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 160,
        }}
      >
        <RadarSvg metrics={metrics} size={240} />
      </Box>
    </Box>
  )
}

// Loading / Empty states

function LoadingState() {
  return (
    <CardShell loading>
      <CenteredContent>
        <Skeleton variant="circular" width={220} height={220} />
      </CenteredContent>
    </CardShell>
  )
}

function EmptyState() {
  return (
    <CardShell>
      <CenteredContent>
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
      </CenteredContent>
    </CardShell>
  )
}

// Main component
export default function SkillDevelopmentRadarChart({ metrics = [], loading = false }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTightDesktop = useMediaQuery(
    "(min-width:899px) and (max-width:1150px)"
  )
  if (loading) return <LoadingState />
  if (!Array.isArray(metrics) || metrics.length === 0) return <EmptyState />

  return (
    <CardShell>
      {isMobile ? (
        <MobileChart metrics={metrics} />
      ) : (
        <DesktopChart
          metrics={metrics}
          isTightDesktop={isTightDesktop}
        />
      )}
    </CardShell>
  )
}