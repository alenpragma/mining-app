import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import LastestDeposits from '../../components/Tables/LastestDeposits';
import DefaultLayout from '../../layout/DefaultLayout';
import UserIcon from '../../assets/icon/UserIcon';
import { Link } from 'react-router-dom';
import LatestPurchaseHistory from './LatestPurchaseHistory';



const BizTokenDashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

        <Link to={'/users/all-user'}>
          <CardDataStats title="Total Users" total="24"
          // rate="0.95%"
          // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>


        <Link to={'/users/active-user'}>
          <CardDataStats title="Active Users" total="05"
          // rate="0.95%"
          // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>

        <Link to={'/package/package-list'}>
          <CardDataStats title="Packages" total="03"
          // rate="0.95%"
          // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>


        <Link to={'/deposits/all-deposit'}>
          <CardDataStats title="Total Deposits" total="80"
          // rate="0.95%"
          // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>

        <Link to={'/deposits/pending-deposit'}>
          <CardDataStats title="Pending Deposits" total="05"
          // rate="0.95%"
          // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>

        <Link to={'/withdraw/all-withdraws'}>
          <CardDataStats title="Total Withdrawls" total="80"
          // rate="0.95%"
          // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>

        <Link to={'/withdraw/pending-withdraws'}>
          <CardDataStats title="Pending Withdrawls" total="80"
          // rate="0.95%"
          // levelDown
          >
            <UserIcon />
          </CardDataStats>

        </Link>

        <Link to={'/payment-settings/deposit-methods'}>
          <CardDataStats title="Deposit Methods" total="03"
          // rate="0.95%"
          // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>
      </div>


      <div className='mt-5'>

        <LastestDeposits />
        <div className='mt-5'>
          <LatestPurchaseHistory />
        </div>
      </div>



    </DefaultLayout>
  );
};

export default BizTokenDashboard;
