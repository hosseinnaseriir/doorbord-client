import { lazy, Suspense } from "react";
import {
    createBrowserRouter,
    Outlet,
} from "react-router-dom";

const LoginScreen = lazy(() => import("../../pages/authentication/LoginScreen"))

const HomeLayout = lazy(() => import("../../modules/home/HomeLayout/HomeLayout"))
const HomeScreen = lazy(() => import("../../pages/home/HomeScreen"))
const ManagementHomeScreen = lazy(() => import("../../pages/home/ManagementHomeScreen"))

const AdminLayout = lazy(() => import("../../modules/admin/AdminLayout/AdminLayout"))
const TasksScreen = lazy(() => import("../../pages/admin/TasksScreen"))
const FieldsScreen = lazy(() => import("../../pages/admin/FieldsScreen"))
const FormGeneratorScreen = lazy(() => import("../../pages/forms/FormGeneratorScreen"))
const FormsLayout = lazy(() => import("../../modules/forms/FormsLayout/FormsLayout"))
const SupervisorLayout = lazy(() => import("../../modules/supervisor/SupervisorLayout/SupervisorLayout"))
const SupervidorAssignTask = lazy(() => import("../../pages/supervidor/SupervidorAssignTask"))

export const ROUTES = {
    ADMIN: {
        ROOT: '/admin',
        TASKS() {
            return this.ROOT + '/tasks'
        },
        FIELDS() {
            return this.ROOT + '/fields'
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
    },
    FORMS: {
        ROOT: '/forms',
    },
    SUPERVISOR: {
        ROOT: '/supervisor'
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

            },
            {
                path: ROUTES.ADMIN.FIELDS(),
                element:
                    <Suspense fallback={'...'}>
                        <FieldsScreen />
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
    },
    {
        path: ROUTES.FORMS.ROOT,
        element: <Suspense fallback={'...'}>
            <FormsLayout />
        </Suspense>,
        children: [
            {
                path: ROUTES.FORMS.ROOT + '/:id',
                element: <FormGeneratorScreen />
            }
        ]
    },
    {
        path: ROUTES.SUPERVISOR.ROOT,
        element: <Suspense fallback={'...'}>
            <SupervisorLayout />
        </Suspense>,
        children: [
            {
                path: ROUTES.SUPERVISOR.ROOT + '/:id',
                element: <Suspense fallback={'...'}>
                    <SupervidorAssignTask />
                </Suspense>
            }
        ]
    }
]);
