import React, { ReactNode } from "react"
import { Box } from "../../../packages/ui"
import { useCookies } from "react-cookie"
import { Navigate } from "react-router-dom"
import { ROUTES } from "../../../app"

export const AuthenticationLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cookies] = useCookies()

    if (cookies?.token) return <Navigate to={ROUTES.HOME.ROOT} />

    return (
        <Box sx={{
            p: 1,
            backgroundColor: 'background.default'
        }}>
            <Box sx={{
                backgroundColor: 'secondary.dark',
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
            {children}
        </Box>
    )
}

