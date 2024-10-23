import { useState, useEffect } from "react";

type Ball = {
  id: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  ballSize: number;
  ballColor: string;
};

interface BouncingBallProps {
  xVelocity: number;
  yVelocity: number;
  ballSize: number;
  ballColor: string;
  backgroundColor: string;
  ballCount: number;
}

const BouncingBall = ({
  xVelocity,
  yVelocity,
  ballSize,
  ballColor,
  backgroundColor,
  ballCount,
}: BouncingBallProps) => {
  // Fixed values
  const boxWidth = 300; // Width of the rectangular space
  const boxHeight = 300; // Height of the rectangular space

  // Artwork configuration
  const [balls, setBalls] = useState<Ball[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: xVelocity, y: yVelocity });
  const [ballSizeState, setBallSizeState] = useState<number>(ballSize);
  const [ballColorState, setBallColorState] = useState<string>("rgb(0, 0, 0)");
  const [backgroundColorState, setBackgroundColorState] = useState<string>("rgb(255, 255, 255)");
  const [ballCountState, setBallCountState] = useState<number>(1);

  // Update original ball
  useEffect(() => {
    setPosition({ x: 0, y: 0 }); // Reset to starting position
    setVelocity({ x: xVelocity + Math.random(), y: yVelocity + Math.random() });
    setBallSizeState(ballSize);
    setBallColorState(ballColor);
    setBackgroundColorState(backgroundColor);
    setBallCountState(ballCount);

    // Reset balls
    setBalls([]);
  }, [xVelocity, yVelocity, ballSize, ballColor, backgroundColor, ballCount]);

  // Interval for original ball
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;

        if (newX <= 0 || newX >= boxWidth - ballSize) {
          setVelocity((prevVel) => ({ ...prevVel, x: -prevVel.x }));
          if (balls.length + 2 <= ballCountState) {
            addNewBall();
          }
        }
        if (newY <= 0 || newY >= boxHeight - ballSize) {
          setVelocity((prevVel) => ({ ...prevVel, y: -prevVel.y }));
          if (balls.length + 2 <= ballCountState) {
            addNewBall();
          }
        }

        return { x: newX, y: newY };
      });
      // Update positions of all generated balls
      setBalls((prevBalls) => prevBalls.map(updateBallPosition));
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
      if (balls.length + 2 <= ballCountState) {
        addNewBall();
      }
    }
    if (newY <= 0 || newY >= boxHeight - ballSize) {
      velocity.y = -velocity.y;
      if (balls.length + 2 <= ballCountState) {
        addNewBall();
      }
    }

    return { ...ball, position: { x: newX, y: newY } };
  }

  // Add new ball
  function addNewBall(): void {
    const newBall: Ball = {
      id: Date.now(),
      position: {
        x: position.x,
        y: position.y,
      },
      velocity: { x: velocity.x + Math.random(), y: velocity.y + Math.random() },
      ballSize: ballSizeState,
      ballColor: ballColorState,
    };
    setBalls((prevBalls) => [...prevBalls, newBall]);
  }

  return (
    <div
      style={{
        width: `${boxWidth}px`,
        height: `${boxHeight}px`,
        position: "relative",
        border: "2px solid black",
        overflow: "hidden",
        backgroundColor: backgroundColorState,
      }}
    >
      <div
        style={{
          width: `${ballSizeState}px`,
          height: `${ballSizeState}px`,
          borderRadius: "50%",
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
            borderRadius: "50%",
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
