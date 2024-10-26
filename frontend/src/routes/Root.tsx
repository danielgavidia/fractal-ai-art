import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

const Root = () => {
  return (
    <div className="w-full bg-stone-200 h-screen flex justify-center">
      {/* Top title bar */}
      <div className="fixed top-0 left-0 right-0 z-10 md:hidden">
        <div className="flex justify-center w-full bg-white border-b-2 border-black">
          <div className="w-full max-w-96 h-[50px] text-center p-2 font-bold flex justify-center space-x-2 items-center">
            <p>bouncy art</p>
            <FontAwesomeIcon icon={faCircle} />
          </div>
        </div>
      </div>

      {/* Container for the layout with left sidebar, center content, and right sidebar */}
      <div className="flex w-full max-w-screen-lg h-full">
        {/* Left Sidebar */}
        <div className="w-40 border-r-2 border-black hidden md:block">
          <Navbar />
        </div>

        {/* Center Content */}
        <div className="flex-grow max-w-2xl bg-stone-200 h-full overflow-y-scroll no-scrollbar pt-[52px] md:pt-0">
          <Outlet />
        </div>

        {/* Invisible Right Sidebar for balancing layout */}
        <div className="w-40 border-l-2 border-black hidden md:block" />
      </div>

      {/* Bottom Navbar for mobile screens */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        <div className="flex justify-center w-full bg-white border-t-2 border-black">
          <div className="w-full max-w-96">
            <BottomNavbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Root;
