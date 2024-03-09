import { ITransitionPage } from "@barba/core";
import gsap from "gsap";
import { defaultTransition } from "./default.js";
import { Hamburger } from "../hamburger.js";

export const hamburgerTranstion: ITransitionPage = {
  name: "hamburger-transition",
  from: {
    custom: ({ trigger }) => {
      const hamburger = document.querySelector("c-hamburger");
      return hamburger?.contains(trigger as HTMLElement) ?? false;
    },
  },
  async leave() {
    return gsap.to(".transitionScreen", {
      opacity: 1,
      duration: 0.4,
    });
  },
  enter: defaultTransition.enter,
};
