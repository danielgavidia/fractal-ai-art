import { useState } from "react";
import BouncingBall from "./BouncingBall";
import { postArtwork } from "../utils/expressUtils";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import "../styles/rainbox-color-input.css";
import { Artwork, ControlGroup } from "../types/types";
import EditorControlDashboard from "./EditorControlDashboard";

interface EditorProps {
  customConfig?: Artwork;
}

const Editor = ({ customConfig }: EditorProps) => {
  // Navigate
  const navigate = useNavigate();

  // Context
  const { userInfo } = useFirebaseAuth();

  // State
  const [xVelocity, setXVelocity] = useState<number>(2);
  const [yVelocity, setYVelocity] = useState<number>(2);
  const [ballSize, setBallSize] = useState<number>(30);
  const [ballColor, setBallColor] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<number>(360);
  const [ballCount, setBallCount] = useState<number>(1);
  const [randomnessFactor, setRandomnessFactor] = useState<number>(1);
  const [randomColors, setRandomColors] = useState<boolean>(false);
  const [borderRadius, setBorderRadius] = useState<number>(50);
  const [borderWidth, setBorderWidth] = useState<number>(0);
  const [borderColor, setBorderColor] = useState<number>(360);

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
    setBallColor(value);
  }

  // Change background color
  function handleSetBackgroundColor(value: number): void {
    setBackgroundColor(value);
  }

  // Change border color
  function handleSetBorderColor(value: number): void {
    setBorderColor(value);
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

  // Control groups
  const controlGroups: ControlGroup[] = [
    {
      id: 0,
      title: "General",
      controls: [
        {
          title: "X Velocity",
          handler: handleSetXVelocity,
          min: 0,
          max: 20,
          defaultValue: customConfig ? customConfig.xVelocity : 1,
        },
        {
          title: "Y Velocity",
          handler: handleSetYVelocity,
          min: 0,
          max: 20,
          defaultValue: customConfig ? customConfig.yVelocity : 1,
        },

        {
          title: "Randomness",
          handler: handleSetRandomnessFactor,
          min: 1,
          max: 50,
          defaultValue: customConfig ? customConfig.randomnessFactor : 1,
        },
        {
          title: "Bg Color",
          handler: handleSetBackgroundColor,
          min: 0,
          max: 360,
          defaultValue: customConfig ? customConfig.backgroundColor : 360,
          colorEditor: true,
        },
      ],
      isOpen: false,
    },
    {
      id: 1,
      title: "Ball",
      controls: [
        {
          title: "Ball Size",
          handler: handleSetBallSize,
          min: 1,
          max: 100,
          defaultValue: customConfig ? customConfig.ballSize : 20,
        },
        {
          title: "Ball Count",
          handler: handleSetBallCount,
          min: 1,
          max: 60,
          defaultValue: customConfig ? customConfig.ballCount : 1,
        },
        {
          title: "Random Colors",
          handler: handleSetRandomColors,
          min: 0,
          max: 1,
          defaultValue: customConfig ? (customConfig.randomColors === true ? 1 : 0) : 0,
        },
        {
          title: "Ball Color",
          handler: handleSetBallColor,
          min: 0,
          max: 360,
          defaultValue: customConfig ? customConfig.ballColor : 0,
          colorEditor: true,
        },
      ],
      isOpen: false,
    },
    {
      id: 2,
      title: "Border",
      controls: [
        {
          title: "Border Width",
          handler: handleSetBorderWidth,
          min: 0,
          max: 50,
          defaultValue: customConfig ? customConfig.borderWidth : 0,
        },
        {
          title: "Border Radius",
          handler: handleSetBorderRadius,
          min: 0,
          max: 50,
          defaultValue: customConfig ? customConfig.borderRadius : 50,
        },
        {
          title: "Border Color",
          handler: handleSetBorderColor,
          min: 0,
          max: 360,
          defaultValue: customConfig ? customConfig.borderColor : 360,
          colorEditor: true,
        },
      ],
      isOpen: false,
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center p-6 items-center space-y-4">
      {/* Editor controls */}
      <EditorControlDashboard controlGroups={controlGroups} />

      {/* Bouncing Ball viewer */}
      <div className="border-[1px] border-black">
        <BouncingBall
          xVelocity={xVelocity}
          yVelocity={yVelocity}
          ballSize={ballSize}
          ballColor={ballColor}
          backgroundColor={backgroundColor}
          ballCount={ballCount}
          randomnessFactor={randomnessFactor}
          randomColors={randomColors}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          borderColor={borderColor}
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
              ballColor,
              backgroundColor,
              ballCount,
              randomnessFactor,
              randomColors,
              borderRadius,
              borderWidth,
              borderColor
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
