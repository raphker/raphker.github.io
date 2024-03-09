import { ITransitionPage } from "@barba/core";
import gsap from "gsap";
import { Intro } from "../sinWave/Intro.js";

export const introTransition: ITransitionPage = {
  name: "Intro",
  from: {
    namespace: ["intro"],
  },
  async leave() {
    return document.querySelector<Intro>("c-intro")?.play();
  },
  enter() {
    gsap
      .timeline()
      .from(
        "main",
        {
          opacity: 0,
          duration: 0.5,
          ease: "power1.in",
        },
        0
      )
      .from(
        "main",
        {
          translateY: 16,
          duration: 0.7,
        },
        0
      );
  },
};
