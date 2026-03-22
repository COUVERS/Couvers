import Dialog from "@mui/material/Dialog"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

export default function SignOutDialog({ open, onClose, onConfirm }) {
    return (
        <Dialog
        open={open}
        onClose={onClose}
        maxWidth={false}
        PaperProps={{
            sx: {
            display: "flex",
            padding: "80px 40px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
            borderRadius: "12px",
            background: "#FFF",
            boxShadow:
                "0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 8px 10px -5px rgba(0, 0, 0, 0.20)",
            },
        }}
        >
        <Box
            sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            }}
        >
            <Typography
            sx={{
                fontFamily: "IBM Plex Sans",
                fontSize: "var(--FontSize-Headings-h2, 32px)",
                fontWeight: 600,
                lineHeight: "normal",
                color: "var(--Color-Text-Primary, #0F172A)",
                letterSpacing: "-0.2px",
            }}
            >
            Sign Out
            </Typography>

            <Typography
            sx={{
                fontFamily: "IBM Plex Sans",
                fontSize: "var(--FontSize-Body1, 16px)",
                fontstyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
                color: "var(--Color-Text-Primary, #0F172A)",
                letterSpacing: "var(--LetterSpace-Body1, 0)",
            }}
            >
            Are you sure you want to sign out?
            </Typography>
        </Box>

        <Box
            sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: "24px",
            }}
        >
            <Button
            variant="outlined"
            size="large"
            onClick={onClose}
            sx={{
                display: "flex",
                width: "var(--Button-Dialog, 240px)",
                height: "48px",
                textTransform: "none",
                fontFamily: "IBM Plex Sans",
                fontSize: "16px",
                fontWeight: 500,
                borderRadius: "4px",
                color: "#3F3F7F",
                border: "1px solid #A1A1C2",
                whiteSpace: "nowrap",
                "&:hover": {
                border: "1px solid #7C7CB0",
                backgroundColor: "transparent",
                },
            }}
            >
            Cancel
            </Button>

            <Button
            variant="contained"
            size="large"
            onClick={onConfirm}
            sx={{
                display: "flex",
                width: "var(--Button-Dialog, 240px)",
                height: "48px",
                textTransform: "none",
                fontFamily: "IBM Plex Sans",
                fontSize: "16px",
                fontWeight: 500,
                borderRadius: "var(--borderRadius, 4px)",
                backgroundColor: "var(--Color-Primary-Main, #6B63FF)",
                boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",
                whiteSpace: "nowrap",
                "&:hover": {
                backgroundColor: "#5658E6",
                },
            }}
            >
            Sign Out
            </Button>
        </Box>
        </Dialog>
    )
}