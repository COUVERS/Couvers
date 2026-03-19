import { Box, Typography } from "@mui/material"

export default function DashboardHeader({ title, description }) {
  return (
    <Box
      sx={{
        px: 6,
        pt: 5,
        pb: 3,
        mb: 2
      }}
    >
      <Typography
        component="h1"
        sx={{
          m: 0,
          fontSize: {
            xs: "40px",
            md: "56px"
          },
          fontWeight: 600,
          color: "var(--color-primary)",
          lineHeight: 1.1,
          mb: 2
        }}
      >
        {title}
      </Typography>

      <Typography
        component="p"
        sx={{
          m: 0,
          fontSize: "16px",
          lineHeight: "26px",
          color: "var(--Color-Text-Primary)"
        }}
      >
        {description}
      </Typography>
    </Box>
  )
}