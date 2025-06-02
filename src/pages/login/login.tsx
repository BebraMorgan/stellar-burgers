import { FC, SyntheticEvent, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useForm } from '@hooks/useForm'; // путь укажите ваш

export const Login: FC = () => {
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const { isAuthenticated, login, error } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    login({ email: values.email, password: values.password });
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={values.email}
      password={values.password}
      handleInputChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
