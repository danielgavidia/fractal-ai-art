import React, { useEffect, useState } from "react";
import "../styles/rainbox-color-input.css";

// Helper function to convert HSL to RGB
const hslToRgb = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
};

// Helper function to convert RGB to HEX
const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Component

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
