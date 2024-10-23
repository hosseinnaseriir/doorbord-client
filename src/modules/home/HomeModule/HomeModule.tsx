import { useMemo } from "react"
import { Container } from "../../../packages/ui"
import { AdminHome } from "./partials"
import { useGetProfileRole } from "../../../packages/api"

export const HomeModule = () => {

    const profile = useGetProfileRole()

    const defaultHome = useMemo(() => {
        switch (profile?.role) {
            case import.meta.env.VITE_SUPER_ADMIN_ROLE:
                return <AdminHome />
            case import.meta.env.VITE_ADMIN_ROLE:
                return <AdminHome />
            default:
                return <>default</>
        }
    }, [profile?.role])


    return (
        <Container sx={{
            p: 1,
            backgroundColor: 'background.paper',
            display: 'flex',
            minHeight: 'calc(100vh - 102px)'
        }}>

            {defaultHome}

        </Container>
    )
}

