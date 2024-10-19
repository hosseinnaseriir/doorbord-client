import { Button } from "@mui/material";
import { lazy } from "react";
import {
    createBrowserRouter,
    Outlet,
} from "react-router-dom";
import HomeLayout from "../../modules/home/HomeLayout/HomeLayout";

const LoginScreen = lazy(() => import("../../pages/authentication/LoginScreen"))

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
                element: <h1>home page</h1>
            }
        ]
    },
    {
        path: ROUTES.AUTH.ROOT,
        element: <><Outlet /></>,
        children: [{
            path: ROUTES.AUTH.LOGIN(),
            element: <LoginScreen />
        }]
    }
]);
