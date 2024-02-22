import barba from "@barba/core";
import { defaultTransition } from "./default.js";
import { introTransition } from "./intro.js";

export const initPagesTransition = () =>
  barba.init({
    transitions: [defaultTransition, introTransition],
  });
barba.hooks.afterEnter((data) => {
  window.scrollTo(0, 0);
});
