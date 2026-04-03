import { Box, Typography } from "@mui/material"

export default function PageHeader({ title, description }) {
  const hasDescription = Boolean(description)

  return (
    <Box
      sx={{
        backgroundColor: { xs: "#FFFFFF", sm: "var(--Color-Background-Paper)" },
        px: { xs: 3, sm: "56px" },
        pt: { xs: 3, sm: "40px" },
        pb: { xs: 2, sm: hasDescription ? "32px" : "24px" },
        mb: 0,
        boxShadow: { xs: "none", sm: "0 3px 0 rgba(0,0,0,0.18)" },
      }}
    >
      <Typography
        component="h1"
        sx={{
          m: 0,
          fontSize: { xs: "28px", sm: "40px" },
          fontWeight: 600,
          color: "var(--Color-Primary-Main)",
          lineHeight: 1.1,
          mb: hasDescription ? 1.5 : 0,
        }}
      >
        {title}
      </Typography>

      {hasDescription && (
        <Typography
          component="p"
          sx={{
            m: 0,
            fontSize: "15px",
            lineHeight: "24px",
            color: "var(--Color-Text-Primary)",
            maxWidth: "1100px",
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  )
}