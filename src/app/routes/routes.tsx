import { lazy } from "react";
import {
    createBrowserRouter,
    Outlet,
} from "react-router-dom";


const HomeLayout = lazy(() => import("../../modules/home/HomeLayout/HomeLayout"))
const LoginScreen = lazy(() => import("../../pages/authentication/LoginScreen"))
const HomeScreen = lazy(() => import("../../pages/home/HomeScreen"))
const ManagementHomeScreen = lazy(() => import("../../pages/home/ManagementHomeScreen"))

export const ROUTES = {
    HOME: {
        ROOT: '/',
        MANAGEMENT() {
            return this.ROOT + '/management'
        }
    },
    AUTH: {
        ROOT: '/auth',
        LOGIN() {
            return this.ROOT + '/login'
        }
    }
}


export const router = createBrowserRouter([
    {
        path: ROUTES.HOME.ROOT,
        element: <HomeLayout />,
        children: [
            {
                path: ROUTES.HOME.ROOT,
                element: <HomeScreen />
            },
            {
                path: ROUTES.HOME.MANAGEMENT(),
                element: <ManagementHomeScreen/>
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
