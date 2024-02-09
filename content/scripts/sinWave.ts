import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export class SinWave extends HTMLElement {
  CENTERY = 5;
  TOTALWIDTH = 300;
  WAVELEFT = 80;
  WAVESWIDTH = 15;
  isOpen = false;
  interPathDesktop?: SVGPathElement | null;
  interPathMobile?: SVGPathElement | null;
  waveStroke?: SVGPathElement | null;
  waveShape?: SVGPathElement | null;
  updateWave?: () => void;
  withAnimIntro = false;
  introTimeline?: gsap.core.Timeline;

  heightProxy = {
    height: 0,
  };
  waveScrollTrigger?: ScrollTrigger;

  constructor() {
    super();
  }

  connectedCallback() {
    this.interPathDesktop = this.querySelector(".inter.desktopOnly");
    this.interPathMobile = this.querySelector(".inter.mobileOnly");
    this.waveStroke = this.querySelector("#waveStroke");
    this.waveShape = this.querySelector("#waveShape");
    this.initScrollTrigger();

    this.withAnimIntro = this.hasAttribute("data-intro");
    if (this.withAnimIntro && location.hash === "") this.initIntro();
  }

  disconnectedCallback() {
    this.waveScrollTrigger?.kill();
    this.introTimeline?.kill();
  }

  initIntro() {
    document
      .querySelector<HTMLElement>("main#content")
      ?.style?.setProperty("margin-block-start", "1000px");
    this.introTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this,
        scrub: true,
        start: "center center",
        end: `+=1000px`,
        // markers: true,
      },
      onStart: () => {
        this.isOpen = true;
        gsap.to(window, {
          duration: 1.5,
          scrollTo: window.innerHeight * 0.8,
          ease: "power1.in",
        });
      },
      onRepeat: () => {
        this.isOpen = true;
      },
      onComplete: () => {
        this.isOpen = false;
      },
    });

    const mathMedia = gsap.matchMedia();
    mathMedia.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        lg: `(min-width:50rem)`,
        md: `(max-width: 50rem)`,
        sm: "(max-width: 30rem)",
      },
      (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        const conditions = context.conditions;
        let rotate = -22.5;
        if (conditions && conditions["md"]) rotate = -12.25;
        if (conditions && conditions["sm"]) rotate = -12;

        this.introTimeline?.from(
          this.querySelectorAll(".inter"),
          {
            rotate,
            transformOrigin: "LEFT CENTER",
            duration: 1.2,
          },
          0
        );
      }
    );

    this.introTimeline
      .from("header ", {
        y: "-100%",
      })
      .from(
        this.querySelector("g#sinWaveSchema")!,
        {
          css: {
            transform: "translateX(var(--center-x))",
          },
          duration: 3,
        },
        "<"
      );
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

    this.waveScrollTrigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const height = clampHeight(-self.getVelocity() / -1000);
        if (
          Math.abs(height) > Math.abs(this.heightProxy.height) &&
          !this.isOpen
        ) {
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
