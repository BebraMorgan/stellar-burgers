import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';

export type RegisterUIProps = PageUIProps & {
  email: string;
  userName: string;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setUserName: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  errorText?: string;
  handleSubmit: (e: React.SyntheticEvent) => void;
};
