import gsap from "gsap";
import { trapFocus } from "./lib/trapFocus.js";

export class Hamburger extends HTMLElement {
  button?: HTMLElement;
  list?: HTMLElement;
  openLabel?: HTMLElement;
  closeLabel?: HTMLElement;
  expanded = false;
  openingTl = gsap.timeline({ paused: true });
  stopTrapfocus?: () => void;

  constructor() {
    super();
  }

  connectedCallback() {
    const btn = this.querySelector("button");
    const nav = this.querySelector("ul");
    const openLabel = this.querySelector<HTMLElement>(".open");
    const closeLabel = this.querySelector<HTMLElement>(".close");
    const lines = Array.from(this.querySelectorAll<SVGLineElement>("line"));
    if (!btn || !nav || !lines || !openLabel || !closeLabel)
      throw Error("Hamburger musts contain a <button> and a <nav>");
    this.button = btn;
    this.list = nav;
    this.openLabel = openLabel;
    this.closeLabel = closeLabel;

    document.body.setAttribute("data-menu-open", "false");

    this.openingTl
      .fromTo(
        this.button,
        {
          css: {
            color: "var(--text)",
          },
        },
        {
          css: {
            color: "var(--surface)",
          },
          duration: 0.5,
        }
      )
      .fromTo(
        this.openLabel.querySelectorAll(".letter"),
        { y: 0 },
        {
          y: "-120%",
          duration: 0.5,
          stagger: 0.05,
          ease: "power1.inOut",
        },
        0
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
        this.list.querySelectorAll("a .letter")!,
        {
          y: "1.2em",
          duration: 0.2,
          stagger: 0.015,
          ease: "sine",
        },
        0.2
      )
      .fromTo(
        this.closeLabel.querySelectorAll(".letter"),
        { y: "120%" },
        {
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power1.inOut",
        },
        "<"
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
    document.body.setAttribute("data-menu-open", "true");
    this.button?.setAttribute("aria-expanded", this.expanded.toString());
    this.list?.style.setProperty("display", "flex");
    this.openLabel?.setAttribute("aria-hidden", "false");
    this.closeLabel?.setAttribute("aria-hidden", "true");
  }

  close() {
    this.expanded = false;
    if (this.stopTrapfocus) this.stopTrapfocus();
    this.button?.setAttribute("aria-expanded", this.expanded.toString());
    document.body.setAttribute("data-menu-open", "false");
    this.openLabel?.setAttribute("aria-hidden", "true");
    this.closeLabel?.setAttribute("aria-hidden", "false");
    this.openingTl.reverse().then(() => {
      this.list?.style.setProperty("display", "none");
    });
  }
}
