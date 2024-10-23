import { useEffect, useState } from "react";
import BouncingBall from "./BouncingBall";
import { getArtworks, postLike } from "../utils/expressUtils";
import { Artwork } from "../types/types";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const navigate = useNavigate();

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

  console.log(artworks);

  return (
    <div className="overflow-y-auto">
      {artworks
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((artwork, key) => {
          const {
            id,
            user,
            createdAt,
            likesCount,

            // Artwork config
            xVelocity,
            yVelocity,
            ballSize,
            ballColor,
            backgroundColor,
            ballCount,
            randomnessFactor,
            randomColors,
            borderRadius,
            borderWidth,
            borderColor,
          } = artwork;
          return (
            <div key={key} className="w-full flex flex-col justify-center items-center pb-2">
              <button
                onClick={() => navigate(`/profile/${user?.id}`)}
                className="text-sm border-[0.5px] border-black rounded-lg p-1"
              >
                {user?.email}
              </button>
              <p className="text-sm">{createdAt.toString()}</p>
              <BouncingBall
                xVelocity={xVelocity}
                yVelocity={yVelocity}
                ballSize={ballSize}
                ballColor={ballColor}
                backgroundColor={backgroundColor}
                ballCount={ballCount}
                randomnessFactor={randomnessFactor}
                randomColors={randomColors}
                borderRadius={borderRadius}
                borderWidth={borderWidth}
                borderColor={borderColor}
              />
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => handleLike(id)}
                  className="border-2 border-black rounded-lg p-2"
                >
                  Like
                </button>
                <p className="p-2">{likesCount}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Feed;
