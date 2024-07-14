import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import LastestDeposits from '../../components/Tables/LastestDeposits';
import DefaultLayout from '../../layout/DefaultLayout';
import UserIcon from '../../assets/icon/UserIcon';
import { Link } from 'react-router-dom';
import LatestPurchaseHistory from './LatestPurchaseHistory';
import { FaUserCheck } from 'react-icons/fa6';
import { PiPackage } from 'react-icons/pi';
import { MdDownloading, MdToday } from 'react-icons/md';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { LuListEnd } from 'react-icons/lu';
import { baseUrl } from '../../utils/api';
import axiosInstance from '../../utils/axiosConfig';

const BizTokenDashboard: React.FC = () => {
  const [counts, setCounts] = useState<any>([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}/dashboard-data`);

      setCounts(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-6 2xl:grid-cols-4 2xl:gap-7.5">
        <Link to={'/users/all-user'}>
          <CardDataStats
            title="Total Users"
            total={counts?.total_users}
            // rate="0.95%"
            // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>

        <Link to={'/users/active-user'}>
          <CardDataStats
            title="Active Users"
            total={counts.active_users}
            // rate="0.95%"
            // levelDown
          >
            <FaUserCheck className="text-xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/users/inactive-user'}>
          <CardDataStats
            title="Inactive Users"
            total={counts.inactive_users}
            // rate="0.95%"
            // levelDown
          >
            <FaUserCheck className="text-xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/package/package-list'}>
          <CardDataStats
            title="Packages"
            total={counts.packages}
            // rate="0.95%"
            // levelDown
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/deposits/all-deposit'}>
          <CardDataStats
            title="All Deposits"
            total={counts.total_deposits_count}
            // rate="0.95%"
            // levelDown
          >
            <svg
              className="w-6 h-6 text-xl dark:text-white text-primary"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
              />
            </svg>
          </CardDataStats>
        </Link>
        <Link to={'/deposits/all-deposit'}>
          <CardDataStats
            title="Total Deposits"
            total={counts?.total_deposits_amount?.toFixed(6)}
          >
            <svg
              className="w-6 h-6 text-xl dark:text-white text-primary"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
              />
            </svg>
          </CardDataStats>
        </Link>

        <Link to={'/deposits/pending-deposit'}>
          <CardDataStats
            title="Pending Deposits Amount"
            total={counts?.total_deposits_amount_pending}
            // rate="0.95%"
            // levelDown
          >
            <MdDownloading className="text-2xl dark:text-white text-primary " />
          </CardDataStats>
        </Link>

        <Link to={'/deposits/pending-deposit'}>
          <CardDataStats
            title="All Pending Deposits"
            total={counts?.total_deposits_count_pending}
            // rate="0.95%"
            // levelDown
          >
            <MdDownloading className="text-2xl dark:text-white text-primary " />
          </CardDataStats>
        </Link>

        <Link to={'/withdraw/all-withdraws'}>
          <CardDataStats
            title="Total Withdrawls"
            total="0"
            // rate="0.95%"
            // levelDown
          >
            <BiMoneyWithdraw className="lg:text-2xl text-xl dark:text-white text-primary " />
          </CardDataStats>
        </Link>

        <Link to={'/withdraw/pending-withdraws'}>
          <CardDataStats
            title="Pending Withdrawls"
            total="0"
            // rate="0.95%"
            // levelDown
          >
            <MdDownloading className="lg:text-2xl text-xl dark:text-white text-primary " />
          </CardDataStats>
        </Link>

        <Link to={'/payment-settings/deposit-methods'}>
          <CardDataStats
            title="Deposit Methods"
            total={counts?.total_deposit_methods}
            // rate="0.95%"
            // levelDown
          >
            <LuListEnd className="lg:text-2xl text-xl dark:text-white text-primary " />
          </CardDataStats>
        </Link>
      </div>

      <hr className="my-5" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Today's Total Deposit"
          total={counts?.today_total_deposits_amount}
        >
          <MdToday className="lg:text-2xl text-xl dark:text-white text-primary " />
        </CardDataStats>

        <CardDataStats
          title="Today's Deposit"
          total={counts?.today_total_deposits_count}
        >
          <MdToday className="lg:text-2xl text-xl dark:text-white text-primary " />
        </CardDataStats>
      </div>

      <div className="mt-5">
        <LastestDeposits />
        <div className="mt-5">
          <LatestPurchaseHistory />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BizTokenDashboard;
