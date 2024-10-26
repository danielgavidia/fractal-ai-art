import { useContext, useEffect, useState } from "react";
import { Artwork, User } from "../types/types";
import { deleteArtwork, getArtworksUser, getUser } from "../utils/expressUtils";
import ArtCard from "./ArtCard";
import { AuthContext } from "./AuthProvider";
import { auth } from "@/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
  userId: string;
}

const Profile = ({ userId }: ProfileProps) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [profileInfo, setProfileInfo] = useState<User>();
  const navigate = useNavigate();

  const context = useContext(AuthContext);
  if (context === undefined) {
    return;
  }
  const { userInfo } = context;

  // Fetch user information and artworks
  useEffect(() => {
    const fetch = async () => {
      const [resArtworks, resProfileInfo] = await Promise.all([
        getArtworksUser(userId),
        getUser(userId),
      ]);
      setArtworks(resArtworks);
      setProfileInfo(resProfileInfo);
    };
    fetch();
  }, [userId]);

  // Handle delete
  async function handleDelete(artworkId: string): Promise<Artwork> {
    const res = await deleteArtwork(artworkId);
    setArtworks((prevArtworks) => prevArtworks.filter((artwork) => artwork.id !== artworkId));
    return res;
  }

  // Handle sign out
  async function logOut() {
    await auth.signOut();
    navigate("/feed");
  }

  return (
    <div className="px-6">
      {profileInfo && userInfo ? (
        <div>
          {/* User info section */}
          <div className="border-b border-neutral-300 p-4 sticky top-0 z-10 bg-neutral-200 flex">
            <div className="flex-1">
              <p className="font-bold">@{profileInfo?.username}</p>
              <p className="text-sm">
                Joined:{" "}
                {new Date(profileInfo?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            {profileInfo.id === userInfo.id && (
              <div className="flex items-center text-sm ">
                <button
                  onClick={() => logOut()}
                  className="w-full h-full rounded-lg border-[0.5px] border-black p-2 hover:bg-black hover:text-white"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          {/* Artworks */}
          <div className="bg-stone-200 overflow-y-scroll space-y-4 flex flex-col justify-center items-center h-full py-6">
            {artworks
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .map((artwork, key) =>
                profileInfo.id === userInfo.id ? (
                  <ArtCard
                    key={key}
                    artwork={artwork}
                    userFeed={true}
                    handleDelete={handleDelete}
                  />
                ) : (
                  <ArtCard key={key} artwork={artwork} userFeed={true} />
                )
              )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Profile;
