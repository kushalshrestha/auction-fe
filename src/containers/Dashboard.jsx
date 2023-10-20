import { React, useState } from "react";
import PageRoutes from "./PageRoutes";
import Head from "./Head";

function Dashboard() {
  const [curentUser] = useState({});

  return (
    <div>
      <div>
        <Head />
      </div>
      <div className="py-20">
        <PageRoutes />
      </div>
    </div>
  );
}

export default Dashboard;
