import { Collapse } from "./collapse.js";
import { Hamburger } from "./hamburger.js";
import { initPagesTransition } from "./pagesTransition.js";
import { SinWave } from "./sinWave.js";

customElements.define("c-hamburger", Hamburger);
customElements.define("c-sinwave", SinWave);
customElements.define("c-collapse", Collapse);

initPagesTransition();
