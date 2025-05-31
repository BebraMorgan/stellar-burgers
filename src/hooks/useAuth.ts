import { useCallback } from 'react';
import { useDispatch, useSelector } from '@store';
import {
  fetchUser,
  updateUser,
  loginUser,
  registerUser,
  logoutUser,
  clearUserError
} from '@slices';
import {
  selectUser,
  selectUserLoading,
  selectUserError,
  selectIsAuthenticated
} from '@selectors';

import type { TRegisterData, TLoginData } from '@api';

export const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const getUser = useCallback(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const updateUserData = useCallback(
    (userData: Partial<TRegisterData>) => {
      dispatch(updateUser(userData));
    },
    [dispatch]
  );

  const login = useCallback(
    (loginData: TLoginData) => {
      dispatch(loginUser(loginData));
    },
    [dispatch]
  );

  const register = useCallback(
    (registerData: TRegisterData) => {
      dispatch(registerUser(registerData));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    getUser,
    updateUserData,
    login,
    register,
    logout,
    clearError
  };
};
