import { useEffect, useState } from "react";
import { Artwork, User } from "../types/types";
import BouncingBall from "./BouncingBall";
import { getArtworksUser, getUser } from "../utils/expressUtils";

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
    <div>
      {/* User info section */}
      <p>{userInfo?.email}</p>
      <p>Joined: {userInfo?.createdAt.toString()}</p>

      {/* Artworks */}
      {artworks.map((artwork, key) => {
        const {
          createdAt,
          likesCount,

          // Artwork config
          xVelocity,
          yVelocity,
          ballSize,
          ballColor,
          backgroundColor,
        } = artwork;
        return (
          <div key={key} className="w-full flex flex-col justify-center items-center pb-2">
            <p className="text-sm">{createdAt.toString()}</p>
            <BouncingBall
              xVelocity={xVelocity}
              yVelocity={yVelocity}
              ballSize={ballSize}
              ballColor={ballColor}
              backgroundColor={backgroundColor}
            />
            <div className="flex space-x-2 pt-2">
              <p className="p-2">{likesCount}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
