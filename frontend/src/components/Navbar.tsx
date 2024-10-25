import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenToSquare,
  faUser,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, userInfo } = useFirebaseAuth();

  async function logOut() {
    await auth.signOut();
    navigate("/feed");
  }

  return (
    <nav className="w-40 h-screen sticky top-0 left-0 z-10 flex flex-col border-r-2 border-black justify-center">
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
          {userInfo && (
            <>
              <button
                onClick={() => navigate(`/profile/${userInfo.id}`)}
                className="p-2 transition-transform transform hover:scale-150"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
              <button
                onClick={() => logOut()}
                className="p-2 transition-transform transform hover:scale-110"
              >
                Logout
              </button>
            </>
          )}
        </>
      ) : (
        // User is logged out / not signed up
        <>
          <button
            onClick={() => navigate("/auth/login")}
            className="p-2 transition-transform transform hover:scale-110"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/auth/signup")}
            className="p-2 transition-transform transform hover:scale-110"
          >
            Signup
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
