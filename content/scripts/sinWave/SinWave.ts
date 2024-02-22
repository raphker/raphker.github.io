import { drawSvg } from "./drawSvg.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { debounce } from "../lib/debounce.js";
import { getSvgParams } from "./getSvgParams.js";
gsap.registerPlugin(ScrollTrigger);

export class SinWave extends HTMLElement {
  svg?: SVGElement;
  svgGroup?: SVGGElement;
  button?: HTMLButtonElement;
  heightProxy = {
    value: 0,
  };
  isOpen = false;
  scrollTrigger?: ScrollTrigger;
  handleResize?: () => void;
  openAngle?: number;
  interElement?: SVGPathElement;

  constructor() {
    super();
  }

  connectedCallback() {
    this.initSvg();
    this.handleResize = debounce(this.initSvg, 200);
    window.addEventListener("resize", this.handleResize);
  }

  initSvg = () => {
    const svgParams = getSvgParams("var(--surface)");
    const { svg, svgGroup, updateWave, interElement, openAngle } =
      drawSvg(svgParams);

    const button = this.createButton(
      (svgParams.interWidth / svgParams.width) * 100
    );

    this.button?.removeEventListener("click", this.handleClick);
    this.svg?.remove();
    this.button?.remove();
    this.scrollTrigger?.kill();
    this.heightProxy.value = 0;

    this.scrollTrigger = ScrollTrigger.create({
      onUpdate: (self) => {
        if (this.isOpen) return;
        const height = self.getVelocity() / 2000;
        if (Math.abs(height) < Math.abs(this.heightProxy.value)) return;
        this.heightProxy.value = height;
        gsap.to(this.heightProxy, {
          value: 0,
          duration: 0.8,
          ease: "power4.in",
          overwrite: true,
          onUpdate: () => updateWave(this.heightProxy.value),
        });
      },
    });

    this.svg = svg;
    this.svgGroup = svgGroup;
    this.button = button;
    this.openAngle = openAngle;
    this.interElement = interElement;
    this.append(this.svg, button);
    this.isOpen = false;

    this.setButtonLabel();
    this.button?.addEventListener("click", this.handleClick);
  };

  createButton(width: number) {
    const button = document.createElement("button");
    button.style.setProperty("position", "absolute");
    button.style.setProperty("top", "25%");
    button.style.setProperty("left", `3%`);
    button.style.setProperty("width", `${width}%`);
    button.style.setProperty("height", "50%");
    button.style.setProperty("background", "transparent");
    button.style.setProperty("border", "none");
    return button;
  }

  handleClick = () => {
    this.isOpen = !this.isOpen;
    if (this.openAngle && this.interElement) {
      gsap.to(this.interElement, {
        rotate: this.isOpen ? this.openAngle : 0,
        duration: 0.3,
      });
    }
    this.setButtonLabel();
  };

  scrollToContent() {
    gsap.to(window, {
      scrollTo: {
        y: "#content",
        autoKill: false,
      },
      duration: 4,
      ease: "power5.out",
    });
  }

  setButtonLabel = () => {
    if (this.isOpen) {
      const openLabel = this.getAttribute("data-label-open");
      if (openLabel) this.button?.setAttribute("aria-label", openLabel);
    } else {
      const closeLabel = this.getAttribute("data-label-close");
      if (closeLabel) this.button?.setAttribute("aria-label", closeLabel);
    }
  };

  disconnectedCallback() {
    this.scrollTrigger?.kill();
    if (this.handleResize)
      window.removeEventListener("resize", this.handleResize);
    this.button?.removeEventListener("click", this.handleClick);
  }
}
