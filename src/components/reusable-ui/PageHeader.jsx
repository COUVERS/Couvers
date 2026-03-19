import { Box, Typography } from "@mui/material"

export default function PageHeader({ title, description }) {
  return (
    <Box
      sx={{
        backgroundColor: "var(--color-surface)",
        px: 6,
        py: 4,
        mb: 4,
        boxShadow: "0 3px 0 rgba(0,0,0,0.18)"
      }}
    >
      <Typography
        component="h1"
        sx={{
          m: 0,
          fontSize: {
            xs: "36px",
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
          lineHeight: "28px",
          color: "var(--Color-Text-Primary)",
          maxWidth: "1100px"
        }}
      >
        {description}
      </Typography>
    </Box>
  )
}