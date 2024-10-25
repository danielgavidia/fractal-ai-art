import React, { useEffect, useState } from "react";
import "../styles/rainbox-color-input.css";
import { hslToRgb, rgbToHex } from "@/utils/colorUtils";

interface RainbowColorInputProps {
  defaultHue: number;
  onColorChange: (rgb: string, hex: string) => void;
}

const RainbowColorInput = ({ onColorChange, defaultHue }: RainbowColorInputProps) => {
  const [hue, setHue] = useState(defaultHue);

  // Pass rgb and hex values back to the parent
  useEffect(() => {
    const { r, g, b } = hslToRgb(hue, 100, 50);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const hex = rgbToHex(r, g, b);
    onColorChange(rgb, hex);
  }, [hue]);

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(parseInt(e.target.value));
  };

  const { r, g, b } = hslToRgb(hue, 100, 50);
  const rgb = `rgb(${r}, ${g}, ${b})`;

  return (
    <input
      type="range"
      min="0"
      max="360"
      value={hue}
      onChange={handleHueChange}
      className="appearance-none"
      style={{
        background: rgb,
      }}
    />
  );
};

export default RainbowColorInput;
