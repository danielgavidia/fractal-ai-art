import { useState, useEffect } from "react";
import type { Ball } from "../types/types";
import { getRandomRGB, getRandomVelocity } from "../utils/bouncingBallUtils";

interface BouncingBallProps {
  xVelocity: number;
  yVelocity: number;
  ballSize: number;
  ballColor: string;
  backgroundColor: string;
  ballCount: number;
  randomnessFactor: number;
  randomColors: boolean;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
}

const BouncingBall = ({
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
}: BouncingBallProps) => {
  // Fixed values
  const boxWidth = 300; // Width of the rectangular space
  const boxHeight = 300; // Height of the rectangular space

  // Artwork configuration
  const [balls, setBalls] = useState<Ball[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: xVelocity, y: yVelocity });
  const [ballSizeState, setBallSizeState] = useState<number>(ballSize);
  const [ballColorState, setBallColorState] = useState<string>(ballColor);
  const [backgroundColorState, setBackgroundColorState] = useState<string>(backgroundColor);
  const [ballCountState, setBallCountState] = useState<number>(ballCount);
  const [randomnessFactorState, setRandomnessFactorState] = useState<number>(randomnessFactor);
  const [randomColorState, setRandomColorState] = useState<boolean>(randomColors);
  const [borderRadiusState, setBorderRadiusState] = useState<number>(borderRadius);
  const [borderWidthState, setBorderWidthState] = useState<number>(0);
  const [borderColorState, setBorderColorState] = useState<string>(borderColor);

  // Update original ball
  useEffect(() => {
    setPosition({ x: 0, y: 0 }); // Reset to starting position
    setVelocity({ x: xVelocity + 0.1, y: yVelocity + 0.1 });
    setBallSizeState(ballSize);
    setBallColorState(ballColor);
    setBackgroundColorState(backgroundColor);
    setBallCountState(ballCount);
    setRandomnessFactorState(randomnessFactor);
    setRandomColorState(randomColors);
    setBorderRadiusState(borderRadius);
    setBorderWidthState(borderWidth);
    setBorderColorState(borderColor);

    // Reset balls
    setBalls([]);
  }, [
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
  ]);

  // console.log(balls.length);

  // Interval for original ball
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;

        if (newX <= 0 || newX >= boxWidth - ballSize) {
          setVelocity((prevVel) => ({ ...prevVel, x: -prevVel.x }));
        }
        if (newY <= 0 || newY >= boxHeight - ballSize) {
          setVelocity((prevVel) => ({ ...prevVel, y: -prevVel.y }));
        }
        if (newX <= 0 || newX >= boxWidth - ballSize || newY <= 0 || newY >= boxHeight - ballSize) {
          addNewBall();
        }

        return { x: newX, y: newY };
      });
      // Update positions of all generated balls
      setBalls((prevBalls) => prevBalls.map(updateBallPosition));

      // Update ball bg color
      if (randomColorState) {
        setBalls((prevBalls) => prevBalls.map(updateBallColorRandomly));
      }
    }, 5);

    return () => clearInterval(interval);
  }, [velocity, balls]);

  // Update ball position
  function updateBallPosition(ball: Ball): Ball {
    const { position, velocity, ballSize } = ball;
    let newX = position.x + velocity.x;
    let newY = position.y + velocity.y;

    if (newX <= 0 || newX >= boxWidth - ballSize) {
      velocity.x = -velocity.x;
    }
    if (newY <= 0 || newY >= boxHeight - ballSize) {
      velocity.y = -velocity.y;
    }
    if (newX <= 0 || newX >= boxWidth - ballSize || newY <= 0 || newY >= boxHeight - ballSize) {
      addNewBall();
    }

    return { ...ball, position: { x: newX, y: newY } };
  }

  // Add new ball
  function addNewBall(): void {
    if (balls.length + 1 < ballCountState) {
      console.log("balls length", balls.length);
      console.log("ballCountState", ballCountState);
      const newBall: Ball = {
        id: Date.now(),
        position: {
          x: position.x,
          y: position.y,
        },
        velocity: getRandomVelocity(velocity, randomnessFactorState),
        ballSize: ballSizeState,
        ballColor: ballColorState,
        borderRadius: borderRadiusState,
        borderWidth: borderWidthState,
        borderColor: borderColorState,
      };
      setBalls((prevBalls) => [...prevBalls, newBall]);
    }
  }

  // Update ball bg color
  function updateBallColorRandomly(ball: Ball): Ball {
    const { position, velocity, ballSize } = ball;
    let newX = position.x + velocity.x;
    let newY = position.y + velocity.y;

    if (newX <= 0 || newX >= boxWidth - ballSize) {
      velocity.x = -velocity.x;
      return { ...ball, ballColor: getRandomRGB() };
    }
    if (newY <= 0 || newY >= boxHeight - ballSize) {
      velocity.y = -velocity.y;
      return { ...ball, ballColor: getRandomRGB() };
    }
    return ball;
  }

  return (
    <div
      style={{
        width: `${boxWidth}px`,
        height: `${boxHeight}px`,
        position: "relative",
        overflow: "hidden",
        backgroundColor: backgroundColorState,
      }}
    >
      <div
        style={{
          width: `${ballSizeState}px`,
          height: `${ballSizeState}px`,
          borderRadius: `${borderRadiusState}%`,
          border: `${borderWidth}px solid ${borderColor}`,
          backgroundColor: ballColorState,
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {balls.map((ball, index) => (
        <div
          key={index} // Add unique key for each ball
          style={{
            width: `${ball.ballSize}px`,
            height: `${ball.ballSize}px`,
            borderRadius: `${borderRadiusState}%`,
            border: `${borderWidth}px solid ${borderColor}`,
            backgroundColor: ball.ballColor,
            position: "absolute",
            left: `${ball.position.x}px`,
            top: `${ball.position.y}px`,
          }}
        />
      ))}
    </div>
  );
};

export default BouncingBall;
