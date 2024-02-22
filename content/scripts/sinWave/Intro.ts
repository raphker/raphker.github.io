import gsap from "gsap";
import { drawSvg } from "./drawSvg.js";
import { getSvgParams } from "./getSvgParams.js";
import { debounce } from "../lib/debounce.js";

export class Intro extends HTMLElement {
  interElement?: SVGPathElement;
  svg?: SVGElement;
  svgGroup?: SVGGElement;
  timeline?: gsap.core.Timeline;
  handleResize?: () => void;

  constructor() {
    super();
  }
  connectedCallback() {
    this.handleResize = debounce(this.init, 200);
    this.init();
    window.addEventListener("resize", this.handleResize);
  }

  init = () => {
    this.svg?.remove();
    const svgParams = getSvgParams("transparent");
    const { svg, svgGroup, openAngle, interElement } = drawSvg(svgParams);
    this.svg = svg;
    this.svgGroup = svgGroup;
    this.interElement = interElement;

    this.append(this.svg);

    if (this.interElement && this.svgGroup) {
      this.timeline = gsap
        .timeline({ paused: true })

        .from(this.interElement, {
          rotate: openAngle,
          duration: 1.5,
          ease: "power1.out",
        })
        // .fromTo(
        //   "body",
        //   {
        //     backgroundColor: "var(--text)",
        //     color: "var(--surface)",
        //     duration: 0.1,
        //   },
        //   {
        //     color: "var(--text)",
        //     backgroundColor: "var(--surface)",
        //     duration: 0.1,
        //   },
        //   "-=0.5"
        // )
        .from(
          svgGroup,
          {
            translateX:
              svgParams.width * 0.5 -
              svgParams.interLeft -
              svgParams.interWidth * 0.5,
            onStart: () => {
              document.querySelector(".introWrapper")?.classList?.toggle("on");
            },
          },
          "-=0.4"
        )
        .from(
          this.parentElement,
          {
            top:
              window.innerHeight * 0.5 -
              (this.parentElement?.clientHeight ?? 0) * 0.5,
          },
          "<"
        );
    }
  };
  play() {
    return this.timeline?.play();
  }
  disconnectedCallback() {
    this.timeline?.kill();
    if (this.handleResize)
      window.removeEventListener("resize", this.handleResize);
  }
}
