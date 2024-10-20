import { Box } from "../../../packages/ui"
import { useCookies } from "react-cookie"
import { Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "../../../app"
import { Profilebar } from "./partials"

const HomeLayout = () => {
    const [cookies] = useCookies()

    if (!cookies?.token) return <Navigate to={ROUTES.AUTH.LOGIN()} />

    return (
        <Box sx={{
            p: 1,
            backgroundColor: 'background.default'
        }}>
            <Profilebar />
            <Outlet />
        </Box>
    )
}

export default HomeLayout