import barba from "@barba/core";
import { defaultTransition } from "./default.js";
import { introTransition } from "./introTransition.js";
import { hamburgerTranstion } from "./hamburgerTransition.js";

export const initPagesTransition = () =>
  barba.init({
    transitions: [defaultTransition, introTransition, hamburgerTranstion],
  });
barba.hooks.afterEnter((data) => {
  window.scrollTo(0, 0);
});
