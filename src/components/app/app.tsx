import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import '../../index.css';
import { ModalWrapper } from '../modal-wrapper/modal-wrapper';
import { ProtectedRoute } from '../protected-route/protected-route';
import styles from './app.module.css';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <ConstructorPage /> },
  {
    path: '/login',
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    )
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute>
        <Register />
      </ProtectedRoute>
    )
  },
  {
    path: '/forgot-password',
    element: (
      <ProtectedRoute>
        <ForgotPassword />
      </ProtectedRoute>
    )
  },
  {
    path: '/reset-password',
    element: (
      <ProtectedRoute>
        <ResetPassword />
      </ProtectedRoute>
    )
  },

  // Профиль пользователя и связанные страницы
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile/orders',
    element: (
      <ProtectedRoute>
        <ProfileOrders />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile/orders/:number',
    element: (
      <ProtectedRoute>
        <ModalWrapper title='Информация о заказе'>
          <OrderInfo />
        </ModalWrapper>
      </ProtectedRoute>
    )
  },

  // Лента заказов и детали заказа по номеру
  { path: '/feed', element: <Feed /> },
  {
    path: '/feed/:number',
    element: (
      <ModalWrapper title='Информация о заказе'>
        <OrderInfo />
      </ModalWrapper>
    )
  },

  // Страница с информацией об ингредиенте по ID
  {
    path: '/ingredients/:id',
    element: (
      <ModalWrapper title='Информация об ингредиенте'>
        <IngredientDetails />
      </ModalWrapper>
    )
  },

  // Обработка всех остальных путей — страница 404
  { path: '*', element: <NotFound404 /> }
]);

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <RouterProvider router={router} />
  </div>
);

export default App;
