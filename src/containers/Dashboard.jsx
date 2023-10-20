import { React, useState } from 'react';
import PageRoutes from './PageRoutes';
import Head from './Header/Head';

function Dashboard() {
  const [curentUser] = useState({});

  return (
    <div>
      <div className="fixed top-0 left-0 right-0">
        <Head />
      </div>
      <div className="py-20">
        <PageRoutes />
      </div>
    </div>
  );
}

export default Dashboard;
