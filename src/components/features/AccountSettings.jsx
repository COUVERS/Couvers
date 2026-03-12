import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

export default function AccountSettings({
    name = "Alex Morgan",
    email = "alexm@codyacademy.edu",
    onChangePassword,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                padding: "0 56px",
                alignItems: "flex-start",
                gap: "40px",
            }}
        >
            {/* Profile Details */}
            <Box
                sx={{
                    display: "flex",
                    width: "408px",
                    height: "360px",
                    padding: "40px 32px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "32px",
                    border: "1px solid #6C6C6C",
                    backgroundColor: "#FFF",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "IBM Plex Sans",
                        fontSize: "24px",
                        fontWeight: 700,
                        lineHeight: "normal",
                        color: "#000",
                    }}
                >
                    Profile Details
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "24px",
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "IBM Plex Sans",
                                fontSize: "18px",
                                fontWeight: 700,
                                lineHeight: "normal",
                                color: "#000",
                                mb: "12px",
                            }}
                        >
                            Name:
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: "IBM Plex Sans",
                                fontSize: "18px",
                                fontWeight: 400,
                                lineHeight: "normal",
                                color: "var(--Color-Text-Primary)",
                            }}
                        >
                            {name}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "IBM Plex Sans",
                                fontSize: "18px",
                                fontWeight: 700,
                                lineHeight: "normal",
                                color: "#000",
                                mb: "12px",
                            }}
                        >
                            Email:
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: "IBM Plex Sans",
                                fontSize: "18px",
                                fontWeight: 400,
                                lineHeight: "normal",
                                color: "var(--Color-Text-Primary)",
                            }}
                        >
                            {email}
                        </Typography>
                    </Box>
                </Box>

                <Typography
                    sx={{
                        fontFamily: "IBM Plex Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        color: "#7A7A7A",
                        maxWidth: "240px",
                    }}
                >
                    Please contact an administrator to update your profile
                    information.
                </Typography>
            </Box>

            {/* Security */}
            <Box
                sx={{
                    display: "flex",
                    width: "594px",
                    height: "360px",
                    padding: "40px 32px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                    border: "1px solid #6C6C6C",
                    backgroundColor: "#FFF",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "IBM Plex Sans",
                        fontSize: "24px",
                        fontWeight: 700,
                        lineHeight: "normal",
                        color: "#000",
                    }}
                >
                    Security
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "20px",
                        mt: "20px",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "IBM Plex Sans",
                            fontSize: "18px",
                            fontWeight: 700,
                            lineHeight: "normal",
                            color: "#000",
                        }}
                    >
                        Change Password
                    </Typography>

                    <Typography
                        sx={{
                            fontFamily: "IBM Plex Sans",
                            fontSize: "18px",
                            fontWeight: 400,
                            lineHeight: "28px",
                            color: "var(--Color-Text-Primary)",
                            maxWidth: "420px",
                        }}
                    >
                        For your security, we recommend changing your password
                        periodically.
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={onChangePassword}
                        sx={{
                            mt: "8px",
                            width: "228px",
                            height: "48px",
                            borderRadius: "4px",
                            backgroundColor: "#6366F1",
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
                            textTransform: "none",
                            fontFamily: "IBM Plex Sans",
                            fontSize: "18px",
                            fontWeight: 500,
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
    )
}