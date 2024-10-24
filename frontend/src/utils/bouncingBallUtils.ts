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
    x: velocity.x + (Math.random() * 2 - 1) * factor,
    y: velocity.y + (Math.random() * 2 - 1) * factor,
  };
}
