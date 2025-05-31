import { Modal } from '@components';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalWrapperProps } from './type';

export const ModalWrapper: FC<ModalWrapperProps> = ({
  title,
  children,
  navigationOnClose
}) => {
  const navigate = useNavigate();

  // Функция закрытия модалки — возвращаемся на предыдущий маршрут
  const onClose = () => {
    navigate(navigationOnClose);
  };

  return (
    <Modal title={title} onClose={onClose}>
      {children}
    </Modal>
  );
};
