import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const AllDeposits = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Deposits" />
    </DefaultLayout>
  );
};

export default AllDeposits;