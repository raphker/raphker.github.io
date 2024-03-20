import type { Params } from "./drawSvg.js";

export const getSvgParams = (background: string): Params => {
  const width = window.innerWidth / 5;
  const height = Math.max(5, width / 30);
  const interLeft = width * 0.03;
  const interWidth = Math.max(5, width / 30);
  return {
    width,
    height,
    interLeft,
    interWidth,
    circleRadius: Math.max(0.3, width / 600),
    sinWaveLeft: interLeft + interWidth + interLeft,
    strokeWidth: 0.25,
    numberOfWaves: 15,
    background,
  };
};
