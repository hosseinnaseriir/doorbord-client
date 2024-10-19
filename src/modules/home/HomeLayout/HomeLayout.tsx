import { Box } from "../../../packages/ui"
import { useCookies } from "react-cookie"
import { Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "../../../app"

const HomeLayout = () => {
    const [cookies] = useCookies()

    if (!cookies?.token) return <Navigate to={ROUTES.AUTH.LOGIN()} />

    return (
        <Box sx={{
            p: 1,
            backgroundColor: 'background.default'
        }}>
            <Outlet />
        </Box>
    )
}

export default HomeLayout