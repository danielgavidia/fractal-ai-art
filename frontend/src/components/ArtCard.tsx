import { useNavigate } from "react-router-dom";
import BouncingBall from "./BouncingBall";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { Artwork } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

interface ArtCardProps {
  artwork: Artwork;
  userFeed: boolean;
  handleLike?: (id: string) => void;
}

const ArtCard = ({ artwork, userFeed, handleLike }: ArtCardProps) => {
  const navigate = useNavigate();
  const {
    // General config
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
    <Card className="bg-neutral-400 flex flex-col border-[0.5px] border-neutral-400 shadow-lg bg-stone-50">
      <CardHeader>
        <CardDescription className="flex items-center space-x-2 text-neutral-400">
          {!userFeed && (
            <>
              <button onClick={() => navigate(`/profile/${user?.id}`)} className="text-sm">
                {user?.email}
              </button>
              <span className="test-sm">·</span>
            </>
          )}
          <span className="text-sm">
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
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
        {handleLike && !userFeed ? (
          <button
            onClick={() => handleLike(id)}
            className="text-neutral-400 transition-transform transform hover:scale-150"
          >
            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
          </button>
        ) : (
          <div className="text-neutral-400">
            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
          </div>
        )}
        <p className="p-2 text-neutral-400">{likesCount}</p>
      </CardFooter>
    </Card>
  );
};

export default ArtCard;
