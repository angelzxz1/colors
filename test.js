function hexToRgb(hex) {
  // Parse the hex string to get the individual red, green, and blue values
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  // Return the RGB values as an array
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

function rgbToHsv(r, g, b) {
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
    H: Math.floor(60 * (h < 0 ? h + 6 : h)),
    S: Math.floor(v && (n / v) * 100),
    B: Math.floor(v * 100),
  };
  return [H, S, B];
}

function hexToHsv(hex) {
  // Convert the hexadecimal color to RGB
  const [r, g, b] = hexToRgb(hex);

  // Convert the RGB values to HSV
  return rgbToHsv(r, g, b);
}

function hsvToRgb(h, s, v) {
  s /= 100;
  v /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => v * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  const { R, G, B } = {
    R: parseInt((255 * f(5)).toFixed()),
    G: parseInt((255 * f(3)).toFixed()),
    B: parseInt((255 * f(1)).toFixed()),
  };
  return [R, G, B];
}

function generateColorScheme(hexColor) {
  // Convert the color to the hsv color space
  const hsvColor = hexToHsv(hexColor);

  // Define an array of value levels for the color scheme
  const valueLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  // Create an empty array to store the colors in the color scheme
  const colorScheme = [];

  // Loop through the value levels and create a color for each level
  for (let i = 0; i < valueLevels.length; i++) {
    // Set the value of the hsv color to the current value level
    // hsvColor[2] = valueLevels[i] / 1000;

    // Convert the hsv color back to the hex color space
    // const hexColor = hsvToHex(hsvColor);

    // Add the color to the color scheme array
    colorScheme.push([hsvColor[0], hsvColor[1], (valueLevels[i] / 1000) * 100]);
  }
  return colorScheme;
}
const listToHsv = (list) => {
  return list.map((hex) => {
    return hexToHsv(hex);
  });
};
