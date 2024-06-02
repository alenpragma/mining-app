import Skeleton from 'react-loading-skeleton';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TableOne from './TableOne';
import TableTwo from './TableTwo';
import TableThiree from './TableThiree';
import TableFour from './TableFour';

const datas = [
  {
    PersonalFreeDirectRefer: 25,
    Bonus: 10,
  },
  {
    PersonalFreeDirectRefer: 50,
    Bonus: 25,
  },
];
const LeadershipSetting = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Leadership Setting" />
      <div className=" lg:w-[60%] mx-auto">
        <TableOne />
        <div className="mt-5"></div>
        <TableTwo />
        <div className="mt-5"></div>
        <TableThiree />
        <div className="mt-5"></div>
        <TableFour />
      </div>
    </DefaultLayout>
  );
};

export default LeadershipSetting;
