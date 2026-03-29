import { Box, Typography } from "@mui/material"
import MenuIcon from "../../assets/icons/MenuIcon"
import ViewListIcon from "@mui/icons-material/ViewList"
import SchoolIcon from "@mui/icons-material/School"
import LogoLarge from "../../assets/Logo_large_dark.png"

export default function LessonMobileHeader({ onMenuClick }) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
                py: 2,
                backgroundColor: "#fff",
                boxShadow: "0 6px 30px rgba(0,0,0,0.12)",
                position: "sticky",
                top: 0,
                zIndex: 1200,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                    onClick={onMenuClick}
                    sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 32,
                        height: 32,
                    }}
                >
                    <MenuIcon />
                </Box>

                <img
                    src={LogoLarge}
                    alt="TeTe"
                    style={{
                        height: 56,
                        display: "block",
                    }}
                />
            </Box>

            <Box sx={{ display: "flex", gap: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: 72,
                    }}
                >
                    <ViewListIcon sx={{ fontSize: 30, color: "#2E2A5F" }} />
                    <Typography sx={{ fontSize: "12px", lineHeight: 1.2, mt: 0.5 }}>
                        Contents
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: 72,
                    }}
                >
                    <SchoolIcon sx={{ fontSize: 30, color: "#2E2A5F" }} />
                    <Typography sx={{ fontSize: "12px", lineHeight: 1.2, mt: 0.5 }}>
                        Categories
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}