import {
  HEXtoRGB,
  RGBToHEX,
  RGBToHSB,
  RGBToHSL,
  HSBToRGB,
  HSLToRGB,
} from "./Converters";

export const HEXtoHSB = (hex: string) => {
  let { R, G, B } = HEXtoRGB(hex);
  const hsb = RGBToHSB(R, G, B);
  const floorHSB = {
    fH: hsb.H.toFixed(),
    fS: hsb.S.toFixed(),
    fB: hsb.B.toFixed(),
  };
};
const brightnes = ({
  H,
  S,
  B,
}: {
  H: number;
  S: number;
  B: number;
}): string => {
  if (B <= 30) {
    return "Dark";
  } else if (70 <= B) {
    return "Light";
  }
};
