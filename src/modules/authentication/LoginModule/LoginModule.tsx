import { Container, Box, Typography, Button, TextField } from "../../../packages/ui"

export const LoginModule = () => {
    return (
        <Box sx={{
            p: 1,
            backgroundColor: 'background.default'

        }}>
            <Box sx={{
                backgroundColor: 'secondary.main',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                px: 1.5,
                py: 6.5,
                maxHeight: '50vh'
            }}>
                <img src="/login-vector.svg" />
            </Box>
            <Box sx={{
                backgroundColor: 'background.default',
                borderRadius: 25,
                px: 2.5,
                py: 1.5,
                maxWidth: 'max-content',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                top: -30,
                margin: '0 auto'
            }}>
                <img src="/doorbord.png" />
            </Box>
            <Container sx={{
                marginTop: -2
            }} maxWidth="sm">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    <Typography variant="h6">ورود نیروی فنی</Typography>
                    <TextField label="نام کاربری" />
                    <TextField label=" رمز عبور" />
                </Box>
                <Button fullWidth sx={{ mt: 5, mb: 7 }}>ورود</Button>
            </Container>
        </Box>
    )
}

