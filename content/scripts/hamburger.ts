import gsap from "gsap";
import { trapFocus } from "./lib/trapFocus.js";

export class Hamburger extends HTMLElement {
  button?: HTMLElement;
  list?: HTMLElement;
  lines?: SVGLineElement[];
  expanded = false;
  openingTl = gsap.timeline({ paused: true });
  stopTrapfocus?: () => void;

  constructor() {
    super();
  }

  connectedCallback() {
    const btn = this.querySelector("button");
    const nav = this.querySelector("ul");
    const lines = Array.from(this.querySelectorAll<SVGLineElement>("line"));
    if (!btn || !nav || !lines)
      throw Error("Hamburger musts contain a <button> and a <nav>");
    this.button = btn;
    this.list = nav;
    this.lines = lines;

    this.openingTl
      .to(this.lines[0]!, {
        y: 6,
        duration: 0.15,
      })
      .to(
        this.lines[2]!,
        {
          y: -6,
          duration: 0.15,
        },
        0
      )
      .to(this.lines, {
        rotate: 90,
        transformOrigin: "center center",
        duration: 0.15,
      })
      .set(this.lines[1]!, {
        opacity: 0,
      })
      .to(this.lines[0]!, {
        rotate: 45,
        transformOrigin: "center center",
        duration: 0.25,
      })
      .to(
        this.lines[2]!,
        {
          rotate: 135,
          transformOrigin: "center center",
          duration: 0.25,
        },
        "<"
      )
      .fromTo(
        this.list!,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.2,
        },
        0
      )
      .from(
        this.list.querySelectorAll("a")!,
        {
          y: "100%",
          duration: 0.2,
          stagger: 0.1,
        },
        0
      );

    this.button.setAttribute("aria-expanded", this.expanded.toString());
    this.button.addEventListener("click", this.toggle);
  }
  disconnectedCallback() {
    this.button?.removeEventListener("click", this.toggle);
    this.openingTl.kill();
    if (this.stopTrapfocus) this.stopTrapfocus();
  }

  toggle = () => {
    if (!this.expanded) this.open();
    else this.close();
  };

  async open() {
    this.expanded = true;
    this.stopTrapfocus = trapFocus(this);
    this.openingTl.restart();
    document.body.style.setProperty("overflow", "hidden");
    this.button?.setAttribute("aria-expanded", this.expanded.toString());
    this.list?.style.setProperty("display", "flex");
  }

  close() {
    this.expanded = false;
    if (this.stopTrapfocus) this.stopTrapfocus();
    this.button?.setAttribute("aria-expanded", this.expanded.toString());
    document.body.style.setProperty("overflow", "auto");
    this.openingTl.reverse().then(() => {
      this.list?.style.setProperty("display", "none");
    });
  }
}
