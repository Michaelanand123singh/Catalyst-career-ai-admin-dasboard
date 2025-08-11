import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import LoginPage from './pages/LoginPage'
import UsersPage from './pages/UsersPage'
import ActivityPage from './pages/ActivityPage'
import RequireAuth from './components/RequireAuth'

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <RequireAuth />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <UsersPage /> },
          { path: 'activity', element: <ActivityPage /> },
        ],
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
