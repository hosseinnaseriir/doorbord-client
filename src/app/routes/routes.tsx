import { Button } from "@mui/material";
import { lazy } from "react";
import {
    createBrowserRouter,
    Outlet,
} from "react-router-dom";


const HomeLayout = lazy(() => import("../../modules/home/HomeLayout/HomeLayout"))
const LoginScreen = lazy(() => import("../../pages/authentication/LoginScreen"))
const HomeScreen = lazy(() => import("../../pages/home/HomeScreen"))

export const ROUTES = {
    ROOT: '/',
    AUTH: {
        ROOT: '/auth',
        LOGIN() {
            return this.ROOT + '/login'
        }
    }
}


export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <HomeLayout />,
        children: [
            {
                path: ROUTES.ROOT,
                element: <HomeScreen/>
            }
        ]
    },
    {
        path: ROUTES.AUTH.ROOT,
        element: <><Outlet /></>,
        children: [
            {
                path: ROUTES.AUTH.LOGIN(),
                element: <LoginScreen />
            }
        ]
    }
]);
