import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import AllUsers from './pages/Users/AllUsers';
import ActiveUser from './pages/Users/ActiveUser';
import InacticeUser from './pages/Users/InacticeUser';
import PackageList from './pages/Package/PackageList';
import PackageSettings from './pages/Package/PackageSettings';
import AllDeposits from './pages/Deposits/AllDeposits';
import PendingDeposits from './pages/Deposits/PendingDeposits';
import SuccessDeposits from './pages/Deposits/SuccessDeposits';
import AllWithdraws from './pages/Withdrawls/AllWithdraws';
import PendingWithdraws from './pages/Withdrawls/PendingWithdraws';
import SuccessWithdraws from './pages/Withdrawls/SuccessWithdraws';
import GeneralSettings from './pages/GeneralSettings';
import BonusSettings from './pages/BonusSettings';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
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
              <PageTitle title="eCommerce Dashboard" />
              <ECommerce />
            </>
          }
        />

        <Route
          path="/users/all-user"
          element={
            <>
              <PageTitle title="All Users" />
              <AllUsers />
            </>
          }
        />

        <Route
          path="/users/active-user"
          element={
            <>
              <PageTitle title="All Users" />
              <ActiveUser />
            </>
          }
        />
        <Route
          path="/users/inactive-user"
          element={
            <>
              <PageTitle title="inactive Users" />
              <InacticeUser />
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
              <PackageList />
            </>
          }
        />
        <Route
          path="/package/package-settings"
          element={
            <>
              <PageTitle title="Package Settings" />
              <PackageSettings />
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
              <AllDeposits />
            </>
          }
        />

        <Route
          path="/deposits/pending-deposit"
          element={
            <>
              <PageTitle title="Pending Deposit" />
              <PendingDeposits />
            </>
          }
        />

        <Route
          path="/deposits/success-deposit"
          element={
            <>
              <PageTitle title="Success Deposit" />
              <SuccessDeposits />
            </>
          }
        />

        {/* Deposits  end*/}

        <Route
          path="/withdraw/all-withdraws"
          element={
            <>
              <PageTitle title="All withdraws" />
              <AllWithdraws />
            </>
          }
        />
        <Route
          path="/withdraw/pending-withdraws"
          element={
            <>
              <PageTitle title="Pending Withdraws" />
              <PendingWithdraws />
            </>
          }
        />
        <Route
          path="/withdraw/success-withdraws"
          element={
            <>
              <PageTitle title="Success Withdraws" />
              <SuccessWithdraws />
            </>
          }
        />
        {/* withdrow end */}



        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements" />
              <FormElements />
            </>
          }
        />

        <Route
          path="/general-settings"
          element={
            <>
              <PageTitle title="General Settings" />
              <GeneralSettings />
            </>
          }
        />

        <Route
          path="/bonus-settings"
          element={
            <>
              <PageTitle title="General Settings" />
              <BonusSettings />
            </>
          }
        />


        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables " />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts " />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
