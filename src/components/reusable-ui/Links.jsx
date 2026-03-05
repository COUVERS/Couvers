import Link from "@mui/material/Link";

export default function Links({ children, underline = "hover", ...props }) {
    return (
        <Link underline={underline} {...props}>
            {children}
        </Link>
    )
}

// How to use
{/* <Links href="/courses">Courses</Links>

<Links underline="always" href="/profile">
    Profile
</Links> */}