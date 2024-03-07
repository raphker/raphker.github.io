import gsap from "gsap";

export type Params = {
  width: number;
  height: number;
  interLeft: number;
  interWidth: number;
  sinWaveLeft: number;
  circleRadius: number;
  strokeWidth: number;
  numberOfWaves: number;
  background: string;
};

export const drawSvg = ({
  width,
  height,
  interLeft,
  interWidth,
  sinWaveLeft,
  circleRadius,
  strokeWidth,
  numberOfWaves,
  background,
}: Params) => {
  const centerY = height / 2;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("stroke-width", strokeWidth.toString());
  svg.style.setProperty("stroke", "currentColor");
  svg.style.setProperty("fill", "none");

  const svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const aroundInter = createAroundInter(
    width,
    interLeft,
    centerY,
    interWidth,
    sinWaveLeft,
    background
  );
  const inter = createInter(interLeft, centerY, interWidth, background);
  const sinWave = createSinWave(
    width,
    sinWaveLeft,
    centerY,
    numberOfWaves,
    background
  );

  svgGroup.append(
    ...aroundInter.elements,
    ...sinWave.elements,
    ...inter.elements,
    createCircle(interLeft, centerY, circleRadius, "currentColor"),
    createCircle(interLeft + interWidth, centerY, circleRadius, "currentColor"),
  );

  svg.append(svgGroup);

  return {
    svg,
    svgGroup,
    updateWave: sinWave.updateHeight,
    interElement: inter.elements[1],
    openAngle: inter.openAngle,
  };
};

const createCircle = (x: number, y: number, radius: number, color: string) => {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", x.toString());
  circle.setAttribute("cy", y.toString());
  circle.setAttribute("r", radius.toString());
  circle.style.setProperty("stroke", "none");
  circle.style.setProperty("fill", color);
  return circle;
};

const createInter = (
  interLeft: number,
  centerY: number,
  interWidth: number,
  background: string
) => {
  const interPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  interPath.setAttribute(
    "d",
    `M${interLeft} ${centerY} L ${interLeft + interWidth} ${centerY}`
  );
  const interShape = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  interShape.setAttribute(
    "d",
    `M${interLeft} ${centerY} L ${
      interLeft + interWidth
    } ${centerY} V0 H${interLeft} z`
  );
  interShape.style.setProperty("stroke", "none");
  interShape.style.setProperty("fill", background);
  const openAngle =
    -(Math.asin((centerY - 0.5) / interWidth) / (Math.PI * 2)) * 360;

  return { openAngle, elements: [interShape, interPath] };
};

const createAroundInter = (
  svgWidth: number,
  interLeft: number,
  centerY: number,
  interWidth: number,
  sinWaveLeft: number,
  background: string
) => {
  const beforeInterPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  beforeInterPath.setAttribute("d", `M-${svgWidth} ${centerY} H ${interLeft}`);
  const beforeInterShape = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  beforeInterShape.setAttribute(
    "d",
    `M-${svgWidth} ${centerY} H ${interLeft + 1} V 0 H -${svgWidth}z`
  );
  beforeInterShape.style.setProperty("stroke", "none");
  beforeInterShape.style.setProperty("fill", background);
  const afterInterPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  afterInterPath.setAttribute(
    "d",
    `M${interLeft + interWidth} ${centerY} H ${sinWaveLeft}`
  );
  const afterInterShape = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  afterInterShape.setAttribute(
    "d",
    `M${interLeft + interWidth - 1} ${centerY} H ${sinWaveLeft} V 0 H ${
      interLeft + interWidth - 1
    }z`
  );
  afterInterShape.style.setProperty("stroke", "none");
  afterInterShape.style.setProperty("fill", background);

  return {
    elements: [
      beforeInterShape,
      afterInterShape,
      beforeInterPath,
      afterInterPath,
    ],
  };
};

const createSinWave = (
  svgWidth: number,
  left: number,
  centerY: number,
  numberOfWaves: number,
  background: string
) => {
  const sinWavePath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  const sinWaveShape = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  sinWaveShape.style.setProperty("stroke", "none");
  sinWaveShape.style.setProperty("fill", background);

  const shapeSetter = gsap.quickSetter(sinWaveShape, "attr");
  const strokeSetter = gsap.quickSetter(sinWavePath, "attr");
  const clampHeight = gsap.utils.clamp(-centerY, centerY);

  const updateHeight = (waveHeight: number) => {
    const [strokePath, shapePath] = getWavePathes(
      svgWidth,
      left,
      centerY,
      clampHeight(waveHeight),
      (svgWidth - left) / numberOfWaves
    );
    shapeSetter({ d: shapePath });
    strokeSetter({ d: strokePath });
  };
  updateHeight(0);
  return { elements: [sinWaveShape, sinWavePath], updateHeight };
};

const getWavePathes = (
  svgWidth: number,
  left: number,
  centerY: number,
  height: number,
  waveWidth: number
) => {
  const count = Math.ceil((svgWidth - left) / waveWidth);
  let strokePath = `M${left} ${centerY}`;
  for (let i = 0; i < count; i++) {
    const dir = i % 2 === 0 ? 1 : -1;
    const y = centerY + height * dir;
    const x1 = left + waveWidth * (i + 0.25);
    const x2 = left + waveWidth * (i + 0.75);
    strokePath += `C${x1} ${y}, ${x2} ${y}, ${
      left + waveWidth * (i + 1)
    } ${centerY}`;
  }
  const shapePath = strokePath + `V0 H${left - 1} z`;
  return [strokePath, shapePath] as const;
};
