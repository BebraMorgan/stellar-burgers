import { Dispatch, SetStateAction } from 'react';

export type LoginUIProps = {
  email: string;
  password: string;
  errorText: string;
  handleSubmit: (e: React.SyntheticEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
