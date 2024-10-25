import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { useEffect, useState } from "react";
import { Artwork } from "@/types/types";
import { getArtworkUser } from "@/utils/expressUtils";

const RouteEditor = () => {
  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState<Artwork>();

  const defaultConfig: Artwork = {
    id: new Date().getTime().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
    xVelocity: 2,
    yVelocity: 2,
    ballSize: 30,
    ballColor: 0,
    backgroundColor: 360,
    ballCount: 1,
    randomnessFactor: 1,
    randomColors: false,
    borderRadius: 50,
    borderWidth: 0,
    borderColor: 360,
  };

  useEffect(() => {
    const fetch = async () => {
      if (artworkId) {
        const res: Artwork = await getArtworkUser(artworkId);
        setArtwork(res);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      {artworkId === "new" && <Editor config={defaultConfig} />}
      {artworkId !== "new" && artwork ? <Editor config={artwork} artworkId={artworkId} /> : <></>}
    </div>
  );
};

export default RouteEditor;
