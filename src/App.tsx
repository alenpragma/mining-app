import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Settings from './pages/Settings';
import AllUsers from './pages/Users/AllUsers';
import ActiveUser from './pages/Users/ActiveUser';
import InacticeUser from './pages/Users/InacticeUser';
import PackageList from './pages/Package/PackageList';
import PendingDeposits from './pages/Deposits/PendingDeposits';
import SuccessDeposits from './pages/Deposits/SuccessDeposits';
import AllWithdraws from './pages/Withdrawls/AllWithdraws';
import PendingWithdraws from './pages/Withdrawls/PendingWithdraws';
import SuccessWithdraws from './pages/Withdrawls/SuccessWithdraws';
import BonusSettings from './pages/BonusSettings';
import DepositSettings from './pages/Deposits/DepositSettings';
import WihtdrawMethods from './pages/PaymentSettings/WihtdrawMethods';
import BizTokenDashboard from './pages/Dashboard/BizTokenDashboard';
import PurchaseHistory from './pages/Purchase/PurchaseHistory';
import ProtectedRoute from './hooks/ProtectedRoute';

const Profile = lazy(() => import('./pages/Profile'));
const GeneralSettings = lazy(
  () => import('./pages/GeneralSetting/GeneralSettings'),
);

const AllDeposits = lazy(() => import('./pages/Deposits/AllDeposits'));
const PackageSettings = lazy(() => import('./pages/Package/PackageSettings'));
const DepositMethods = lazy(
  () => import('./pages/PaymentSettings/DepositMethods'),
);

import MyContext from './hooks/MyContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import useColorMode from './hooks/useColorMode';
import Lazyloding from './components/Lazyloding';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import Stack from './pages/Stack/Stack';
import LeadershipSetting from './pages/LeadershipSetting/LeadershipSetting';
import VoucherPurchesHistory from './pages/ShoppingCart/VoucherPurchesHistory';
import StakingList from './pages/Staking/StakingList';
import StakingSettings from './pages/Staking/StakingSettings';
import Notification from './pages/Notification/Notification';
import Wallets from './pages/Wallets/Wallets';
import BizTWallet from './pages/Wallet/BizTWallet';
import AllKyc from './pages/Kyc/AllKyc';
import PendingKyc from './pages/Kyc/PendingKyc';
import FreeMining from './pages/Historys/FreeMining';
import Leadership from './pages/Historys/Leadership';
import PackageMining from './pages/Historys/PackageMining';
import A2ITokenHistory from './pages/Historys/A2ITokenHistory';
import MonthlyStakingHistory from './pages/Historys/MonthlyStakingHistory';
import PopUp from './pages/PopUp';
import ReferHistory from './pages/Historys/ReferHistory';
import LevelHistory from './pages/Historys/LevelHistory';
import BiztConversionHistory from './pages/Historys/BiztConversionHistory';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 100);
  // }, []);

  const [colorMode] = useColorMode();

  const [theme, setTheme] = useState<string | any>(colorMode);
  // console.log(theme);

  const contextValues = {
    theme,
    setTheme,
  };

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
                  <ProtectedRoute>
                    <BizTokenDashboard />
                  </ProtectedRoute>
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

            <Route
              path="/user-wallets"
              element={
                <>
                  <PageTitle title="Users Wallet" />
                  <ProtectedRoute>
                    <Wallets />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/wallets/bizt"
              element={
                <>
                  <PageTitle title="Bizt" />
                  <ProtectedRoute>
                    <BizTWallet />
                  </ProtectedRoute>
                </>
              }
            />

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
                  <Suspense fallback={<Lazyloding />}>
                    <ProtectedRoute>
                      <PackageSettings />
                    </ProtectedRoute>
                  </Suspense>
                </>
              }
            />

            <Route
              path="/package/purchase-history"
              element={
                <>
                  <PageTitle title="Packace Purchase History" />
                  <ProtectedRoute>
                    <PurchaseHistory />
                  </ProtectedRoute>
                </>
              }
            />

            {/* Packages */}

            {/* staking start */}
            <Route
              path="/staking/staking-list"
              element={
                <>
                  <PageTitle title="Staking List" />
                  <ProtectedRoute>
                    <StakingList />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/staking/staking-settings"
              element={
                <>
                  <PageTitle title="Staking Settings" />
                  <ProtectedRoute>
                    <StakingSettings />
                  </ProtectedRoute>
                </>
              }
            />
            {/* staking end */}

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

            {/* Historys routes start  */}
            <Route
              path="/historys/free-mining"
              element={
                <>
                  <PageTitle title="Free Mining" />
                  <ProtectedRoute>
                    <FreeMining />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/historys/leadership-bonus"
              element={
                <>
                  <PageTitle title="Leadership Bonus" />
                  <ProtectedRoute>
                    <Leadership />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/historys/paid-mining"
              element={
                <>
                  <PageTitle title="Package Mining" />
                  <ProtectedRoute>
                    <PackageMining />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/historys/a2i-token-history"
              element={
                <>
                  <PageTitle title="A2I Token" />
                  <ProtectedRoute>
                    <A2ITokenHistory />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/historys/monthly-staking-history"
              element={
                <>
                  <PageTitle title="Monthly Staking" />
                  <ProtectedRoute>
                    <MonthlyStakingHistory />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/historys/refer-history"
              element={
                <>
                  <PageTitle title="Refer History" />
                  <ProtectedRoute>
                    <ReferHistory />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/historys/level-history"
              element={
                <>
                  <PageTitle title="Refer History" />
                  <ProtectedRoute>
                    <LevelHistory />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/historys/bizt-conversion-history"
              element={
                <>
                  <PageTitle title="Refer History" />
                  <ProtectedRoute>
                    <BiztConversionHistory />
                  </ProtectedRoute>
                </>
              }
            />

            {/* Historys routes start  */}

            <Route
              path="/shopping-cart"
              element={
                <>
                  <PageTitle title="Profile" />
                  <ProtectedRoute>
                    <ShoppingCart />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/voucher-purches-history"
              element={
                <>
                  <PageTitle title="Voucher Purches History" />
                  <ProtectedRoute>
                    <VoucherPurchesHistory />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/stack"
              element={
                <>
                  <PageTitle title="stack" />
                  <ProtectedRoute>
                    <Stack />
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
              path="/general-settings"
              element={
                <>
                  <PageTitle title="General Settings" />
                  <Suspense fallback={<Lazyloding />}>
                    <ProtectedRoute>
                      <GeneralSettings />
                    </ProtectedRoute>
                  </Suspense>
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
              path="/leadership-setting"
              element={
                <>
                  <PageTitle title="leadership-setting" />
                  <ProtectedRoute>
                    <LeadershipSetting />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/pop-up"
              element={
                <>
                  <PageTitle title="pop up" />
                  <ProtectedRoute>
                    <PopUp />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/kyc/all-kyc"
              element={
                <>
                  <PageTitle title="All Kyc" />
                  <ProtectedRoute>
                    <AllKyc />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/kyc/pending-kyc"
              element={
                <>
                  <PageTitle title="Pending Kyc" />
                  <ProtectedRoute>
                    <PendingKyc />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/notification"
              element={
                <>
                  <PageTitle title="Notification" />
                  <ProtectedRoute>
                    <Notification />
                  </ProtectedRoute>
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
