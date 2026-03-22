import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

export default function AccountSettings({
    name = "",
    email = "",
    onChangePassword,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                minWidth: 0,
                padding: { xs: "0 16px", md: "0 56px" },
                alignItems: "flex-start",
                gap: "40px",
                flexWrap: "wrap",
                boxSizing: "border-box",
            }}
        >
            {/* Profile Details */}
            <Box
                sx={{
                    display: "flex",
                    flex: "1 1 360px",
                    minWidth: "280px",
                    maxWidth: "408px",
                    height: "360px",
                    padding: "40px 32px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 4,
                    border: "1px solid #2E2A5F",
                    backgroundColor: "#FFF",
                    boxSizing: "border-box",
                }}
                >
                {/* Title */}
                <Typography
                    sx={{
                    color: "#0F172A",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "32px",
                    fontWeight: 600,
                    letterSpacing: "-0.2px",
                    }}
                >
                    Profile Details
                </Typography>

                {/* Info Section */}
                <Box
                    sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 3, // 24px
                    width: "100%",
                    }}
                >
                    {/* Name */}
                    <Box sx={{ width: "100%" }}>
                    <Typography
                        sx={{
                        alignSelf: "stretch",
                        color: "#0F172A",
                        fontFamily: "IBM Plex Sans",
                        fontSize: "20px",
                        fontWeight: 600,
                        mb: "8px",
                        }}
                    >
                        Name:
                    </Typography>

                    <Typography
                        sx={{
                        alignSelf: "stretch",
                        color: "#0F172A",
                        fontFamily: "IBM Plex Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        }}
                    >
                        {name}
                    </Typography>
                    </Box>

                    {/* Email */}
                    <Box sx={{ width: "100%" }}>
                    <Typography
                        sx={{
                        alignSelf: "stretch",
                        color: "#0F172A",
                        fontFamily: "IBM Plex Sans",
                        fontSize: "20px",
                        fontWeight: 600,
                        mb: "8px",
                        }}
                    >
                        Email:
                    </Typography>

                    <Typography
                        sx={{
                        alignSelf: "stretch",
                        color: "#0F172A",
                        fontFamily: "IBM Plex Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        }}
                    >
                        {email}
                    </Typography>
                </Box>
            </Box>

            {/* Footer text */}
            <Typography
                sx={{
                alignSelf: "stretch",
                color: "#64748B",
                fontFamily: "IBM Plex Sans",
                fontSize: "12px",
                fontWeight: 500,
                }}
            >
                Please contact an administrator to update your profile information.
            </Typography>
            </Box>

             {/* Security */}
            <Box
                sx={{
                    display: "flex",
                    flex: "1 1 420px",
                    minWidth: "280px",
                    maxWidth: "594px",
                    height: "360px",
                    padding: "40px 32px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 2,
                    border: "1px solid #2E2A5F",
                    backgroundColor: "#FFF",
                    boxSizing: "border-box",
                }}
            >
                <Typography
                    sx={{
                        alignSelf: "stretch",
                        color: "#0F172A",
                        fontFamily: "IBM Plex Sans",
                        fontSize: "32px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal",
                        letterSpacing: "-0.2px",
                    }}
                >
                    Security
                </Typography>

                <Typography
                    sx={{
                        alignSelf: "stretch",
                        color: "#0F172A",
                        fontFamily: "IBM Plex Sans",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal",
                    }}
                    >
                    Change Password
                </Typography>

                <Typography
                    sx={{
                        alignSelf: "stretch",
                        color: "var(--Color-Text-Primary, #0F172A)",
                        fontFamily: "IBM Plex Sans",
                        fontSize: "var(--FontSize-Body1, 16px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "24px",
                        letterSpacing: "var(--LetterSpace-Body1, 0)",
                    }}
                >
                    For your security, we recommend changing your password
                    periodically.
                </Typography>

                <Button
                    variant="contained"
                    onClick={onChangePassword}
                    sx={{
                        display: "flex",
                        width: "240px",
                        height: "48px",
                        padding: "12px 40px",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "4px",
                        background: "#6B63FF",
                        boxShadow:
                            "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",
                        textTransform: "none",
                        mt: "8px",
                        "&:hover": {
                            backgroundColor: "#5E57F5",
                        },
                    }}
                >
                    <Typography
                        sx={{
                            color: "#FFF",
                            fontFamily: "IBM Plex Sans",
                            fontSize: "15px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "normal",
                            letterSpacing: "0.2px",
                        }}
                    >
                        Change Password
                    </Typography>
                </Button>
            </Box>
        </Box>
    )
}