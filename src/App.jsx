import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import UsersPage from './pages/UsersPage'
import ActivityPage from './pages/ActivityPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      { index: true, element: <UsersPage /> },
      { path: 'activity', element: <ActivityPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
