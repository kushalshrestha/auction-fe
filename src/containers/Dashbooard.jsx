import { React, useState } from 'react';
import PageRoutes from './PageRoutes';

function Dashboard() {
  const [curentUser] = useState({});

  return (
    <div>
        <div>
            <PageRoutes/>
        </div>
    </div>
  );
}

export default Dashboard;
