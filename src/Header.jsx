import Box from "@mui/material/Box"

export default function Header({ title, description }) {
  return (
    <Box
      sx={{
        backgroundColor: "var(--color-surface)",
        borderRadius: "12px",
        p: 4,
        mb: 4,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}
    >
      <Box
        component="h1"
        sx={{
          m: 0,
          fontSize: "36px",
          fontWeight: 600,
          color: "var(--color-primary)"
        }}
      >
        {title}
      </Box>

      <Box
        component="p"
        sx={{
          mt: 1,
          fontSize: "16px",
          lineHeight: "24px",
          color: "var(--color-on-surface-variant)"
        }}
      >
        {description}
      </Box>
    </Box>
  )
}