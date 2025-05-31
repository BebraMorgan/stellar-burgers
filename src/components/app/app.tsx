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

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

const RootLayout = () => (
  <>
    <AppHeader />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <ConstructorPage /> },

      {
        element: <ProtectedRoute type='guest' />,
        children: [
          { path: '/login', element: <Login /> },
          { path: '/register', element: <Register /> },
          { path: '/forgot-password', element: <ForgotPassword /> },
          { path: '/reset-password', element: <ResetPassword /> }
        ]
      },

      {
        element: <ProtectedRoute type='auth' />,
        children: [
          { path: '/profile', element: <Profile /> },
          { path: '/profile/orders', element: <ProfileOrders /> },
          {
            path: '/profile/orders/:number',
            element: (
              <ModalWrapper
                navigationOnClose='/profile/orders'
                title='Информация о заказе'
              >
                <OrderInfo />
              </ModalWrapper>
            )
          }
        ]
      },

      { path: '/feed', element: <Feed /> },
      {
        path: '/feed/:number',
        element: (
          <ModalWrapper navigationOnClose='/feed' title='Информация о заказе'>
            <OrderInfo />
          </ModalWrapper>
        )
      },
      {
        path: '/ingredients/:id',
        element: (
          <ModalWrapper
            navigationOnClose={'/'}
            title='Информация об ингредиенте'
          >
            <IngredientDetails />
          </ModalWrapper>
        )
      },

      { path: '*', element: <NotFound404 /> }
    ]
  }
]);

const App = () => (
  <div className={styles.app}>
    <RouterProvider router={router} />
  </div>
);

export default App;
