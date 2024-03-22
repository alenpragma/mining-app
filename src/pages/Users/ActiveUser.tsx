import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const ActiveUser = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Active User" />
      <h2>active users</h2>
    </DefaultLayout>
  );
};

export default ActiveUser;