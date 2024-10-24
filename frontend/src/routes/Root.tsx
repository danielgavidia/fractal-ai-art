import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div className="w-full bg-neutral-950 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Outlet */}
      <div className="p-2 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
