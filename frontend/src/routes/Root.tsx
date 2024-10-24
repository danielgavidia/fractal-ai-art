import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div className="w-full bg-background text-foreground">
      {/* Navbar */}
      <Navbar />

      {/* Outlet */}
      <div className="p-2 w-full bg-neutral-950 dark:bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
