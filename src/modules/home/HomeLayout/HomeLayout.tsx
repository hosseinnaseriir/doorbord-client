import { Box } from "../../../packages/ui"
import { useCookies } from "react-cookie"
import { Outlet, useNavigate } from "react-router-dom"
import { ROUTES } from "../../../app"
import { Profilebar } from "./partials"
import { useEffect } from "react"

const HomeLayout = () => {
    const [cookies] = useCookies()
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies?.token) navigate(ROUTES.AUTH.LOGIN())
    }, [cookies])

    return (
        <Box sx={{
            p: 1,
            backgroundColor: 'background.paper',
            minHeight: '100vh'
        }}>
            <Profilebar />
            <Outlet />
        </Box>
    )
}

export default HomeLayout