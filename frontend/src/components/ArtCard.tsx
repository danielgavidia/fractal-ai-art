import { useNavigate } from "react-router-dom";
import BouncingBall from "./BouncingBall";
import { Artwork } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faExpand, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FullscreenModal from "./FullscreenModal";

interface ArtCardProps {
  artwork: Artwork;
  userFeed: boolean;
  handleLike?: (artworkId: string) => void;
  handleDelete?: (artworkId: string) => void;
}

const ArtCard = ({ artwork, userFeed, handleLike, handleDelete }: ArtCardProps) => {
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

  // Modal logic
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-neutral-400 flex flex-col border-[0.5px] border-neutral-400 shadow-lg bg-stone-50 p-2 items-center">
      {/* Card header */}
      <div className="flex items-center space-x-2 p-1">
        {!userFeed && (
          <>
            <button
              onClick={() => navigate(`/profile/${user?.id}`)}
              className="text-xs text-neutral-600"
            >
              @{user?.username}
            </button>
            <span className="test-sm text-neutral-400">·</span>
          </>
        )}
        <span className="text-xs text-neutral-400">
          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>

      {/* Art */}
      <div className="border-[0.5px] border-neutral-400">
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

      {/* Card lower */}
      <div className="flex pt-2 space-x-14 items-center">
        {/* Likes */}
        {handleLike && !userFeed ? (
          <div className="flex space-x-4 items-center text-neutral-400">
            <button
              onClick={() => handleLike(id)}
              className="transition-transform transform hover:scale-150"
            >
              <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
            </button>
            <p className="text-sm">{likesCount}</p>
          </div>
        ) : (
          <div className="flex space-x-4 items-center text-neutral-400">
            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
            <p className="text-sm">{likesCount}</p>
          </div>
        )}

        {/* Editing and deleting */}
        {handleDelete && userFeed ? (
          <div className="flex space-x-4">
            {/* Edit */}
            <button
              onClick={() => navigate(`/editor/${id}`)}
              className="text-neutral-400 transition-transform transform hover:scale-150"
            >
              <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
            </button>

            {/* Delete */}
            <button
              onClick={() => handleDelete(id)}
              className="text-neutral-400 transition-transform transform hover:scale-150"
            >
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </button>

            {/* Fullscreen */}
            <button
              onClick={() => openModal()}
              className="text-neutral-400 transition-transform transform hover:scale-150"
            >
              <FontAwesomeIcon icon={faExpand}></FontAwesomeIcon>
            </button>
          </div>
        ) : (
          <></>
        )}

        {/* Fullscreen */}
        {!userFeed && (
          <button
            onClick={() => openModal()}
            className="text-neutral-400 transition-transform transform hover:scale-150"
          >
            <FontAwesomeIcon icon={faExpand}></FontAwesomeIcon>
          </button>
        )}
      </div>

      {/* Modal */}
      <FullscreenModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="border-[0.5px] border-neutral-400">
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
      </FullscreenModal>
    </div>
  );
};

export default ArtCard;
