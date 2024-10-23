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
  randomnessFactor: number;
  randomColors: boolean;
}

// Utils
// Get random RGB
function getRandomRGB(): string {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  return rgb;
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
}: BouncingBallProps) => {
  // Fixed values
  const boxWidth = 300; // Width of the rectangular space
  const boxHeight = 300; // Height of the rectangular space

  // Get random velocity
  function getRandomVelocity(
    velocity: { x: number; y: number },
    factor: number
  ): { x: number; y: number } {
    return {
      x: velocity.x + (Math.random() * 2 - 1) * factor,
      y: velocity.y + (Math.random() * 2 - 1) * factor,
    };
  }

  // Artwork configuration
  const [balls, setBalls] = useState<Ball[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: xVelocity, y: yVelocity });
  const [ballSizeState, setBallSizeState] = useState<number>(ballSize);
  const [ballColorState, setBallColorState] = useState<string>("rgb(100, 100, 100)");
  const [backgroundColorState, setBackgroundColorState] = useState<string>("rgb(200, 200, 200)");
  const [ballCountState, setBallCountState] = useState<number>(ballCount);
  const [randomnessFactorState, setRandomnessFactorState] = useState<number>(randomnessFactor);
  const [randomColorState, setRandomColorState] = useState<boolean>(false);

  // console.log(ballColorState);

  // Update original ball
  useEffect(() => {
    setPosition({ x: 0, y: 0 }); // Reset to starting position
    // setVelocity({ x: xVelocity + Math.random(), y: yVelocity + Math.random() });
    setVelocity({ x: xVelocity, y: yVelocity });
    setBallSizeState(ballSize);
    setBallColorState(ballColor);
    setBackgroundColorState(backgroundColor);
    setBallCountState(ballCount);
    setRandomnessFactorState(randomnessFactor);
    setRandomColorState(randomColors);

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
  ]);

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
      velocity: getRandomVelocity(velocity, randomnessFactorState),
      ballSize: ballSizeState,
      ballColor: ballColorState,
    };
    setBalls((prevBalls) => [...prevBalls, newBall]);
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
