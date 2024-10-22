import { useEffect, useState } from "react";
import BouncingBall from "./BouncingBall";
import { getArtworks, postLike } from "../utils/expressUtils";
import { Artwork } from "../types/types";

const Feed = () => {
	const [artworkArray, setArtworkArray] = useState<Artwork[]>([]);
	const [liked, setLiked] = useState<boolean>(false);

	// Reload configs
	useEffect(() => {
		const fetch = async () => {
			const res = await getArtworks();
			setArtworkArray(res);
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
			{artworkArray.map((artwork, key) => {
				const { id, xVelocity, yVelocity, user, createdAt, likesCount } = artwork;
				return (
					<div key={key} className="w-full flex flex-col justify-center items-center pb-2">
						<p className="text-sm">{user?.email}</p>
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
