import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import AllUsers from './pages/Users/AllUsers';
import ActiveUser from './pages/Users/ActiveUser';
import InacticeUser from './pages/Users/InacticeUser';
import PackageList from './pages/Package/PackageList';
import PendingDeposits from './pages/Deposits/PendingDeposits';
import SuccessDeposits from './pages/Deposits/SuccessDeposits';
import AllWithdraws from './pages/Withdrawls/AllWithdraws';
import PendingWithdraws from './pages/Withdrawls/PendingWithdraws';
import SuccessWithdraws from './pages/Withdrawls/SuccessWithdraws';
import GeneralSettings from './pages/GeneralSettings';
import BonusSettings from './pages/BonusSettings';
import DepositSettings from './pages/Deposits/DepositSettings';
import WihtdrawMethods from './pages/PaymentSettings/WihtdrawMethods';
// import DepositMethods from './pages/PaymentSettings/DepositMethods';
import BizTokenDashboard from './pages/Dashboard/BizTokenDashboard';
import PurchaseHistory from './pages/Purchase/PurchaseHistory';
import ProtectedRoute from './hooks/ProtectedRoute';
// import PackageSettings from './pages/Package/PackageSettings';

const Profile = lazy(() => import('./pages/Profile'));

const Buttons = lazy(() => import('./pages/UiElements/Buttons'));
const AllDeposits = lazy(() => import('./pages/Deposits/AllDeposits'));
const PackageSettings = lazy(() => import('./pages/Package/PackageSettings'));
const DepositMethods = lazy(
  () => import('./pages/PaymentSettings/DepositMethods'),
);

