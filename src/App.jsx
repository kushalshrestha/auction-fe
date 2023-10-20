import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./containers/Dashbooard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Secure Online Auction System
      </h1>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </>
  );
}

export default App;
