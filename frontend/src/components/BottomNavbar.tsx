import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenToSquare,
  faUser,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const BottomNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full fixed bottom-0 bg-white border-t border-neutral-300 flex justify-around py-2">
      <button
        onClick={() => navigate("/feed")}
        className="p-2 transition-transform transform hover:scale-125"
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
      <button
        onClick={() => navigate("/search")}
        className="p-2 transition-transform transform hover:scale-125"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <button
        onClick={() => navigate(`/editor/new`)}
        className="p-2 transition-transform transform hover:scale-125"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <button
        onClick={() => navigate("/profile")}
        className="p-2 transition-transform transform hover:scale-125"
      >
        <FontAwesomeIcon icon={faUser} />
      </button>
    </nav>
  );
};

export default BottomNavbar;
