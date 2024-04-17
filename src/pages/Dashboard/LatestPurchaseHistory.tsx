import { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';


const LatestPurchaseHistory = () => {
  const [depositsData, setDepositData] = useState<any>([]);
  const token = localStorage.getItem('biztoken');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://biztoken.fecotrade.com/api/packages', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setDepositData(response?.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        latest Purchase History
      </h4>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {
            depositsData.length == 0 ?
              <div>
                <Skeleton height={40} count={6} />
              </div>
              :
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      SL NO
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      User
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Date
                    </th>

                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Package Name
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Price
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Daily Token
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Duration
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {depositsData?.map((packageItem: any, key: any) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {key + 1}
                        </h5>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          User
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          date
                        </h5>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {packageItem.package_name}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {packageItem.package_price}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {packageItem.daily_token}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {packageItem.duration} d
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {packageItem.status == 1 ? "Active" : 'Inactive'}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }
        </div>
      </div>
    </div>
  );
};

export default LatestPurchaseHistory;
