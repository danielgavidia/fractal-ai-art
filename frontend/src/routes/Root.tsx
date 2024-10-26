import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";

const Root = () => {
  return (
    <div className="w-full bg-stone-200 h-screen flex justify-center">
      {/* Container for the layout with left sidebar, center content, and right sidebar */}
      <div className="flex w-full max-w-screen-lg h-full">
        {/* Left Sidebar */}
        <div className="w-40 border-r-2 border-black hidden md:block">
          <Navbar />
        </div>

        {/* Center Content */}
        <div className="flex-grow max-w-2xl bg-white h-full overflow-y-scroll no-scrollbar">
          <Outlet />
        </div>

        {/* Invisible Right Sidebar for balancing layout */}
        <div className="w-40 border-l-2 border-black hidden md:block" />
      </div>

      {/* Bottom Navbar for mobile screens */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        <BottomNavbar />
      </div>
    </div>
  );
};

export default Root;
