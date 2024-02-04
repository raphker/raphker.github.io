import { Hamburger } from "./hamburger.js";
import { SinWave } from "./sinWave.js";
import barba from "@barba/core";
import gsap from "gsap";

customElements.define("c-hamburger", Hamburger);
customElements.define("c-sinwave", SinWave);

barba.init({
  transitions: [
    {
      name: "opacity-transition",
      async leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
        });
      },
      enter(data) {
        gsap.from(data.next.container, {
          opacity: 0,
        });
      },
    },
  ],
});
