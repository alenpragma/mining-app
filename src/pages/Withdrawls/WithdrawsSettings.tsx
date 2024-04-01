import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const WithdrawsSettings = () => {


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState();

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    console.log('Selected Date:', date);
  };
  return (

    <DefaultLayout>
      <Breadcrumb pageName="Withdraws Settings" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* <div>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="yyyy/MM/dd HH:mm"
          />
          <p>Lorem ipsum dolor sit.</p>
        </div> */}
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
    </DefaultLayout>
  );
};

export default WithdrawsSettings;