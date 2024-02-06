import gsap from "gsap";

export class Collapse extends HTMLElement {
  button: HTMLButtonElement;
  collapsableSection: HTMLElement;
  isOpen = false;
  animatedLine: SVGPathElement;
  wrapperHeight = 2000;

  constructor() {
    super();
    this.button = document.createElement("button");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    this.animatedLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    const line2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    this.animatedLine.setAttribute("d", "M11.5 4.5v15");
    line2.setAttribute("d", "M4 12h15");
    svg.append(this.animatedLine, line2);
    this.button.append(svg);

    this.collapsableSection = document.createElement("div");
  }

  connectedCallback() {
    this.collapsableSection.style.setProperty("overflow", "hidden");
    this.collapsableSection.append(...this.children);

    this.button.setAttribute("aria-expanded", "false");
    const label = this.getAttribute("data-label");
    if (label) this.button.setAttribute("label", label);

    this.append(this.button);
    this.append(this.collapsableSection);
    this.wrapperHeight = this.collapsableSection.getBoundingClientRect().height;
    this.collapsableSection.style.setProperty("height", "0");
    this.button.addEventListener("click", this.hadndleClick);
    window.addEventListener("resize", this.handleResize);
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this.hadndleClick);
    window.removeEventListener("resize", this.handleResize);
  }

  hadndleClick = () => {
    if (this.isOpen) this.close();
    else this.open();
  };

  handleResize = () => {
    if (!this.isOpen) this.collapsableSection.style.removeProperty("height");
    this.wrapperHeight = this.collapsableSection.getBoundingClientRect().height;
    if (!this.isOpen) this.collapsableSection.style.setProperty("height", "0");
  };

  open() {
    this.isOpen = true;
    gsap.to(this.animatedLine, {
      rotate: 90,
      transformOrigin: "center",
      duration: 0.3,
    });
    gsap.to(this.collapsableSection, {
      height: this.wrapperHeight,
      duration: this.wrapperHeight * 0.001,
      ease: "power1.in",
    });
    this.button.setAttribute("aria-expanded", "true");
    this.collapsableSection.setAttribute("aria-hidden", "false");
  }

  close() {
    this.isOpen = false;
    gsap.to(this.animatedLine, {
      rotate: 0,
      transformOrigin: "center",
      duration: 0.3,
    });
    gsap.to(this.collapsableSection, {
      height: 0,
      duration: this.wrapperHeight * 0.001,
      ease: "power1.out",
    });
    this.button.setAttribute("aria-expanded", "false");
    this.collapsableSection.setAttribute("aria-hidden", "true");
  }
}
