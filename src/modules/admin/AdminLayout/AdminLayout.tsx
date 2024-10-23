import { Link, Outlet, useNavigate } from "react-router-dom"
import { useGetProfile } from "../../../packages/api"
import { ROUTES } from "../../../app";
import { useEffect, useState } from "react";
import { Box, ButtonBase, Grid, useTheme, useMediaQuery, IconButton } from "../../../packages";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
const AdminLayout = () => {
    const { data, isPending } = useGetProfile();
    const [openMenu, setOpenMenu] = useState(false)
    const theme = useTheme()
    const navigate = useNavigate();
    const role = data?.user?.role;

    useEffect(() => {
        const superAdmin = role === import.meta.env.VITE_SUPER_ADMIN_ROLE;
        if (data?.user && !superAdmin && !isPending) {
            navigate(ROUTES.HOME.ROOT)
        }
    }, [data]);

    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            p: 1,
            minHeight: '100vh',
            backgroundColor: 'background.paper'
        }}>
            <Grid container>
                {/* @ts-ignore */}
                <Grid sx={{
                    backgroundColor: 'background.default',
                    overflow: 'hidden',
                    height: !smallScreen ? '100vh' : openMenu ? '100vh' : '80px',
                }} size={smallScreen ? 12 : 3}>
                    <Box sx={{
                        px: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Link to={ROUTES.HOME.MANAGEMENT()}>
                            <Box sx={{
                                p: 2,
                                pt: 3,
                            }}>
                                <img src="/doorbord.png" />
                            </Box>
                        </Link>
                        {smallScreen && <IconButton
                            onClick={() => setOpenMenu(prev => !prev)}
                            sx={{
                                color: 'common.white'
                            }}>
                            <MenuRoundedIcon fontSize="large" />
                        </IconButton>}
                    </Box>

                    <Box
                        onClick={() => setOpenMenu(prev => !prev)}
                        sx={{
                            p: 2,
                            width: '100%',
                            listStyle: 'none',
                            '& a': {
                                textDecoration: 'none',
                                color: t => t.palette.common.white
                            }
                        }} component="ul">
                        <ButtonBase sx={{
                            justifyContent: 'start',
                            p: 2,
                            width: '100%',
                        }} component="li">
                            <Link to={ROUTES.ADMIN.TASKS()}>
                                ماموریت ها
                            </Link>
                        </ButtonBase>
                        <ButtonBase sx={{
                            justifyContent: 'start',
                            p: 2,
                            width: '100%',
                        }} component="li">
                            <Link to={ROUTES.ADMIN.FIELDS()}>
                                فیلد ها
                            </Link>
                        </ButtonBase>
                    </Box>
                </Grid>
                {/* @ts-ignore */}
                <Grid size={smallScreen ? 12 : 9}>
                    <Outlet />
                </Grid>
            </Grid>
        </Box>
    )
}

export default AdminLayout