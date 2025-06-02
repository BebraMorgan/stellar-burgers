import { FC, useEffect, useState } from 'react';
import { ProtectedRouteProps } from './type';
import { useAuth } from '@hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ type = 'auth' }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!loading) {
      setInitialized(true);
    }
  }, [loading]);

  if (type === 'all') {
    return <Outlet />;
  }

  if (loading || !initialized) {
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
