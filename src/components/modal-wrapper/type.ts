import { ReactNode } from 'react';

export interface ModalWrapperProps {
  title: string;
  children: ReactNode;
  navigationOnClose: string;
}
