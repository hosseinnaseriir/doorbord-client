import React, { ReactNode } from "react"
import { Box } from "../../../packages/ui"
import { useCookies } from "react-cookie"
import { Navigate } from "react-router-dom"
import { ROUTES } from "../../../app"

export const AuthenticationLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cookies] = useCookies()

    if (!cookies?.token) return <Navigate to={ROUTES.ROOT} />

    return (
        <Box sx={{
            p: 1,
            backgroundColor: 'background.default'
        }}>
            {children}
        </Box>
    )
}

