import { createBrowserRouter } from "react-router-dom";
import AdminLayout from './pages/layouts/AdminLayout'
import GuestLayout from './pages/layouts/GuestLayout'
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import NotFound from './pages/NotFound';
import Users from "./pages/Users";
import EditUserForm from "./pages/EditUserForm";
import CreateUserForm from "./pages/CreateUserForm";
import CreateTaskForm from "./pages/CreateTaskForm";
import UpdateTaskForm from "./pages/UpdateTaskForm";

export default createBrowserRouter([
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: 'tasks',
                element: <Tasks />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <CreateUserForm />
            },
            {
                path: '/users/:id/edit',
                element: <EditUserForm />
            },
            {
                path: '/tasks/:id/edit',
                element: <UpdateTaskForm />
            },
            {
                path: '/tasks/new',
                element: <CreateTaskForm />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
    {
        path: '/*',
        element: <NotFound />
    }
])