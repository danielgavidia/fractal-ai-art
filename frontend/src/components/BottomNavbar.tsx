import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenToSquare,
  faUser,
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const BottomNavbar = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (context === undefined) {
    return;
  }
  const { user, userInfo, loading } = context;

  return (
    <nav className="w-full flex justify-around py-2">
      <button
        onClick={() => navigate("/feed")}
        className="p-2 transition-transform transform hover:scale-125"
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
      {user ? (
        <>
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
          {!loading ? (
            <>
              {userInfo && (
                <button
                  onClick={() => navigate(`/profile/${userInfo.id}`)}
                  className="p-2 transition-transform transform hover:scale-125"
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
              )}
            </>
          ) : (
            <>
              <p>Loading...</p>
            </>
          )}
        </>
      ) : (
        // User is logged out / not signed up
        <>
          <button
            onClick={() => navigate("/auth")}
            className="p-2 transition-transform transform hover:scale-150"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </>
      )}
    </nav>
  );
};

export default BottomNavbar;
