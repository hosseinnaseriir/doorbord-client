import React, { ReactNode, useEffect } from "react"
import { Box } from "../../../packages/ui"
import { useCookies } from "react-cookie"
import {  useNavigate } from "react-router-dom"
import { ROUTES } from "../../../app"

export const AuthenticationLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cookies] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies?.token) navigate(ROUTES.HOME.ROOT)
    }, [cookies])


    return (
        <Box sx={{
            p: 1,
            backgroundColor: 'background.paper',
            minHeight: '100vh',
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
                backgroundColor: 'background.paper',
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

