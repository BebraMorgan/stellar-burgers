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

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation
} from 'react-router-dom';
import { useEffect } from 'react';
import { useIngredients } from '@hooks/useIngredients';
import { useOrders } from '@hooks/useOrders';
import { useFeed } from '@hooks/useFeed';
import { useAuth } from '@hooks/useAuth';

const RootLayout = () => {
  const { fetchIngredients } = useIngredients();
  const { isAuthenticated, getUser } = useAuth();
  const { fetchOrders } = useOrders();
  const { getFeeds } = useFeed();

  useEffect(() => {
    fetchIngredients();
    getUser();
    getFeeds();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};

const GuestRoutes = () => <ProtectedRoute type='guest' />;

const AuthRoutes = () => <ProtectedRoute type='auth' />;

const DefautRoutes = () => <ProtectedRoute type='all' />;

const AppRoutes = () => {
  const location = useLocation();

  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<RootLayout />}>
          <Route element={<GuestRoutes />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
          </Route>

          <Route element={<AuthRoutes />}>
            <Route path='profile' element={<Profile />} />
            <Route path='profile/orders' element={<ProfileOrders />} />
            <Route path='profile/orders/:number' element={<OrderInfo />} />
          </Route>

          <Route element={<DefautRoutes />}>
            <Route index element={<ConstructorPage />} />

            <Route path='feed' element={<Feed />} />
            <Route path='feed/:number' element={<OrderInfo />} />
            <Route path='ingredients/:id' element={<IngredientDetails />} />

            <Route path='*' element={<NotFound404 />} />
          </Route>
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path='profile/orders/:number'
            element={
              <ModalWrapper
                navigationOnClose='/profile/orders'
                title='Информация о заказе'
              >
                <OrderInfo />
              </ModalWrapper>
            }
          />
          <Route
            path='feed/:number'
            element={
              <ModalWrapper
                navigationOnClose='/feed'
                title='Информация о заказе'
              >
                <OrderInfo />
              </ModalWrapper>
            }
          />
          <Route
            path='ingredients/:id'
            element={
              <ModalWrapper
                navigationOnClose='/'
                title='Информация об ингредиенте'
              >
                <IngredientDetails />
              </ModalWrapper>
            }
          />
        </Routes>
      )}
    </>
  );
};

const App = () => (
  <div className={styles.app}>
    <Router>
      <AppRoutes />
    </Router>
  </div>
);

export default App;
