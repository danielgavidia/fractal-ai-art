import { useEffect, useState } from "react";
import { Artwork, User } from "../types/types";
import { getArtworksUser, getUser } from "../utils/expressUtils";
import ArtCard from "./ArtCard";

interface ProfileProps {
  userId: string;
}

const Profile = ({ userId }: ProfileProps) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [userInfo, setUserInfo] = useState<User>();

  // Fetch user information and artworks
  useEffect(() => {
    const fetch = async () => {
      const [resArtworks, resUserInfo] = await Promise.all([
        getArtworksUser(userId),
        getUser(userId),
      ]);
      setArtworks(resArtworks);
      setUserInfo(resUserInfo);
    };
    fetch();
  }, []);

  return (
    <div className="p-6">
      {userInfo && (
        <div>
          {/* User info section */}
          <p className="font-bold">{userInfo?.email}</p>
          <p className="text-sm">
            Joined:{" "}
            {new Date(userInfo?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          {/* Artworks */}
          <div className="bg-stone-200 overflow-y-scroll space-y-4 flex flex-col justify-center items-center h-full py-6">
            {artworks
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((artwork, key) => (
                <ArtCard key={key} artwork={artwork} userFeed={true} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
