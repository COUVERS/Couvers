import { Button } from "@mui/material"

const CustomButton = ({
    children,
    variant = "contained",
    color = "primary",
    size = "medium",
    startIcon,
    endIcon,
    ...props
}) => {
    return (
        <Button
            variant={variant}
            color={color}
            size={size}
            startIcon={startIcon}
            endIcon={endIcon}
            {...props} // Inherit other props like onClick
        >
            {children}
        </Button>
    )
}

export default CustomButton