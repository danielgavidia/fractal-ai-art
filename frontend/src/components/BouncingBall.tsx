import { useState, useEffect } from "react";

interface BouncingBallProps {
	xVelocity: number;
	yVelocity: number;
}

const BouncingBall = ({ xVelocity, yVelocity }: BouncingBallProps) => {
	const [position, setPosition] = useState({ x: 50, y: 50 });
	const [velocity, setVelocity] = useState({ x: xVelocity, y: yVelocity });
	const ballSize = 30; // Ball diameter
	const boxWidth = 300; // Width of the rectangular space
	const boxHeight = 300; // Height of the rectangular space

	useEffect(() => {
		setPosition({ x: 50, y: 50 }); // Reset to starting position
		setVelocity({ x: xVelocity, y: yVelocity }); // Update velocity
	}, [xVelocity, yVelocity]);

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
