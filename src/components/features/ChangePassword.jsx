import { useMemo, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import Visibility from "../../assets/icons/Visibility"
import VisibilityOff from "../../assets/icons/VisibilityOff"

export default function ChangePassword({ onCancel }) {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const [currentPasswordError, setCurrentPasswordError] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const [submitting, setSubmitting] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const resetErrors = () => {
        setCurrentPasswordError("")
        setNewPasswordError("")
        setConfirmPasswordError("")
    }

    const isFormValid = useMemo(() => {
        return (
        currentPassword.trim() &&
        newPassword.trim() &&
        confirmPassword.trim() &&
        !currentPasswordError &&
        !newPasswordError &&
        !confirmPasswordError
        )
    }, [
        currentPassword,
        newPassword,
        confirmPassword,
        currentPasswordError,
        newPasswordError,
        confirmPasswordError,
    ])

    const validate = () => {
        let valid = true
        resetErrors()

    if (!currentPassword.trim()) {
        setCurrentPasswordError("Current password is required.")
        valid = false
        }

    if (!newPassword.trim()) {
        setNewPasswordError("New password is required.")
        valid = false
    } else if (newPassword === currentPassword) {
        setNewPasswordError("You cannot reuse your current password.")
        valid = false
    } else if (newPassword.length < 6) {
        setNewPasswordError("Password must be at least 6 characters.")
        valid = false
    }

    if (!confirmPassword.trim()) {
        setConfirmPasswordError("Please confirm your new password.")
        valid = false
    } else if (confirmPassword !== newPassword) {
        setConfirmPasswordError("Passwords do not match.")
        valid = false
    }

    return valid
    }

    const handleSubmit = async () => {
        if (!validate()) return

        setSubmitting(true)

        try {
      // const token = localStorage.getItem("token")
      // const res = await fetch("http://localhost:5050/auth/change-password", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     currentPassword,
      //     newPassword,
      //   }),
      // })
      // const data = await res.json()
      // if (!res.ok) {
      //   if (data.message === "Current password is incorrect") {
      //     setCurrentPasswordError("The current password you entered is incorrect.")
      //     return
      //   }
      //   throw new Error(data.message || "Failed to update password.")
      // }

        await new Promise((resolve) => setTimeout(resolve, 800))

            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
            resetErrors()
            setSnackbarOpen(true)
        } catch (error) {
            setCurrentPasswordError(
            error.message || "The current password you entered is incorrect."
            )
        } finally {
            setSubmitting(false)
        }
    }

    const sharedTextFieldSx = {
        width: "100%", "& .MuiInputLabel-root": {
            fontFamily: "IBM Plex Sans",
            fontSize: "14px",
            fontWeight: 600,
            color: "#74829C",
        },
        "& .MuiInputBase-root": {
            fontFamily: "IBM Plex Sans",
            fontSize: "16px",
            fontWeight: 500,
            color: "#1F2430",
        },
        "& .MuiInput-underline:before": {
            borderBottom: "2px solid #C7D2FE",
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "2px solid #A5B4FC",
        },
        "& .MuiInput-underline:after": {
            borderBottom: "2px solid #6366F1",
        },
        "& .MuiFormHelperText-root": {
            marginLeft: 0,
            fontFamily: "IBM Plex Sans",
            fontSize: "12px",
            lineHeight: "16px",
        },
    }

    return (
    <>
        <Box
            sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "120px",
            }}
        >
        <Box
            sx={{
                display: "flex",
                width: "387px",
                padding: "40px 32px",
                flexDirection: "column",
                alignItems: "center",
                gap: "48px",
                borderRadius: "8px",
                background: "#FFF",
                boxShadow:
                    "0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 3px 5px -1px rgba(0, 0, 0, 0.20)",
            }}
        >
            <Box
                sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "28px",
            }}
            >
            <TextField
                variant="standard"
                fullWidth 
                type={showCurrent ? "text" : "password"}
                label="Current Password"
                value={currentPassword}
                onChange={(e) => {
                setCurrentPassword(e.target.value)
                if (currentPasswordError) setCurrentPasswordError("")
                }}
                error={!!currentPasswordError}
                helperText={currentPasswordError}
                sx={{
                ...sharedTextFieldSx,
                "& .MuiInputLabel-root.Mui-error": { color: "#EF4444" },
                "& .MuiInput-underline.Mui-error:after": {
                    borderBottomColor: "#EF4444",
                },
                "& .MuiFormHelperText-root.Mui-error": { color: "#EF4444" },
                }}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton onClick={() => setShowCurrent((prev) => !prev)} edge="end">
                        {showCurrent ? (
                        <VisibilityOff size={20} color="#7A7A7A" />
                        ) : (
                        <Visibility size={20} color="#7A7A7A" />
                        )}
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />

            <TextField
                variant="standard"
                fullWidth
                type={showNew ? "text" : "password"}
                label="New Password"
                value={newPassword}
                onChange={(e) => {
                setNewPassword(e.target.value)
                if (newPasswordError) setNewPasswordError("")
                }}
                error={!!newPasswordError}
                helperText={newPasswordError}
                sx={{
                ...sharedTextFieldSx,
                "& .MuiInputLabel-root.Mui-error": { color: "#EF4444" },
                "& .MuiInput-underline.Mui-error:after": {
                    borderBottomColor: "#EF4444",
                },
                "& .MuiFormHelperText-root.Mui-error": { color: "#EF4444" },
                }}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton onClick={() => setShowNew((prev) => !prev)} edge="end">
                        {showNew ? (
                        <VisibilityOff size={20} color="#7A7A7A" />
                        ) : (
                        <Visibility size={20} color="#7A7A7A" />
                        )}
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />

            <TextField
                variant="standard"
                fullWidth
                type={showConfirm ? "text" : "password"}
                label="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (confirmPasswordError) setConfirmPasswordError("")
                }}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                sx={{
                ...sharedTextFieldSx,
                "& .MuiInputLabel-root.Mui-error": { color: "#EF4444" },
                "& .MuiInput-underline.Mui-error:after": {
                    borderBottomColor: "#EF4444",
                },
                "& .MuiFormHelperText-root.Mui-error": { color: "#EF4444" },
                }}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm((prev) => !prev)} edge="end">
                        {showConfirm ? (
                        <VisibilityOff size={20} color="#7A7A7A" />
                        ) : (
                        <Visibility size={20} color="#7A7A7A" />
                        )}
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />
            </Box>

            <Box
                sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "16px",
                mt: "4px",
                }}
            >
            <Button
                onClick={onCancel}
                sx={{
                minWidth: "auto",
                height: "48px",
                px: "12px",
                textTransform: "none",
                fontFamily: "IBM Plex Sans",
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "#6366F1",
                borderRadius: "4px",
                }}
            >
                Cancel
            </Button>

            <Button
                variant="contained"
                disabled={!isFormValid || submitting}
                onClick={handleSubmit}
                sx={{
                width: "176px",
                height: "48px",
                px: "32px",
                py: 0,
                borderRadius: "4px",
                textTransform: "none",
                fontFamily: "IBM Plex Sans",
                fontSize: "18px",
                fontWeight: 500,
                backgroundColor: "#6366F1",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
                "&.Mui-disabled": {
                    backgroundColor: "#E2E8F0",
                    color: "#94A3B8",
                },
                "&:hover": {
                    backgroundColor: "#5658E6",
                },
                }}
            >
                Change Password
            </Button>
            </Box>
        </Box>
        </Box>

        <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
        <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            variant="filled"
            sx={{
            minWidth: "360px",
            fontFamily: "IBM Plex Sans",
            fontSize: "16px",
            fontWeight: 500,
            alignItems: "center",
            }}
        >
            Password updated successfully
        </Alert>
        </Snackbar>
    </>
    )
}