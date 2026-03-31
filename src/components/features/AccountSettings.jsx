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
        padding: {
          xs: "32px 24px 40px",
          md: "0 56px",
        },
        mt: { xs: 0, md: "40px" },
        alignItems: "flex-start",
        alignContent: "flex-start",
        gap: { xs: "42px", md: "var(--7, 56px)" },
        flexWrap: "wrap",
        boxSizing: "border-box",
        bgcolor: { xs: "var(--Color-Background-Paper)", md: "transparent" },
        minHeight: { xs: "100vh", md: "auto" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: { xs: "0 0 auto", md: "1 1 360px" },
          width: { xs: "319px", md: "408px" },
          height: { xs: "270px", md: "360px" },
          padding: { xs: "0", md: "40px 32px" },
          flexDirection: "column",
          alignItems: "flex-start",
          gap: { xs: "24px", md: 4 },
          border: { xs: "none", md: "1px solid var(--Color-Border-Default)" },
          backgroundColor: { xs: "transparent", md: "var(--Color-Background-Paper)" },
          boxSizing: "border-box",
        }}
      >
        <Typography
          sx={{
            color: "var(--Color-Text-Primary)",
            fontFamily: "IBM Plex Sans",
            fontSize: { xs: "24px", md: "32px" },
            fontWeight: 600,
            lineHeight: { xs: "32px", md: "normal" },
            letterSpacing: { xs: "0", md: "-0.2px" },
          }}
        >
          Profile Details
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: { xs: "24px", md: 3 },
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography
              sx={{
                color: "var(--Color-Text-Primary)",
                fontFamily: "IBM Plex Sans",
                fontSize: { xs: "20px", md: "20px" },
                fontWeight: 600,
                lineHeight: "normal",
                mb: "8px",
              }}
            >
              Name:
            </Typography>

            <Typography
              sx={{
                color: "var(--Color-Text-Primary)",
                fontFamily: "IBM Plex Sans",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              {name}
            </Typography>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography
              sx={{
                color: "var(--Color-Text-Primary)",
                fontFamily: "IBM Plex Sans",
                fontSize: { xs: "20px", md: "20px" },
                fontWeight: 600,
                lineHeight: "normal",
                mb: "8px",
              }}
            >
              E-mail:
            </Typography>

            <Typography
              sx={{
                color: "var(--Color-Text-Primary)",
                fontFamily: "IBM Plex Sans",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                wordBreak: "break-word",
              }}
            >
              {email}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            width: "100%",
            color: "var(--Color-Text-Secondary)",
            fontFamily: "IBM Plex Sans",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "normal",
            mt: "auto",
          }}
        >
          Please contact an administrator to update your profile information.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: { xs: "0 0 auto", md: "1 1 420px" },
          width: { xs: "319px", md: "594px" },
          height: { xs: "218px", md: "auto" },
          padding: { xs: "0", md: "40px" },
          flexDirection: "column",
          alignItems: "flex-start",
          gap: { xs: "24px", md: "32px" },
          alignSelf: "stretch",
          border: {
            xs: "none",
            md: "1px solid var(--Color-Border-Default)",
          },
          backgroundColor: { xs: "transparent", md: "var(--Color-Background-Paper)" },
          boxSizing: "border-box",
        }}
      >
        <Typography
          sx={{
            color: "var(--Color-Text-Primary)",
            fontFamily: "IBM Plex Sans",
            fontSize: { xs: "24px", md: "32px" },
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: { xs: "32px", md: "normal" },
            letterSpacing: { xs: "0", md: "-0.2px" },
            m: 0,
          }}
        >
          Security
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: { xs: "16px", md: "20px" },
            alignSelf: "stretch",
          }}
        >
          <Typography
            sx={{
              color: "var(--Color-Text-Primary)",
              fontFamily: "IBM Plex Sans",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              m: 0,
            }}
          >
            Change Password
          </Typography>

          <Typography
            sx={{
              color: "var(--Color-Text-Primary)",
              fontFamily: "IBM Plex Sans",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "24px",
              letterSpacing: "0",
              m: 0,
            }}
          >
            For your security, we recommend changing your password periodically.
          </Typography>

          <Button
            variant="contained"
            onClick={onChangePassword}
            sx={{
              display: "flex",
              width: { xs: "159px", md: "190px" },
              height: "48px",
              padding: { xs: "8px 78px", md: "12px 24px" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: { xs: "8px", md: "4px" },
              background: "var(--Color-Primary-Main)",
              boxShadow:
                "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",
              textTransform: "none",
              fontFamily: "IBM Plex Sans",
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
              letterSpacing: "0.2px",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "var(--Color-Primary-Dark)",
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