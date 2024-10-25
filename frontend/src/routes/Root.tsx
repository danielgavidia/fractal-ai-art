import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div className="w-full bg-stone-200 h-screen flex">
      {/* Navbar */}
      <Navbar />

      {/* Outlet */}
      <div className="w-full overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