import MyContext from './hooks/MyContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import useLocalStorage from './hooks/useLocalStorage';
import useColorMode from './hooks/useColorMode';
import Lazyloding from './components/Lazyloding';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
  }, []);
  const [colorMode, setColorMode] = useColorMode();

  const contextValues = {
    colorMode,
    setColorMode,
  };
  console.log(colorMode);

  return (
    <>
      <MyContext.Provider value={contextValues}>
        <SkeletonTheme
          baseColor={`${colorMode === 'light' ? '#e5e6ea' : '#1d2a39'}`}
          highlightColor="#47566c"
        >
          <Routes>
            <Route
              index
              element={
                <>
                  <PageTitle title="SignIn" />
                  <SignIn />
                </>
              }
            />

            <Route
              path="/dashboard"
              element={
                <>
                  <PageTitle title="BIZ Token Dashboard" />
                  <ProtectedRoute></ProtectedRoute>
                  <BizTokenDashboard />
                </>
              }
            />

            <Route
              path="/users/all-user"
              element={
                <>
                  <PageTitle title="All Users" />
                  <ProtectedRoute>
                    <AllUsers />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/users/active-user"
              element={
                <>
                  <PageTitle title="All Users" />
                  <ProtectedRoute>
                    <ActiveUser />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/users/inactive-user"
              element={
                <>
                  <PageTitle title="inactive Users" />
                  <ProtectedRoute>
                    <InacticeUser />
                  </ProtectedRoute>
                </>
              }
            />

            {/* user end */}

            {/* Packages */}
            <Route
              path="/package/package-list"
              element={
                <>
                  <PageTitle title="package-list" />
                  <ProtectedRoute>
                    <PackageList />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/package/package-settings"
              element={
                <>
                  <PageTitle title="Package Settings" />
                  <Suspense fallback={<div>Loading...</div>}>
                    <ProtectedRoute>
                      <PackageSettings />
                    </ProtectedRoute>
                  </Suspense>
                </>
              }
            />

            <Route
              path="/purchase/purchase-history"
              element={
                <>
                  <PageTitle title="Purchase History" />
                  <ProtectedRoute>
                    <PurchaseHistory />
                  </ProtectedRoute>
                </>
              }
            />

            {/* Packages */}

            {/* Deposits start */}

            <Route
              path="/deposits/all-deposit"
              element={
                <>
                  <PageTitle title="All Deposit" />
                  <Suspense fallback={<Lazyloding />}>
                    <ProtectedRoute>
                      <AllDeposits />
                    </ProtectedRoute>
                  </Suspense>
                </>
              }
            />

            <Route
              path="/deposits/pending-deposit"
              element={
                <>
                  <PageTitle title="Pending Deposit" />
                  <ProtectedRoute>
                    <PendingDeposits />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/deposits/success-deposit"
              element={
                <>
                  <PageTitle title="Success Deposit" />
                  <ProtectedRoute>
                    <SuccessDeposits />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/deposits/deposit-settings"
              element={
                <>
                  <PageTitle title="Deposit Settings" />
                  <ProtectedRoute>
                    <DepositSettings />
                  </ProtectedRoute>
                </>
              }
            />

            {/* Deposits  end*/}

            <Route
              path="/withdraw/all-withdraws"
              element={
                <>
                  <PageTitle title="All withdraws" />
                  <ProtectedRoute>
                    <AllWithdraws />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/withdraw/pending-withdraws"
              element={
                <>
                  <PageTitle title="Pending Withdraws" />
                  <ProtectedRoute>
                    <PendingWithdraws />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/withdraw/success-withdraws"
              element={
                <>
                  <PageTitle title="Success Withdraws" />
                  <ProtectedRoute>
                    <SuccessWithdraws />
                  </ProtectedRoute>
                </>
              }
            />

            {/* withdrow end */}

            <Route
              path="/payment-settings/deposit-methods"
              element={
                <>
                  <PageTitle title="deposit Methods" />
                  <Suspense fallback={<Lazyloding />}>
                    <ProtectedRoute>
                      <DepositMethods />
                    </ProtectedRoute>
                  </Suspense>
                </>
              }
            />

            <Route
              path="/payment-settings/withdraw-methods"
              element={
                <>
                  <PageTitle title="deposit Methods" />
                  <ProtectedRoute>
                    <WihtdrawMethods />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile" />
                  <Suspense fallback={<Lazyloding />}>
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  </Suspense>
                </>
              }
            />
            <Route
              path="/forms/form-elements"
              element={
                <>
                  <PageTitle title="Form Elements" />
                  <ProtectedRoute>
                    <FormElements />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/general-settings"
              element={
                <>
                  <PageTitle title="General Settings" />
                  <ProtectedRoute>
                    <GeneralSettings />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/bonus-settings"
              element={
                <>
                  <PageTitle title="Bonus Settings" />
                  <ProtectedRoute>
                    <BonusSettings />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/forms/form-layout"
              element={
                <>
                  <PageTitle title="Form Layout" />
                  <ProtectedRoute>
                    <FormLayout />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/calendar"
              element={
                <>
                  <PageTitle title="Calendar" />
                  <ProtectedRoute>
                    <Calendar />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/tables"
              element={
                <>
                  <PageTitle title="Tables " />
                  <ProtectedRoute>
                    <Tables />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Settings" />
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/chart"
              element={
                <>
                  <PageTitle title="Basic Chart" />
                  <ProtectedRoute>
                    <Chart />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/ui/alerts"
              element={
                <>
                  <PageTitle title="Alerts " />
                  <ProtectedRoute>
                    <Alerts />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/buttons"
              element={
                <>
                  <PageTitle title="Buttons" />
                  <Suspense fallback={<Lazyloding />}>
                    <ProtectedRoute>
                      <Buttons />
                    </ProtectedRoute>
                  </Suspense>
                </>
              }
            />
            <Route
              path="/auth/signin"
              element={
                <>
                  <PageTitle title="Signin" />
                  <ProtectedRoute>
                    <SignIn />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <>
                  <PageTitle title="Signup" />
                  <ProtectedRoute>
                    <SignUp />
                  </ProtectedRoute>
                </>
              }
            />
          </Routes>
        </SkeletonTheme>
      </MyContext.Provider>
    </>
  );
}

export default App;
