import { lazy, Suspense } from "react";
import {
    createBrowserRouter,
    Outlet,
} from "react-router-dom";
import AdminLayout from "../../modules/admin/AdminLayout/AdminLayout";


const HomeLayout = lazy(() => import("../../modules/home/HomeLayout/HomeLayout"))
const LoginScreen = lazy(() => import("../../pages/authentication/LoginScreen"))
const HomeScreen = lazy(() => import("../../pages/home/HomeScreen"))
const ManagementHomeScreen = lazy(() => import("../../pages/home/ManagementHomeScreen"))
const TasksScreen = lazy(() => import("../../pages/admin/TasksScreen"))

export const ROUTES = {
    ADMIN: {
        ROOT: '/admin',
        TASKS() {
            return this.ROOT + '/tasks'
        }
    },
    HOME: {
        ROOT: '/',
        MANAGEMENT() {
            return this.ROOT + 'management'
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
        path: ROUTES.ADMIN.ROOT,
        element:
            <Suspense fallback={'...'}>
                <AdminLayout />
            </Suspense>,
        children: [
            {
                path: ROUTES.ADMIN.TASKS(),
                element:
                    <Suspense fallback={'...'}>
                        <TasksScreen />
                    </Suspense>

            }
        ]
    },
    {
        path: ROUTES.HOME.ROOT,
        element:
            <Suspense fallback={'...'}>
                <HomeLayout />
            </Suspense>,
        children: [
            {
                path: ROUTES.HOME.ROOT,
                element:
                    <Suspense fallback={'...'}>
                        <HomeScreen />
                    </Suspense>
            },
            {
                path: ROUTES.HOME.MANAGEMENT(),
                element:
                    <Suspense fallback={'...'}>
                        <ManagementHomeScreen />
                    </Suspense>
            }
        ]
    },
    {
        path: ROUTES.AUTH.ROOT,
        element: <Suspense fallback={'...'}><Outlet /></Suspense>,
        children: [
            {
                path: ROUTES.AUTH.LOGIN(),
                element:
                    <Suspense fallback={'...'}>
                        <LoginScreen />
                    </Suspense>
            }
        ]
    }
]);
