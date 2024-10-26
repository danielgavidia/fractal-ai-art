import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../utils/expressUtils";
import { User } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userData, setUserData] = useState<User[]>([]);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetch = async () => {
      const res = await getUsers();
      setUserData(res);
    };
    fetch();
  }, []);

  // Submit search query
  function searchUsers(userData: User[], query: string): User[] {
    const lowerQuery = query.toLowerCase();
    return userData.filter((x) => x.username.toLowerCase().includes(lowerQuery));
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (!userData) {
      return;
    }
    const newData = searchUsers(userData, searchQuery);
    setUserData(newData);
    setSearchQuery("");
  }

  return (
    <div className="h-full p-6 pt-10 w-full">
      <form onSubmit={handleSubmit}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="w-full p-3 bg-neutral-500 rounded-2xl outline-none text-white placeholder-white"
        />
      </form>
      <div className="p-1 space-y-2 pt-4">
        {userData && (
          <>
            {userData.map((user, key) => {
              return (
                <div
                  key={key}
                  className="flex justify-between items-center p-2 border-b border-neutral-400 text-neutral-500"
                >
                  <button
                    onClick={() => navigate(`/profile/${user.id}`)}
                    className="flex-1 text-start"
                  >
                    {user.username}
                  </button>
                  <p className="mr-4">{user.likesCount}</p>
                  <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
