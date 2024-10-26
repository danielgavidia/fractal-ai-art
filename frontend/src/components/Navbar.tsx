import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenToSquare,
  faUser,
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (context === undefined) {
    return;
  }
  const { user, userInfo, loading } = context;

  return (
    <nav className="h-screen flex flex-col justify-center">
      <button onClick={() => navigate("/feed")} className="p-2 border-b border-neutral-300 m-2">
        bouncy art
      </button>
      <button
        onClick={() => navigate("/feed")}
        className="p-2 transition-transform transform hover:scale-150"
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
      {user ? (
        // User is logged in
        <>
          <button
            onClick={() => navigate("/search")}
            className="p-2 transition-transform transform hover:scale-150"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <button
            onClick={() => navigate(`/editor/new`)}
            className="p-2 transition-transform transform hover:scale-150"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          {!loading ? (
            <>
              {userInfo && (
                <button
                  onClick={() => navigate(`/profile/${userInfo.id}`)}
                  className="p-2 transition-transform transform hover:scale-150"
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
              )}
            </>
          ) : (
            <p>Loading...</p> // Optional: Show a loading indicator
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

export default Navbar;
