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

	return (
		<div>
			{artworks.map((artwork, key) => {
				const { id, xVelocity, yVelocity, user, createdAt, likesCount } = artwork;
				return (
					<div key={key} className="w-full flex flex-col justify-center items-center pb-2">
						<button
							onClick={() => navigate(`/profile/${user?.id}`)}
							className="text-sm border-[0.5px] border-black rounded-lg p-1"
						>
							{user?.email}
						</button>
						<p className="text-sm">{createdAt.toString()}</p>
						<BouncingBall xVelocity={xVelocity} yVelocity={yVelocity} />
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
