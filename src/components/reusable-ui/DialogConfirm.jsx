import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button
} from "@mui/material"

export default function DialogConfirm({
  open,
  onClose,
  onConfirm,
  title = "Leave Quiz?",
  description = "If you leave now, your answers will not be saved. You will have to start over."
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          padding: "80px 40px",
          boxShadow:
            "0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 8px 10px -5px rgba(0, 0, 0, 0.20)"
        }
      }}
    >
      <DialogContent
        sx={{
          p: 0
        }}
      >
        <Typography
          sx={{
            fontSize: 'var(--FontSize-Headings-h2)',
            fontWeight: 600,
            mb: 3,
            color: "var(--Color-Text-Primary)"
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: "var(--FontSize-Body1)",
            color: "var(--Color-Text-Primary)",
            mb: 5
          }}
        >
          {description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 3
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              flex: 1,
              height: "48px",
              borderColor: "#6366f1",
              color: "#111827",
              textTransform: "none"
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={onConfirm}
            sx={{
              flex: 1,
              height: "48px",
              backgroundColor: "#6366f1",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#4f46e5"
              }
            }}
          >
            Leave
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}