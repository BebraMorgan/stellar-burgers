import { FC, SyntheticEvent, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAuth } from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@hooks/useForm';

export const Register: FC = () => {
  const { values, handleChange } = useForm({
    userName: '',
    email: '',
    password: ''
  });

  const { register, error, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => () => clearError(), [clearError]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    register({
      name: values.userName,
      email: values.email,
      password: values.password
    });
  };

  return (
    <RegisterUI
      errorText={error || ''}
      userName={values.userName}
      email={values.email}
      password={values.password}
      handleInputChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
