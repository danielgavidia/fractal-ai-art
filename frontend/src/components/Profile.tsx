import { useEffect, useState } from "react";
import { Artwork, User } from "../types/types";
import { deleteArtwork, getArtworksUser, getUser } from "../utils/expressUtils";
import ArtCard from "./ArtCard";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

interface ProfileProps {
  userId: string;
}

const Profile = ({ userId }: ProfileProps) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [profileInfo, setProfileInfo] = useState<User>();

  const { userInfo } = useFirebaseAuth();

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

  return (
    <div className="px-6">
      {profileInfo && userInfo ? (
        <div>
          {/* User info section */}
          <div className="border-b border-neutral-300 p-4 sticky top-0 z-20 bg-neutral-200">
            <p className="font-bold">{profileInfo?.email}</p>
            <p className="text-sm">
              Joined:{" "}
              {new Date(profileInfo?.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Artworks */}
          <div className="bg-stone-200 overflow-y-scroll space-y-4 flex flex-col justify-center items-center h-full py-6">
            {artworks
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
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
