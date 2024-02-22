import { ITransitionPage } from "@barba/core";
import gsap from "gsap";
import { Hamburger } from "../hamburger.js";

export const defaultTransition: ITransitionPage = {
  name: "opacity-transition",
  async leave() {
    if (document.querySelector<Hamburger>("c-hamburger")?.expanded)
      return gsap
        .timeline()
        .to(
          ".transitionScreen",
          {
            opacity: 1,
            duration: 0.6,
            ease: "power1.in",
          },
          "<"
        )
        .to(
          "main",
          {
            translateY: 16,
            duration: 0.8,
          },
          "<"
        );

    return gsap
      .timeline()
      .to(
        "main",
        {
          opacity: 0,
          duration: 0.6,
          ease: "power1.in",
        },
        "<"
      )
      .to(
        "main",
        {
          translateY: 16,
          duration: 0.8,
        },
        "<"
      );
  },
  enter() {
    gsap
      .timeline()
      .from("main", {
        opacity: 0,
        duration: 0.5,
        ease: "power1.in",
      })
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
