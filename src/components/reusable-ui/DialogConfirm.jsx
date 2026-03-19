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
          borderRadius: "16px",
          padding: "16px"
        }
      }}
    >
      <DialogContent>
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 700,
            mb: 2,
            color: "#0f172a"
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 16,
            color: "#374151",
            mb: 4
          }}
        >
          {description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              flex: 1,
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