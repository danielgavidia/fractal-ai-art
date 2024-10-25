import { useEffect, useState } from "react";
import { getArtworks, postLike } from "../utils/expressUtils";
import { Artwork } from "../types/types";
import ArtCard from "./ArtCard";

const Feed = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [liked, setLiked] = useState<boolean>(false);

  // Reload configs
  useEffect(() => {
    const fetch = async () => {
      const res = await getArtworks();
      setArtworks(res);
      setLiked(false);
    };
    fetch();
  }, [liked]);

  // Handle add like
  async function handleLike(artworkId: string) {
    await postLike(artworkId);
    setLiked(true);
  }

  return (
    <div className="bg-stone-200 overflow-y-scroll space-y-4 flex flex-col justify-center items-center h-full py-6">
      {artworks
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((artwork, key) => (
          <ArtCard key={key} artwork={artwork} userFeed={false} handleLike={handleLike} />
        ))}
    </div>
  );
};

export default Feed;
