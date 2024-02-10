import barba from "@barba/core";
import gsap from "gsap";

export const initPagesTransition = () =>
  barba.init({
    transitions: [
      {
        name: "opacity-transition",
        async leave(data) {
          const tl = gsap.timeline();
          return tl
            .to("main", {
              opacity: 0,
              duration: 0.6,
              ease: "power1.in",
            })
            .to(
              "main",
              {
                translateY: 16,
                duration: 0.8,
              },
              "<"
            )
            .to(
              "c-hamburger ul",
              {
                backgroundColor: "#f8f9fa",
                duration: 0.8,
              },
              "<"
            );
        },
        enter(data) {
          const tl = gsap.timeline();
          tl.from("main", {
            opacity: 0,
            duration: 0.5,
            ease: "power1.in",
          }).from(
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
