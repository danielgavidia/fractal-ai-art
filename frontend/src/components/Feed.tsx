// import { useState } from "react";
import BouncingBall from "./BouncingBall";

// const configArrayDefault = [
// 	{ xVelocicy: 2, yVelocity: 2 },
// 	{ xVelocicy: 4, yVelocity: 4 },
// 	{ xVelocicy: 6, yVelocity: 6 },
// 	{ xVelocicy: 8, yVelocity: 8 },
// ];

const Feed = () => {
	// const [configArray, setConfigArray] = useState(configArrayDefault);

	const configArray = [
		{ xVelocicy: 2, yVelocity: 2 },
		{ xVelocicy: 4, yVelocity: 4 },
		{ xVelocicy: 6, yVelocity: 6 },
		{ xVelocicy: 8, yVelocity: 8 },
	];

	return (
		<div>
			{configArray.map((config, key) => {
				return (
					<div className="w-full flex justify-center pb-2">
						<BouncingBall key={key} xVelocity={config.xVelocicy} yVelocity={config.yVelocity} />
					</div>
				);
			})}
		</div>
	);
};

export default Feed;
