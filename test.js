


function hexToRgb(hex: string): [number, number, number] {
  // Parse the hex string to get the individual red, green, and blue values
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  // Return the RGB values as an array
  return [    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  // Normalize the RGB values to be between 0 and 1
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  // Find the maximum and minimum values of RGB
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);

  // Initialize the hue, saturation, and value variables
  let h = 0;
  let s = 0;
  let v = max;

  // Calculate the hue
  if (max === min) {
    h = 0;
  } else if (max === rNorm) {
    h = 60 * (0 + (gNorm - bNorm) / (max - min));
  } else if (max === gNorm) {
    h = 60 * (2 + (bNorm - rNorm) / (max - min));
  } else if (max === bNorm) {
    h = 60 * (4 + (rNorm - gNorm) / (max - min));
  }

  // Make sure the hue is between 0 and 360
  if (h < 0) {
    h += 360;
  }

  // Calculate the saturation
  if (max === 0) {
    s = 0;
  } else {
    s = (max - min) / max;
  }

  // Return the HSV values as an array
  return [h, s, v];
}

// Example usage: convert the color #FF0000 (red) to HSV
const [hue, saturation, value] = rgbToHsv(...hexToRgb("#FF0000"));



function hexToHsv(hex: string): [number, number, number] {
  // Convert the hexadecimal color to RGB
  const [r, g, b] = hexToRgb(hex);

  // Convert the RGB values to HSV
  return rgbToHsv(r, g, b);
}

// Example usage: convert the color #FF0000 (red) to HSV
const [hue, saturation, value] = hexToHsv("#FF0000");

function hexToHsv(hex: string): [number, number, number] {
  // Convert the hexadecimal color to RGB
  const [r, g, b] = hexToRgb(hex);

  // Convert the RGB values to HSV
  return rgbToHsv(r, g, b);
}

function generateColorScheme(hex: string): {[key: string]: string} {
  // Convert the hexadecimal color to HSV
  const [hue, saturation, value] = hexToHsv(hex);

  // Generate 10 colors going from light to dark
  const colors = [];
  for (let i = 0; i < 10; i++) {
    // Calculate the saturation and value for this color
    const sat = saturation * (1 - i / 10);
    const val = value * (1 - i / 10);

    // Convert the HSV values back to RGB
    const [r, g, b] = hsvToRgb(hue, sat, val);

    // Convert the RGB values to a hexadecimal color string
    const hex = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

    // Add the color to the array
    colors.push(hex);
  }

  // Return the array of colors as an object
  return {
    color1: colors[0],
    color2: colors[1],
    color3: colors[2],
    color4: colors[3],
    color5: colors[4],
    color6: colors[5],
    color7: colors[6],
    color8: colors[7],
    color9: colors[8],
    color10: colors[9],
  };
}

// Example usage: generate a color scheme for the color #FF0000 (red)
const colorScheme = generateColorScheme("#FF0000");
