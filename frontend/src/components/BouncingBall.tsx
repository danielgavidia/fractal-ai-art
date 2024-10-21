import React, { useState, useEffect } from "react";

const BouncingBall: React.FC = () => {
	const [position, setPosition] = useState({ x: 50, y: 50 });
	const [velocity, setVelocity] = useState({ x: 2, y: 2 });
	const ballSize = 30; // Ball diameter
	const boxWidth = 400; // Width of the rectangular space
	const boxHeight = 300; // Height of the rectangular space

	useEffect(() => {
		const interval = setInterval(() => {
			setPosition((prev) => {
				let newX = prev.x + velocity.x;
				let newY = prev.y + velocity.y;

				// Reverse the velocity if it hits the boundaries
				if (newX <= 0 || newX >= boxWidth - ballSize) {
					setVelocity((prevVel) => ({ ...prevVel, x: -prevVel.x }));
				}
				if (newY <= 0 || newY >= boxHeight - ballSize) {
					setVelocity((prevVel) => ({ ...prevVel, y: -prevVel.y }));
				}

				return { x: newX, y: newY };
			});
		}, 16); // Update every 16ms (approximately 60fps)

		return () => clearInterval(interval);
	}, [velocity]);

	return (
		<div
			style={{
				width: `${boxWidth}px`,
				height: `${boxHeight}px`,
				position: "relative",
				border: "2px solid black",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					width: `${ballSize}px`,
					height: `${ballSize}px`,
					borderRadius: "50%",
					backgroundColor: "blue",
					position: "absolute",
					left: `${position.x}px`,
					top: `${position.y}px`,
				}}
			/>
		</div>
	);
};

export default BouncingBall;
