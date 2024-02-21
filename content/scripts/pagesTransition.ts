import barba from "@barba/core";
import gsap from "gsap";
import { Hamburger } from "./hamburger.js";

export const initPagesTransition = () =>
  barba.init({
    transitions: [
      {
        name: "opacity-transition",
        async leave(data) {
          return gsap
            .timeline()
            .to(".transitionScreen", {
              opacity: 1,
              duration: 0.6,
              ease: "power1.in",
            })
            .to(
              "main, c-hamburger ul li",
              {
                translateY: 16,
                duration: 0.8,
              },
              "<"
            );
        },
        enter(data) {
          const tl = gsap
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
      },
    ],
  });
barba.hooks.afterEnter((data) => {
  window.scrollTo(0, 0);
});
