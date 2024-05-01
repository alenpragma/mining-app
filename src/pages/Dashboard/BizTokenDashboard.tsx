import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import LastestDeposits from '../../components/Tables/LastestDeposits';
import DefaultLayout from '../../layout/DefaultLayout';
import UserIcon from '../../assets/icon/UserIcon';
import { Link } from 'react-router-dom';
import LatestPurchaseHistory from './LatestPurchaseHistory';
import { FaUserCheck } from 'react-icons/fa6';
import { PiPackage } from 'react-icons/pi';
import { MdDownloading, MdOutlineDateRange, MdToday } from 'react-icons/md';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { LuListEnd } from 'react-icons/lu';
import { IUser } from '../Users/AllUsers';
import axios from 'axios';
import { IPackage } from '../../types/packages';
import { userToken } from '../../hooks/getTokenFromstorage';
import { IDeposit } from '../../types/deposit';

const BizTokenDashboard: React.FC = () => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [depositsData, setDepositData] = useState<IDeposit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://biztoken.fecotrade.com/api/user-lists',
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              'Content-Type': 'application/json',
            },
          },
        );
        setAllUsers(response?.data[0].users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://biztoken.fecotrade.com/api/packages',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setPackages(response?.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const depositData = async () => {
    try {
      const response = await axios.get(
        'https://biztoken.fecotrade.com/api/usdt-add-request',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setDepositData(response?.data[0].reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    depositData();
  }, []);

  const pending = depositsData?.filter(
    (deposit) => deposit?.status.includes('pending'),
  );

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Link to={'/users/all-user'}>
          <CardDataStats
            title="Total Users"
            total={allUsers.length}
            // rate="0.95%"
            // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>

        <Link to={'/users/active-user'}>
          <CardDataStats
            title="Active Users"
            total="0"
            // rate="0.95%"
            // levelDown
          >
            <FaUserCheck className="text-xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/package/package-list'}>
          <CardDataStats
            title="Packages"
            total={packages.length}
            // rate="0.95%"
            // levelDown
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/deposits/all-deposit'}>
          <CardDataStats
            title="Total Deposits"
            total={depositsData.length}
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

        <Link to={'/deposits/pending-deposit'}>
          <CardDataStats
            title="Pending Deposits"
            total={pending?.length}
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
            total="03"
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
          title="Today's Deposit"
          total="99999"
          // rate="0.95%"
          // levelDown
        >
          <MdToday className="lg:text-2xl text-xl dark:text-white text-primary " />
        </CardDataStats>

        {/* <CardDataStats
          title="Last day's Deposit"
          total="24234"
          // rate="0.95%"
          // levelDown
        >
          <MdOutlineDateRange className="lg:text-2xl text-xl dark:text-white text-primary " />
        </CardDataStats> */}
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
