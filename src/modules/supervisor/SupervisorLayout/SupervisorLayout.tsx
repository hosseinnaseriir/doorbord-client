import { Box, Container, IconButton, Typography } from "../../../packages/ui"
import { Link, Outlet, useParams } from "react-router-dom"
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useGetTaskSubmissionById } from "../../../packages/api";
import { ROUTES } from "../../../app";

const SupervisorLayout = () => {
    const { id } = useParams()
    const { data } = useGetTaskSubmissionById(id ?? '');
    return (
        <Container maxWidth="sm">
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 1.5,
                pb: 1,
                py: 3
            }}>
                <Typography variant="body1">
                    فرم {data?.task?.title}
                </Typography>
                <Link to={ROUTES.HOME.MANAGEMENT()}>
                    <IconButton sx={{
                        color: 'common.white'
                    }}>
                        <ArrowBackIosNewRoundedIcon />
                    </IconButton>
                </Link>
            </Box>
            <Outlet />
        </Container>
    )
}

export default SupervisorLayout