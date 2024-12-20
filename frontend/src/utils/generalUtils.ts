// Helper function to convert HSL to RGB
export function hslToRgb(h: number, s: number, l: number) {
  if (h === 0) return { r: 255, g: 255, b: 255 };

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
}

// Helper function to get RGB and HEX
export function valueToColor(value: number): string {
  const { r, g, b } = hslToRgb(value, 100, 50);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  return rgb;
}

// Get random RGB
export function getRandomRGB(): string {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  return rgb;
}

// Get random velocity
export function getRandomVelocity(
  velocity: { x: number; y: number },
  factor: number
): { x: number; y: number } {
  return {
    x: velocity.x + ((Math.random() * 2 - 1) * factor) / 10,
    y: velocity.y + ((Math.random() * 2 - 1) * factor) / 10,
  };
}
