import Box from "@mui/material/Box"
import AccountSettings from "../components/features/AccountSettings"
import ContentsNavigation from "../components/layout/ContentsNavigation"

export default function Account({ authUser }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>

            <ContentsNavigation title="Account" />

            <AccountSettings
                name={authUser?.username}
                email={authUser?.email}
                onChangePassword={() => console.log("change password")}
            />

        </Box>
    )
}