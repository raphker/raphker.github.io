import { start, modernFontStack } from "@achtaitaipai/niles";
export const debug = () =>
  start({
    minWidth: 320,
    maxWidth: 1240,
    minFontSize: 16,
    maxFontSize: 18,
    minTypeScale: 1.067,
    maxTypeScale: 1.2,
    negativeTypeSteps: 2,
    positiveTypeSteps: 5,
    negativeSpaceSteps: [0.75, 0.5, 0.25],
    positiveSpaceSteps: [1, 1.5, 2, 3, 4, 6],
    typeCssPrefix: "fs",
    spaceCssPrefix: "space",
    colorCssPrefix: "",
    colorsKeys: ["surface", "text"],
    colorsValues: ["#f8f9fa", "#212529"],
    fontCssPrefix: "font",
    fontsKeys: ["base", "display"],
    fontsValues: [
      "'Titillium', " + modernFontStack.systemui,
      modernFontStack.antique,
    ],
    fontsOptions: {
      titillium: "'Titillium', " + modernFontStack.systemui,
      ...modernFontStack,
    },
  });
