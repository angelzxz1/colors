const RGBToHSL = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return {
    H: 60 * h < 0 ? 60 * h + 360 : 60 * h,
    S: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    L: (100 * (2 * l - s)) / 2,
  };
};

const HSLToRGB = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const { R, G, B } = {
    R: 255 * f(0),
    G: 255 * f(8),
    B: 255 * f(4),
  };
  return {
    R,
    G,
    B,
    string: `rgb(${R},${G},${B})`,
  };
};

const RGBToHSB = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n === 0
      ? 0
      : n && v === r
      ? (g - b) / n
      : v === g
      ? 2 + (b - r) / n
      : 4 + (r - g) / n;
  const { H, S, B } = {
    H: 60 * (h < 0 ? h + 6 : h),
    S: v && (n / v) * 100,
    B: v * 100,
  };
  return {
    H,
    S,
    B,
  };
};

const HSBToRGB = (h: number, s: number, b: number) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  const { R, G, B } = {
    R: 255 * f(5),
    G: 255 * f(3),
    B: 255 * f(1),
  };
  return {
    R,
    G,
    B,
    string: `rgb(${R},${G},${B})`,
  };
};

const HEXtoRGB = (hex: string) => {
  const trimmed = hex.replace("#", "");
  const [Rh, Gh, Bh] = [
    trimmed.slice(0, 2),
    trimmed.slice(2, 4),
    trimmed.slice(4),
  ];
  const [R, G, B] = [parseInt(Rh, 16), parseInt(Gh, 16), parseInt(Bh, 16)];
  return { R, G, B, string: `rgb(${R},${G},${B})` };
};

const RGBToHEX = (r: number, g: number, b: number) => {
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};

export { HEXtoRGB, RGBToHEX, RGBToHSB, RGBToHSL, HSBToRGB, HSLToRGB };
