import { useEffect, useState } from "react";
import BouncingBall from "./BouncingBall";
import { getArtworks, postLike } from "../utils/expressUtils";
import { Artwork } from "../types/types";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

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
    <div className="bg-stone-200 overflow-y-scroll space-y-4 flex flex-col justify-center items-center h-full py-6">
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
            <Card
              key={key}
              className="bg-neutral-400 flex flex-col border-[0.5px] border-neutral-400 shadow-lg bg-stone-50"
            >
              <CardHeader>
                <CardDescription className="flex items-center space-x-2 text-neutral-400">
                  <button onClick={() => navigate(`/profile/${user?.id}`)} className="text-sm">
                    {user?.email}
                  </button>
                  <p className="test-sm">·</p>
                  <p className="text-sm">
                    {new Date(createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-[0.5px] border-black">
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
                </div>
              </CardContent>

              <CardFooter className="flex space-x-2 pt-2 justify-center">
                <button onClick={() => handleLike(id)} className="text-neutral-400">
                  <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                </button>

                <p className="p-2 text-neutral-400">{likesCount}</p>
              </CardFooter>
            </Card>
          );
        })}
    </div>
  );
};

export default Feed;
