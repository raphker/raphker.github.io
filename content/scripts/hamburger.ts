import gsap from "gsap";
import { trapFocus } from "./lib/trapFocus.js";

export class Hamburger extends HTMLElement {
  button?: HTMLElement;
  list?: HTMLElement;
  path?: SVGPathElement;
  expanded = false;

  stopTrappingFocus?: () => void;
  constructor() {
    super();
  }

  connectedCallback() {
    const btn = this.querySelector("button");
    const nav = this.querySelector("ul");
    const path = this.querySelector<SVGPathElement>("path");
    if (!btn || !nav || !path)
      throw Error("Hamburger musts contain a <button> and a <nav>");
    this.button = btn;
    this.list = nav;
    this.path = path;

    this.button.setAttribute("aria-expanded", this.expanded.toString());
    this.button.addEventListener("click", this.toggle);
  }
  disconnectedCallback() {
    this.button?.removeEventListener("click", this.toggle);
    if (this.stopTrappingFocus) this.stopTrappingFocus();
  }

  toggle = () => {
    if (!this.expanded) this.open();
    else this.close();
  };

  async open() {
    this.expanded = true;
    document.body.style.setProperty("overflow", "hidden");
    this.stopTrappingFocus = trapFocus(this);
    gsap.to(this.path!, {
      attr: {
        d: "M6 18 L 18 6 M6 6l12 12",
      },
      duration: 0.3,
    });

    this.button?.setAttribute("aria-expanded", this.expanded.toString());
    this.list?.style.setProperty("display", "flex");
  }

  close() {
    this.expanded = false;
    document.body.style.setProperty("overflow", "auto");
    gsap.to(this.path!, {
      attr: {
        d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5",
      },
      duration: 0.3,
    });
    if (this.stopTrappingFocus) this.stopTrappingFocus();
    this.button?.setAttribute("aria-expanded", this.expanded.toString());
    this.list?.style.setProperty("display", "none");
  }
}
