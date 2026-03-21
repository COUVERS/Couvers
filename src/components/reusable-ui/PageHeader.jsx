import { Box, Typography } from "@mui/material"

export default function PageHeader({ title, description }) {
  return (
    <Box
      sx={{
        backgroundColor: "var(--color-surface)",
        px: 5,
        py: 3,
        mb: 2,
        boxShadow: "0 3px 0 rgba(0,0,0,0.18)"
      }}
    >
      <Typography
        component="h1"
        sx={{
          m: 0,
          fontSize: {
            xs: "34px",
            md: "44px"
          },
          fontWeight: 600,
          color: "var(--color-primary)",
          lineHeight: 1.05,
          mb: 1.5
        }}
      >
        {title}
      </Typography>

      <Typography
        component="p"
        sx={{
          m: 0,
          fontSize: "15px",
          lineHeight: "24px",
          color: "var(--Color-Text-Primary)",
          maxWidth: "1100px"
        }}
      >
        {description}
      </Typography>
    </Box>
  )
}