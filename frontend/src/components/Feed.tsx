import { useEffect, useState } from "react";
import BouncingBall from "./BouncingBall";
import { getArtworks } from "../utils/expressUtils";
import { Artwork } from "../types/types";

const Feed = () => {
	const [artworkArray, setArtworkArray] = useState<Artwork[]>([]);

	// Reload configs
	useEffect(() => {
		const fetch = async () => {
			const res = await getArtworks();
			setArtworkArray(res);
		};
		fetch();
	}, []);

	return (
		<div>
			{artworkArray.map((artwork, key) => {
				const { xVelocity, yVelocity } = artwork;
				return (
					<div key={key} className="w-full flex flex-col justify-center items-center pb-2">
						<p className="text-sm">{artwork.user?.email}</p>
						<p className="text-sm">{artwork.createdAt.toString()}</p>
						<BouncingBall xVelocity={xVelocity} yVelocity={yVelocity} />
					</div>
				);
			})}
		</div>
	);
};

export default Feed;
