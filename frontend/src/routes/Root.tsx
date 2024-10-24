import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div className="w-full bg-stone-200 h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Outlet */}
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
