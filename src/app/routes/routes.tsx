import { Button } from "@mui/material";
import { lazy } from "react";
import {
    createBrowserRouter,
} from "react-router-dom";

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
        path: "/",
        element: <Button>سلام دنیا!</Button>,
    },
    {
        path: ROUTES.AUTH.ROOT,
        children: [{
            path: ROUTES.AUTH.LOGIN(),
            element: <LoginScreen />
        }]
    }
]);
