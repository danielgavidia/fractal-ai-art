import { useState } from "react";
import BouncingBall from "./BouncingBall";
import { postArtwork } from "../utils/expressUtils";

const Editor = () => {
	const [xVelocity, setXVelocity] = useState<number>(2);
	const [yVelocity, setYVelocity] = useState<number>(2);

	const xBounds = { upper: 20, lower: 0 };
	const yBounds = { upper: 20, lower: 0 };

	// Change velocity
	function handleSetVelocity(type: string, increase: boolean): void {
		if (type === "x" && increase && xVelocity < xBounds.upper) {
			setXVelocity((prev) => prev + 2);
		} else if (type === "x" && !increase && xVelocity > xBounds.lower) {
			setXVelocity((prev) => prev - 2);
		} else if (type === "y" && increase && yVelocity < yBounds.upper) {
			setYVelocity((prev) => prev + 2);
		} else if (type === "y" && !increase && yVelocity > yBounds.lower) {
			setYVelocity((prev) => prev - 2);
		}
	}

	return (
		<div className="w-full justify-center">
			{/* Edit X velocity */}
			<div className="flex justify-between">
				<p>X Velocity</p>
				<button onClick={() => handleSetVelocity("x", false)}>-</button>
				<p>{xVelocity}</p>
				<button onClick={() => handleSetVelocity("x", true)}>+</button>
			</div>

			{/* Edit Y velocity */}
			<div className="flex justify-between">
				<p>Y Velocity</p>
				<button onClick={() => handleSetVelocity("y", false)}>-</button>
				<p>{yVelocity}</p>
				<button onClick={() => handleSetVelocity("y", true)}>+</button>
			</div>

			{/* Bouncing Ball viewer */}
			<div className="w-full flex justify-center pb-2">
				<BouncingBall xVelocity={xVelocity} yVelocity={yVelocity} />
			</div>

			{/* Post button */}
			<div className="w-full flex justify-center">
				<button
					onClick={() => postArtwork(xVelocity, yVelocity)}
					className="w-40 h-12 bg-sky-700 text-white rounded-lg"
				>
					Post
				</button>
			</div>
		</div>
	);
};

export default Editor;
