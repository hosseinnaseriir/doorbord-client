import { useCookies } from "react-cookie";
import { useGetProfile } from "../../../../../packages/api"
import { Avatar, Box, Container, IconButton, Typography } from "../../../../../packages/ui"
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../../app";
export const Profilebar = () => {
    const { data } = useGetProfile();
    const [, , removeCookie] = useCookies(['token'])
    const fullName = `${data?.user?.firstName} ${data?.user?.lastName}`;
    const isSuperAdmin = data?.user?.role === import.meta.env.VITE_SUPER_ADMIN;;
    const role = data?.user?.role === "admin" || isSuperAdmin ? "مدیریت" : "کاربر عادی"
    return (
        <Container sx={{
            py: 2
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flex: 1
                }}>
                    <Avatar />
                    <Box>
                        <Typography pt={1.5} lineHeight={1} variant="body1">{fullName}</Typography>
                        <Typography lineHeight={1} color="secondary" variant="caption">{role}</Typography>
                    </Box>
                </Box>
                {isSuperAdmin ? <Link to={ROUTES.ADMIN.ROOT}>
                    <IconButton
                        sx={{
                            color: 'common.white'
                        }}>
                        <ManageAccountsIcon />
                    </IconButton>
                </Link> : null}
                <IconButton
                    onClick={() => removeCookie('token')}
                    sx={{
                        color: 'common.white'
                    }}>
                    <LogoutIcon />
                </IconButton>

            </Box>
        </Container>
    )
}