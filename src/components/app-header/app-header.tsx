import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAuth } from '@hooks/useAuth';

export const AppHeader: FC = () => {
  const { user, isAuthenticated } = useAuth();
  const username = user && isAuthenticated ? user.name : '';
  return <AppHeaderUI userName={username} />;
};
