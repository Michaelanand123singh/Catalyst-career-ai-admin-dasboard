# Catalyst Career AI - Admin Dashboard

A modern admin dashboard for managing the Catalyst Career AI platform, built with React, Vite, and Tailwind CSS.

## Features

- **Secure Authentication**: JWT-based login system
- **User Management**: View and manage user accounts
- **Activity Monitoring**: Track system activity and user interactions
- **System Status**: Monitor backend health and performance
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js 18+ 
- Backend server running on `http://localhost:8000`
- Admin user account created in the backend

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Access the dashboard**:
   Open [http://localhost:5173](http://localhost:5173) in your browser

## Admin Login

Use the following credentials to access the admin dashboard:

- **Email**: `theanandsingh76@gmail.com`
- **Password**: `Password@#123`

## API Endpoints

The admin dashboard communicates with these backend endpoints:

- **Authentication**: `/api/auth/login`, `/api/auth/me`
- **User Management**: `/api/admin/users`
- **Activity Logs**: `/api/admin/activity`
- **System Status**: `/api/admin/system-status`, `/api/health`

## Project Structure

```
src/
├── components/
│   ├── AdminLogin.jsx      # Login form component
│   └── AdminDashboard.jsx  # Main dashboard component
├── services/
│   └── api.js             # API service layer
├── App.jsx                # Main app component
└── main.jsx               # App entry point
```

## Development

- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Lint code**: `npm run lint`

## Security Notes

- Admin access is controlled by JWT tokens
- Tokens are stored in localStorage (consider httpOnly cookies for production)
- Admin emails are configured in backend `.env` file
- All admin endpoints require valid authentication

## Troubleshooting

1. **Login fails**: Ensure backend is running and admin user exists
2. **API errors**: Check backend logs and CORS configuration
3. **Build errors**: Verify Node.js version compatibility

## Backend Integration

This dashboard requires the Catalyst Career AI backend with:
- Admin user account created
- JWT authentication enabled
- Admin endpoints accessible
- CORS configured for localhost:5173
