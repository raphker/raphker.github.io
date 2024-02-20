import { drawSvg } from "./drawSvg.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { debounce } from "../lib/debounce.js";
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
  interElements?: SVGPathElement[];
  distanceBetweenInterAndCEnter = 0;
  introTimeline?: gsap.core.Timeline;
  introState: "disabled" | "completed" | "playing" | "waiting" = "disabled";

  constructor() {
    super();
  }

  connectedCallback() {
    this.initSvg();
    this.handleResize = debounce(() => {
      this.initSvg();
      this.introTimeline?.kill();
      this.initIntro();
    }, 200);
    // window.addEventListener("resize", this.handleResize);
    this.initIntro();
  }

  initIntro() {
    if (!this.hasAttribute("data-intro")) return;
    if (location.hash !== "") return;
    if (!this.interElements || !this.svg || !this.svgGroup || !this.openAngle)
      return;
    this.setAttribute("data-intro", "true");
    this.introState = "waiting";
    this.introTimeline = gsap
      .timeline({
        scrollTrigger: {
          onEnter: () => {
            this.scrollToContent();
            this.introState = "playing";
          },
          onEnterBack: () => {
            this.introState = "playing";
          },
          onLeave: () => {
            this.introState = "completed";
          },
          onLeaveBack: () => {
            this.introState = "waiting";
          },
          trigger: this,
          start: "start center",
          end: "start center",
          endTrigger: "#content",
          scrub: true,
          markers: true,
        },
      })
      .from(this.interElements, {
        rotate: this.openAngle,
        duration: 3,
      })
      .from(this.svgGroup, {
        x: `${this.distanceBetweenInterAndCEnter}px`,
        duration: 0.5,
      })
      .from(
        [this.button],
        {
          x:
            window.innerWidth * 0.5 -
            this.button!.offsetLeft -
            this.button!.clientWidth * 0.5,
          duration: 0.5,
        },
        "<"
      );
  }

  initSvg = () => {
    const width = window.innerWidth / 5;
    const height = Math.max(5, width / 30);
    const interLeft = width * 0.03;
    const interWidth = Math.max(5, width / 30);
    this.distanceBetweenInterAndCEnter =
      width * 0.5 - (interLeft + interWidth * 0.5);
    const { svg, svgGroup, updateWave, interElements, openAngle, button } =
      drawSvg({
        width,
        height,
        interLeft,
        interWidth,
        circleRadius: Math.max(0.3, width / 600),
        sinWaveLeft: width / 5,
        strokeWidth: 0.25,
        numberOfWaves: 15,
        background: "var(--surface)",
        foreground: "var(--text)",
      });

    this.button?.removeEventListener("click", this.handleClick);
    this.svg?.remove();
    this.button?.remove();
    this.scrollTrigger?.kill();
    this.heightProxy.value = 0;

    this.scrollTrigger = ScrollTrigger.create({
      onUpdate: (self) => {
        if (this.isOpen) return;
        if (this.introState === "playing" || this.introState === "waiting")
          return;
        const height = self.getVelocity() / 2000;
        if (Math.abs(height) < Math.abs(this.heightProxy.value)) return;
        this.heightProxy.value = height;
        gsap.to(this.heightProxy, {
          value: 0,
          duration: 0.8,
          ease: "power1.out",
          overwrite: true,
          onUpdate: () => updateWave(this.heightProxy.value),
        });
      },
    });

    this.svg = svg;
    this.svgGroup = svgGroup;
    this.button = button;
    this.openAngle = openAngle;
    this.interElements = interElements;
    this.append(this.svg, button);
    this.isOpen = false;

    this.setButtonLabel();
    this.button?.addEventListener("click", this.handleClick);
  };

  handleClick = () => {
    if (this.introState === "waiting") {
      this.scrollToContent();
    } else if (
      this.introState === "disabled" ||
      this.introState === "completed"
    ) {
      this.isOpen = !this.isOpen;
      if (this.openAngle && this.interElements) {
        gsap.to(this.interElements, {
          rotate: this.isOpen ? this.openAngle : 0,
          duration: 0.3,
        });
      }
      this.setButtonLabel();
    }
  };

  scrollToContent() {
    gsap.to(window, {
      scrollTo: {
        y: "#content",
        autoKill: true,
      },
      duration: 3,
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
    this.introTimeline?.kill();
    window.removeEventListener("resize", this.initSvg);
    this.button?.removeEventListener("click", this.handleClick);
  }
}
