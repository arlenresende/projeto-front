import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from './pages/_layouts/app';
import { AuthLayout } from './pages/_layouts/auth';
import DashboardProfile from './pages/app/profile';
import ForgotPassword from './pages/auth/forgot-password';
import RegisterForm from './pages/auth/register/form';
import SignInForm from './pages/auth/sign-in/form';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/sign-in" replace />;
  return <>{children}</>;
}

function RedirectIfAuth({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  if (token) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: <DashboardProfile />,
      },
      {
        path: '/dashboard',
        element: <DashboardProfile />,
      },
      {
        path: '/dashboard/profile',
        element: <DashboardProfile />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <RedirectIfAuth>
        <AuthLayout />
      </RedirectIfAuth>
    ),
    children: [
      { path: '/sign-in', element: <SignInForm /> },
      { path: '/register', element: <RegisterForm /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
    ],
  },
]);
