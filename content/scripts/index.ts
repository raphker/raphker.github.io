import { Hamburger } from "./hamburger.js";
import { initPagesTransition } from "./pagesTransition.js";
import { SinWave } from "./sinWave.js";

customElements.define("c-hamburger", Hamburger);
customElements.define("c-sinwave", SinWave);

initPagesTransition();
