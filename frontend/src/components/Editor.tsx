import { useState } from "react";
import BouncingBall from "./BouncingBall";
import { postArtwork } from "../utils/expressUtils";
import RainbowColorInput from "./RainbowColorInput";

const Editor = () => {
  const [xVelocity, setXVelocity] = useState<number>(2);
  const [yVelocity, setYVelocity] = useState<number>(2);
  const [ballSize, setBallSize] = useState<number>(30);
  const [ballColor, setBallColor] = useState({
    rgb: "rgb(0, 0, 0)",
    hex: "#000000",
  });

  console.log(ballColor);

  // Change velocity
  function handleSetVelocity(type: string, increase: boolean): void {
    const interval = 2;
    const xBounds = { upper: 20, lower: 0 };
    const yBounds = { upper: 20, lower: 0 };

    if (type === "x" && increase && xVelocity < xBounds.upper) {
      setXVelocity((prev) => prev + interval);
    } else if (type === "x" && !increase && xVelocity > xBounds.lower) {
      setXVelocity((prev) => prev - interval);
    } else if (type === "y" && increase && yVelocity < yBounds.upper) {
      setYVelocity((prev) => prev + interval);
    } else if (type === "y" && !increase && yVelocity > yBounds.lower) {
      setYVelocity((prev) => prev - interval);
    }
  }

  // Change ball size
  function handleSetBallSize(increase: boolean): void {
    const interval = 10;
    const lowerBound = 0;
    const upperBound = 110;

    if (increase && ballSize + interval < upperBound) {
      setBallSize((prev) => prev + interval);
    } else if (!increase && ballSize - interval > lowerBound) {
      setBallSize((prev) => prev - interval);
    }
  }

  // Change ball color
  const handleBallColorChange = (rgb: string, hex: string) => {
    setBallColor({ rgb, hex });
  };

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

      {/* Edit ball size */}
      <div className="flex justify-between">
        <p>Ball Size</p>
        <button onClick={() => handleSetBallSize(false)}>-</button>
        <p>{ballSize}</p>
        <button onClick={() => handleSetBallSize(true)}>+</button>
      </div>

      {/* Edit ball color */}
      <div className="flex justify-between items-center">
        <p>Ball Color</p>
        <div className="flex-1">
          <RainbowColorInput onColorChange={handleBallColorChange} />
        </div>
      </div>

      {/* Bouncing Ball viewer */}
      <div className="w-full flex justify-center pb-2">
        <BouncingBall
          xVelocity={xVelocity}
          yVelocity={yVelocity}
          ballSize={ballSize}
          ballColor={ballColor.rgb}
        />
      </div>

      {/* Post button */}
      <div className="w-full flex justify-center">
        <button
          onClick={() => postArtwork(xVelocity, yVelocity, ballSize, ballColor.rgb)}
          className="w-40 h-12 bg-sky-700 text-white rounded-lg"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Editor;
