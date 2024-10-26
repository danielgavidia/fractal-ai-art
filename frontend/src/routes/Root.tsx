import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div className="w-full bg-stone-200 h-screen flex justify-center">
      {/* Container for the layout with left sidebar, center content, and right sidebar */}
      <div className="flex w-full max-w-screen-lg h-full">
        {/* Left Sidebar */}
        <div className="w-40 border-r-2 border-black">
          <Navbar />
        </div>

        {/* Center Content */}
        <div className="flex-grow max-w-2xl bg-white h-full overflow-y-scroll no-scrollbar">
          <Outlet />
        </div>

        {/* Invisible Right Sidebar for balancing layout */}
        <div className="w-40 border-l-2 border-black" />
      </div>
    </div>
  );
};

export default Root;
