import { Container, Stack, Button } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ButtonTest = () => {
    return (
        <Container maxWidth="sm">
            <Stack spacing={2}>
                <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ rowGap: 3, alignItems: "flex-start" }}>
                    <Button variant="contained" size="large"
                        sx={{ width: "var(--Button-Dialog, 240px)" }}>Custom Large</Button>
                    <Button variant="outlined" size="medium">Medium</Button>
                    <Button variant="text" size="small">Small</Button>
                    <Button variant="contained" size="large" disabled>Disabled</Button>
                    <Button
                        variant="contained"
                        endIcon={<ChevronRightIcon />}
                    >
                        Label
                    </Button>
                </Stack>
                <Button
                    variant="contained"
                    fullWidth
                >
                    fullWidth
                </Button>
            </Stack>
        </Container>

    )
}

export default ButtonTest

