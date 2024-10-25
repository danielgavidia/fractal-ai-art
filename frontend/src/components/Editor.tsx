import { useState } from "react";
import BouncingBall from "./BouncingBall";
import { postArtwork } from "../utils/expressUtils";
import RainbowColorInput from "./RainbowColorInput";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import EditorControlNumerical from "./EditorControlNumerical";

const Editor = () => {
  // Navigate
  const navigate = useNavigate();

  // Context
  const { userInfo } = useFirebaseAuth();

  // State
  const [xVelocity, setXVelocity] = useState<number>(2);
  const [yVelocity, setYVelocity] = useState<number>(2);
  const [ballSize, setBallSize] = useState<number>(30);
  const [ballColor, setBallColor] = useState({
    rgb: "rgb(100, 100, 100)",
    hex: "#000000",
  });
  const [backgroundColor, setBackgroundColor] = useState({
    rgb: "rgb(200, 200, 200)",
    hex: "#000000",
  });
  const [ballCount, setBallCount] = useState<number>(1);
  const [randomnessFactor, setRandomnessFactor] = useState<number>(1);
  const [randomColors, setRandomColors] = useState<boolean>(false);
  const [borderRadius, setBorderRadius] = useState<number>(50);
  const [borderWidth, setBorderWidth] = useState<number>(0);
  const [borderColor, setBorderColor] = useState({ rgb: "rgb(100, 100, 100)", hex: "#000000" });

  // Set X Velocity
  function handleSetXVelocity(increase: boolean): void {
    const interval = 2;
    const bounds = { upper: 20, lower: 0 };

    if (increase && xVelocity + interval <= bounds.upper) {
      setXVelocity((prev) => prev + interval);
    } else if (!increase && xVelocity - interval >= bounds.lower) {
      setXVelocity((prev) => prev - interval);
    }
  }

  // Set Y Velocity
  function handleSetYVelocity(increase: boolean): void {
    const interval = 2;
    const bounds = { upper: 20, lower: 0 };

    if (increase && yVelocity + interval <= bounds.upper) {
      setYVelocity((prev) => prev + interval);
    } else if (!increase && yVelocity - interval >= bounds.lower) {
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

  // Change background color
  const handleBackgroundColorChange = (rgb: string, hex: string) => {
    setBackgroundColor({ rgb, hex });
  };

  // Change ball count
  function handleSetBallCount(increase: boolean) {
    const minBallCount = 1;
    const maxBallCount = 60;
    if (increase && ballCount + 1 <= maxBallCount) {
      setBallCount((prev) => prev + 1);
    } else if (!increase && ballCount - 1 >= minBallCount) {
      setBallCount((prev) => prev - 1);
    }
  }

  // Change randomness factor
  function handleSetRandomnessFactor(increase: boolean) {
    const maxRandomness = 5;
    const minRandomness = 1;
    if (increase && randomnessFactor + 1 <= maxRandomness) {
      setRandomnessFactor((prev) => prev + 1);
    } else if (!increase && randomnessFactor - 1 >= minRandomness) {
      setRandomnessFactor((prev) => prev - 1);
    }
  }

  // Change border radius
  function handleSetBorderRadius(increase: boolean): void {
    const interval = 5;
    const lowerBound = 0;
    const upperBound = 55;

    if (increase && borderRadius + interval < upperBound) {
      setBorderRadius((prev) => prev + interval);
    } else if (!increase && borderRadius - interval > lowerBound) {
      setBorderRadius((prev) => prev - interval);
    }
  }

  // Change border width
  function handleSetBorderWidth(increase: boolean): void {
    const interval = 1;
    const lowerBound = 0;
    const upperBound = 10;

    if (increase && borderWidth + interval < upperBound) {
      setBorderWidth((prev) => prev + interval);
    } else if (!increase && borderWidth - interval > lowerBound) {
      setBorderWidth((prev) => prev - interval);
    }
  }

  // Change border color
  const handleBorderColorChange = (rgb: string, hex: string) => {
    setBorderColor({ rgb, hex });
  };

  const numericalControlArray = [
    {
      title: "X Velocity",
      value: xVelocity,
      handler: handleSetXVelocity,
    },
    {
      title: "Y Velocity",
      value: yVelocity,
      handler: handleSetYVelocity,
    },
    {
      title: "Ball Size",
      value: ballSize,
      handler: handleSetBallSize,
    },
    {
      title: "Ball Count",
      value: ballCount,
      handler: handleSetBallCount,
    },
    {
      title: "Randomness",
      value: randomnessFactor,
      handler: handleSetRandomnessFactor,
    },
    {
      title: "Border Radius",
      value: borderRadius,
      handler: handleSetBorderRadius,
    },
    {
      title: "Border Width",
      value: borderWidth,
      handler: handleSetBorderWidth,
    },
  ];

  return (
    <div className="w-full justify-center">
      <div>
        {numericalControlArray.map((control, key) => (
          <EditorControlNumerical
            key={key}
            title={control.title}
            value={control.value}
            handler={control.handler}
          />
        ))}
      </div>

      {/* Set random colors */}
      <div className="flex justify-between">
        <p>Random Colors</p>
        <button onClick={() => setRandomColors((state) => !state)}>Random</button>
      </div>

      {/* Edit ball color */}
      <div className="flex justify-between items-center">
        <p>Ball Color</p>
        <div className="flex-1">
          <RainbowColorInput onColorChange={handleBallColorChange} defaultHue={0} />
        </div>
      </div>

      {/* Edit background color */}
      <div className="flex justify-between items-center">
        <p>Background Color</p>
        <div className="flex-1">
          <RainbowColorInput onColorChange={handleBackgroundColorChange} defaultHue={60} />
        </div>
      </div>

      {/* Edit border color */}
      <div className="flex justify-between items-center">
        <p>Border Color</p>
        <div className="flex-1">
          <RainbowColorInput onColorChange={handleBorderColorChange} defaultHue={60} />
        </div>
      </div>

      {/* Bouncing Ball viewer */}
      <div className="w-full flex justify-center pb-2">
        <BouncingBall
          xVelocity={xVelocity}
          yVelocity={yVelocity}
          ballSize={ballSize}
          ballColor={ballColor.rgb}
          backgroundColor={backgroundColor.rgb}
          ballCount={ballCount}
          randomnessFactor={randomnessFactor}
          randomColors={randomColors}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          borderColor={borderColor.rgb}
        />
      </div>

      {/* Post button */}
      <div className="w-full flex justify-center">
        <button
          onClick={async () => {
            await postArtwork(
              xVelocity,
              yVelocity,
              ballSize,
              ballColor.rgb,
              backgroundColor.rgb,
              ballCount,
              randomnessFactor,
              randomColors,
              borderRadius,
              borderWidth,
              borderColor.rgb
            );
            navigate(`/profile/${userInfo?.id}`);
          }}
          className="w-40 h-12 bg-sky-700 text-white rounded-lg"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Editor;
