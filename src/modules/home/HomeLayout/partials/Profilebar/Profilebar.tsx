import { useGetProfile } from "../../../../../packages/api"
import { Avatar, Box, Container, Typography } from "../../../../../packages/ui"

export const Profilebar = () => {
    const { data } = useGetProfile();
    const fullName = `${data?.user?.firstName} ${data?.user?.lastName}`;
    const role = data?.user?.role === "admin" ? "مدیریت" : ""
    return (
        <Container sx={{
            py: 2
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}>
                <Avatar />
                <Box>
                    <Typography pt={1.5} lineHeight={1} variant="body1">{fullName}</Typography>
                    <Typography  lineHeight={1} color="secondary" variant="caption">{role}</Typography>
                </Box>
            </Box>
        </Container>
    )
}