import barba from "@barba/core";
import gsap from "gsap";

export const initPagesTransition = () =>
  barba.init({
    transitions: [
      {
        name: "opacity-transition",
        async leave(data) {
          return gsap.to(data.current.container, {
            opacity: 0,
            duration: 0.6,
            ease: "power1.in",
          });
        },
        enter(data) {
          gsap.from(data.next.container, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.in",
          });
        },
      },
    ],
  });
