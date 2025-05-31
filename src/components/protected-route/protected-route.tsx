import { FC } from 'react';
import { ProtectedRouteProps } from './type';
import { useAuth } from '@hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ type = 'auth' }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Preloader />;
  }

  if (!isAuthenticated && type === 'auth') {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (isAuthenticated && type === 'guest') {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};
