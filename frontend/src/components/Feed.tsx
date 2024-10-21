import { useEffect, useState } from "react";
import BouncingBall from "./BouncingBall";
import { getConfigs } from "../utils/getConfigs";
import { Config } from "../types/types";

const Feed = () => {
	const [configArray, setConfigArray] = useState<Config[]>([]);

	// Reload configs
	useEffect(() => {
		const fetch = async () => {
			const res = await getConfigs();
			setConfigArray(res);
		};
		fetch();
	}, []);

	return (
		<div>
			{configArray.map((config, key) => {
				return (
					<div key={key} className="w-full flex justify-center pb-2">
						<BouncingBall xVelocity={config.xVelocity} yVelocity={config.yVelocity} />
					</div>
				);
			})}
		</div>
	);
};

export default Feed;
