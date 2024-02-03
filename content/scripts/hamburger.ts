import gsap from "gsap";

export class Hamburger extends HTMLElement {
  button?: HTMLElement;
  list?: HTMLElement;
  path?: SVGPathElement;
  expanded = false;
  openingTl = gsap.timeline({ paused: true });
  closingTl = gsap.timeline({ paused: true });

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

    this.openingTl
      .to(this.path!, {
        attr: {
          d: "M6 18 L 18 6 M6 6l12 12",
        },
        duration: 0.3,
      })
      .to(
        this.list!,
        {
          opacity: 1,
          duration: 0.3,
        },
        "<"
      )
      .from(this.list!.querySelectorAll("a"), {
        yPercent: 100,
        duration: 0.2,
        stagger: 0.1,
        ease: "ease.in",
      });
    this.list.style.setProperty("opacity", "0");

    this.button.setAttribute("aria-expanded", this.expanded.toString());
    this.button.addEventListener("click", this.toggle);
  }
  disconnectedCallback() {
    this.button?.removeEventListener("click", this.toggle);
    this.openingTl.kill();
    this.closingTl.kill();
  }

  toggle = () => {
    if (!this.expanded) this.open();
    else this.close();
  };

  async open() {
    this.expanded = true;
    this.openingTl.restart();
    document.body.style.setProperty("overflow", "hidden");
    this.button?.setAttribute("aria-expanded", this.expanded.toString());
    this.list?.style.setProperty("display", "flex");
  }

  close() {
    this.expanded = false;
    this.button?.setAttribute("aria-expanded", this.expanded.toString());
    document.body.style.setProperty("overflow", "auto");
    gsap.to(this.path!, {
      attr: {
        d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5",
      },
      duration: 0.3,
    });
    gsap
      .to(this.list!, {
        opacity: 0,
        duration: 0.6,
      })
      .then(() => {
        this.list?.style.setProperty("display", "none");
      });
  }
}
