import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import UserIcon from '../../assets/icon/UserIcon';
import { Link } from 'react-router-dom';

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

        <Link to={'/users/all-user'}>
          <CardDataStats title="Pending Withdrawls" total="80"
          // rate="0.95%"
          // levelDown
          >
            <UserIcon />
          </CardDataStats>

        </Link>

        <Link to={'/users/all-user'}>
          <CardDataStats title="Deposit Methods" total="03"
          // rate="0.95%"
          // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>



      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </DefaultLayout>
  );
};

export default BizTokenDashboard;
