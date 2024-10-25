import { useState } from "react";
import BouncingBall from "./BouncingBall";
import { postArtwork } from "../utils/expressUtils";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import EditorControl from "./EditorControl";
import { valueToColor } from "@/utils/colorUtils";
import "../styles/rainbox-color-input.css";

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
  function handleSetXVelocity(value: number): void {
    setXVelocity(value);
  }

  // Set Y Velocity
  function handleSetYVelocity(value: number): void {
    setYVelocity(value);
  }

  // Change ball size
  function handleSetBallSize(value: number): void {
    setBallSize(value);
  }

  // Change ball count
  function handleSetBallCount(value: number) {
    setBallCount(value);
  }

  // Change randomness factor
  function handleSetRandomnessFactor(value: number) {
    setRandomnessFactor(value);
  }

  // Change border radius
  function handleSetBorderRadius(value: number): void {
    setBorderRadius(value);
  }

  // Change border width
  function handleSetBorderWidth(value: number): void {
    setBorderWidth(value);
  }

  // Colors
  // Change ball color
  function handleSetBallColor(value: number): void {
    setBallColor(valueToColor(value));
  }

  // Change background color
  function handleSetBackgroundColor(value: number): void {
    setBackgroundColor(valueToColor(value));
  }

  // Change border color
  function handleSetBorderColor(value: number): void {
    setBorderColor(valueToColor(value));
  }

  // Add random colors
  function handleSetRandomColors(value: number): void {
    if (value === 0) {
      setRandomColors(false);
    }
    if (value === 1) {
      setRandomColors(true);
    }
  }

  const controls = [
    // Numerical
    {
      title: "X Velocity",
      handler: handleSetXVelocity,
      min: 0,
      max: 20,
      defaultValue: 1,
    },
    {
      title: "Y Velocity",
      handler: handleSetYVelocity,
      min: 0,
      max: 20,
      defaultValue: 1,
    },
    {
      title: "Ball Size",
      handler: handleSetBallSize,
      min: 1,
      max: 100,
      defaultValue: 20,
    },
    {
      title: "Ball Count",
      handler: handleSetBallCount,
      min: 1,
      max: 60,
      defaultValue: 1,
    },
    {
      title: "Randomness",
      handler: handleSetRandomnessFactor,
      min: 1,
      max: 50,
      defaultValue: 1,
    },
    {
      title: "Border Radius",
      handler: handleSetBorderRadius,
      min: 0,
      max: 50,
      defaultValue: 50,
    },
    {
      title: "Border Width",
      handler: handleSetBorderWidth,
      min: 0,
      max: 50,
      defaultValue: 0,
    },
    // Color
    {
      title: "Ball Color",
      handler: handleSetBallColor,
      min: 0,
      max: 360,
      defaultValue: 0,
      colorEditor: true,
    },
    {
      title: "Bg Color",
      handler: handleSetBackgroundColor,
      min: 0,
      max: 360,
      defaultValue: 360,
      colorEditor: true,
    },
    {
      title: "Border Color",
      handler: handleSetBorderColor,
      min: 0,
      max: 360,
      defaultValue: 0,
      colorEditor: true,
    },
    {
      title: "Random Colors",
      handler: handleSetRandomColors,
      min: 0,
      max: 1,
      defaultValue: 0,
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center p-6 items-center">
      <div className="pb-6">
        {controls.map((control, key) => (
          <EditorControl
            key={key}
            title={control.title}
            handler={control.handler}
            min={control.min}
            max={control.max}
            defaultValue={control.defaultValue}
            colorEditor={control.colorEditor}
          />
        ))}
      </div>

      {/* Bouncing Ball viewer */}
      <div className="mb-6 border-[1px] border-black">
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
          className="w-40 h-12 bg-black text-white rounded-lg transition-transform transform hover:scale-105"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Editor;
