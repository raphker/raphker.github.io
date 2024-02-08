import { gsap } from "gsap";

import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export class reelWrapper extends HTMLElement {
  previousBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  wrapper?: HTMLElement | null;
  items?: HTMLElement[];
  observer?: IntersectionObserver;
  visibleItems: Element[] = [];

  constructor() {
    super();
    this.previousBtn = document.createElement("button");
    this.previousBtn.classList.add("previousBtn");
    this.previousBtn.setAttribute(
      "aria-label",
      this.getAttribute("data-prev-label") ?? "previous"
    );
    this.previousBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
    `;
    this.nextBtn = document.createElement("button");
    this.nextBtn.classList.add("nextBtn");
    this.nextBtn.setAttribute(
      "aria-label",
      this.getAttribute("data-next-label") ?? "next"
    );
    this.nextBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="1em" height="1em">
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>

    `;
  }

  connectedCallback() {
    this.wrapper = this.querySelector("[data-wrapper]");
    this.items = Array.from(this.querySelectorAll("[data-wrapper] > *"));
    this.appendChild(this.previousBtn);
    this.appendChild(this.nextBtn);

    this.observer = new IntersectionObserver(this.observerCallback, {
      root: this.wrapper,
      threshold: 0.9,
    });

    this.items.forEach((el) => this.observer?.observe(el));
    this.previousBtn.addEventListener("click", this.handlePreviousClick);
    this.nextBtn.addEventListener("click", this.handleNextClick);
  }

  disconnectedCallback() {
    this.items?.forEach((el) => this.observer?.unobserve(el));
    this.previousBtn.removeEventListener("click", this.handlePreviousClick);
    this.nextBtn.removeEventListener("click", this.handleNextClick);
  }

  observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        this.visibleItems.push(target);
      } else {
        this.visibleItems = this.visibleItems.filter((el) => el !== target);
      }
      this.updateButtons();
    });
  };

  updateButtons() {
    const firstItem = this.items?.[0];
    const lastItem = this.items?.[this.items?.length - 1];
    const firstIsInview = firstItem
      ? this.visibleItems.includes(firstItem)
      : false;
    const lastIsInview = lastItem
      ? this.visibleItems.includes(lastItem)
      : false;

    if (firstIsInview) this.previousBtn.style.setProperty("display", "none");
    else this.previousBtn.style.removeProperty("display");

    if (lastIsInview) this.nextBtn.style.setProperty("display", "none");
    else this.nextBtn.style.removeProperty("display");
  }

  handlePreviousClick = () => {
    const previousItem = this.items?.find((current, i) => {
      const next = this.items?.[i + 1];
      if (!next) return false;
      if (this.visibleItems.includes(current)) return false;
      if (!this.visibleItems.includes(next)) return false;
      return true;
    });
    this.scroolToItem(previousItem);
  };

  handleNextClick = () => {
    const nextItem = this.items?.find((current, i) => {
      const previous = this.items?.[i - 1];
      if (!previous) return false;
      if (this.visibleItems.includes(current)) return false;
      if (!this.visibleItems.includes(previous)) return false;
      return true;
    });
    this.scroolToItem(nextItem);
  };

  scroolToItem(item?: HTMLElement) {
    if (!item || !this.wrapper) return;
    const targetPosition =
      item.offsetLeft - (this.wrapper?.clientWidth - item.clientWidth) * 0.5;
    gsap.to(this.wrapper, {
      duration: 0.6,
      scrollTo: { x: targetPosition, autoKill: true },
    });
  }
}
