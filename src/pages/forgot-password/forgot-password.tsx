import { FC, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { useForm } from '@hooks/useForm'; // путь укажите ваш

export const ForgotPassword: FC = () => {
  const { values, handleChange } = useForm({ email: '' });
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    forgotPasswordApi({ email: values.email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => {
        // Можно добавить обработку ошибки, например, через состояние
        console.error(err);
      });
  };

  return (
    <ForgotPasswordUI
      email={values.email}
      handleInputChange={handleChange}
      handleSubmit={handleSubmit}
      errorText={''} // Если хотите, можно добавить состояние ошибки и передать сюда
    />
  );
};
