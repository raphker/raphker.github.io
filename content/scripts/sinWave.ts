import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export class SinWave extends HTMLElement {
  CENTERY = 5;
  TOTALWIDTH = 300;
  WAVELEFT = 80;
  WAVESWIDTH = Math.random() * 50;
  interPathes?: SVGPathElement[] | null;
  waveStroke?: SVGPathElement | null;
  waveShape?: SVGPathElement | null;
  updateWave?: () => void;

  heightProxy = {
    height: 0,
  };
  scrollTrigger?: ScrollTrigger;

  constructor() {
    super();
  }

  connectedCallback() {
    this.interPathes = Array.from(this.querySelectorAll(".inter"));
    this.waveStroke = this.querySelector("#waveStroke");
    this.waveShape = this.querySelector("#waveShape");
    this.initScrollTrigger();
    console.log(this.interPathes);

    this.addEventListener("click", () => {
      this.openInter()?.then(() => {
        this.closeInter();
      });
    });
  }

  disconnectedCallback() {
    this.scrollTrigger?.kill();
  }

  openInter() {
    if (!this.interPathes) return;
    return gsap.to(this.interPathes, {
      rotate: -22.5,
      transformOrigin: "LEFT CENTER",
    });
  }

  closeInter() {
    if (!this.interPathes) return;
    return gsap.to(this.interPathes, {
      rotate: 0,
      transformOrigin: "LEFT CENTER",
    });
  }

  initScrollTrigger() {
    if (!this.waveShape || !this.waveStroke) return;
    const shapeSetter = gsap.quickSetter(this.waveShape, "attr");
    const strokeSetter = gsap.quickSetter(this.waveStroke, "attr");
    const clampHeight = gsap.utils.clamp(-this.CENTERY, this.CENTERY);
    this.updateWave = () => {
      const [strokePath, shapePath] = this.getWavePathes(
        clampHeight(this.heightProxy.height),
        this.WAVESWIDTH
      );
      shapeSetter({ d: shapePath });
      strokeSetter({ d: strokePath });
    };

    // this.updateWave();

    this.scrollTrigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const height = clampHeight(-self.getVelocity() / -1000);
        if (Math.abs(height) > Math.abs(this.heightProxy.height)) {
          this.heightProxy.height = height;
          gsap.to(this.heightProxy, {
            height: 0,
            duration: 0.8,
            ease: "power1.out",
            overwrite: true,
            onUpdate: this.updateWave,
          });
        }
      },
    });
  }

  getWavePathes(height: number, width: number) {
    const count = Math.ceil((this.TOTALWIDTH - this.WAVELEFT) / width);
    let strokePath = `M${this.WAVELEFT} ${this.CENTERY}`;
    for (let i = 0; i < count; i++) {
      const dir = i % 2 === 0 ? 1 : -1;
      const y = this.CENTERY + height * dir;
      const x1 = this.WAVELEFT + width * (i + 0.25);
      const x2 = this.WAVELEFT + width * (i + 0.75);

      strokePath += `C${x1} ${y}, ${x2} ${y}, ${
        this.WAVELEFT + width * (i + 1)
      } ${this.CENTERY}`;
    }
    const shapePath = strokePath + `V0 H${this.WAVELEFT - 1} z`;
    return [strokePath, shapePath] as const;
  }
}
