import { Collapse } from "./collapse.js";
import { Hamburger } from "./hamburger.js";
import { initPagesTransition } from "./pagesTransition/index.js";
import { reelWrapper } from "./reel.js";
import { Intro } from "./sinWave/Intro.js";
import { SinWave } from "./sinWave/SinWave.js";

customElements.define("c-hamburger", Hamburger);
customElements.define("c-sinwave", SinWave);
customElements.define("c-intro", Intro);
customElements.define("c-collapse", Collapse);
customElements.define("c-reel-wrapper", reelWrapper);

initPagesTransition();
