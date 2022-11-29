/**
 * This function converts a hex color to an HSL color.
 * @param {string} hex - The hex color to convert.
 * @returns {string} - The HSL color.
 * @example
 * // returns "hsl(0, 0%, 0%)"
 * hexToHSL("#000000")
 * @example
 * // returns "hsl(0, 0%, 100%)"
 * hexToHSL("#ffffff")
 * @example
 * // returns "hsl(0, 0%, 50%)"
 * hexToHSL("#808080")
 * @example
 * // returns "hsl(0, 100%, 50%)"
 * hexToHSL("#35e0b6")
 * @example
 * // returns "hsl(120, 100%, 50%)"
 * hexToHSL("#00ff00")
 * @example
 * // returns "hsl(240, 100%, 50%)"
 * hexToHSL("#0000ff")
 * @example
 * // returns "hsl(300, 100%, 50%)"
 * hexToHSL("#ff00ff")
 */
export function hexToHSL(hex: string): string {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error("Invalid hex color");
  }
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);


  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `hsl(${(h * 360).toFixed()},${(s * 100).toFixed()}%,${(l * 100).toFixed()}%)`;
}


/**
 * This function converts a hex color to an HSV
 * @param {string} hex - The hex color to convert.
 * @returns {string} - The HSV color.
 * @example
 * // returns "hsv(0, 0%, 0%)"
 * hexToHSV("#000000")
 * @example
 * // returns "hsv(0, 0%, 100%)"
 * hexToHSV("#ffffff")
 * @example
 * // returns "hsv(0, 0%, 50%)"
 * hexToHSV("#808080")
 * @example
 * // returns "hsv(0, 100%, 100%)"
 * hexToHSV("#ff0000")
 * @example
 * // returns "hsv(120, 100%, 50%)"
 * hexToHSV("#00ff00")
 * @example
 * // returns "hsv(240, 100%, 50%)"
 * hexToHSV("#0000ff")
 * @example
 * // returns "hsv(300, 100%, 50%)"
 * hexToHSV("#ff00ff")
 *  
 */
export function hexToHSV(hex: string): string {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error("Invalid hex color");
  }
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `hsv(${h * 360},${s * 100}%,${v * 100}%)`;
}








/**
 * This function will convert a HSL color to a hex color.
 * @param {string} hsl - The HSL color to convert.
 * @returns {string} - The hex color.
 * @example
 * // returns "#000000"
 * hslToHex("hsl(0, 0%, 0%)")
 * @example
 * // returns "#ffffff"
 * hslToHex("hsl(0, 0%, 100%)")
 * @example
 * // returns "#808080"
 * hslToHex("hsl(0, 0%, 50%)")
 * @example
 * // returns "#ff0000"
 * hslToHex("hsl(0, 100%, 50%)")
 * @example
 * // returns "#00ff00"
 * hslToHex("hsl(120, 100%, 50%)")
 * @example
 * // returns "#0000ff"
 * hslToHex("hsl(240, 100%, 50%)")
 * @example
 * // returns "#ff00ff"
 * hslToHex("hsl(300, 100%, 50%)")
 * 
 */
export function hslToHex(hsl: string): string {
  const hslArray = hsl.split(",");
  const h = parseInt(hslArray[0].replace("hsl(", ""));
  const s = parseInt(hslArray[1].replace("%", ""));
  const l = parseInt(hslArray[2].replace("%", ""));
  let r, g, b;
  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


/**
 * This function will determine if a HSV is dark, mid, gray or light.
 * @param {number} s - The HSV color to check.
 * @param {number} v - The HSV color to check.
 * @returns {string} - The color type.
 */
export function hsvColorType(s: number, v: number): any {
  if(v <= 40){
    if(s > 30){
      return "dark";
    }else{
      return "gray to black";
    }
  }else{
    if(s > 30){
      if(v > 60){
        return "light";
      }else{
        return "mid";
      }
    }else{
      return "gray to white";
    }

  }
}





/**
 * This function will return a color scheme object of 10 colors based on a hex color given.
 * @param {string} hex - The hex color to generate a color scheme from.
 * @returns {object} - The color scheme object.
 */

type ColorScheme = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

// export function generateColorScheme(hex: string): any {
//   // First we convert the hex to an HSV using the hexToHSV function.
//   const hsv = hexToHSV(hex);
//   // Then we get the type of the HSV using the getHSVType function.
//   const hsvType = getHSVType(hsv);
//   // Then we separete the HSV into an array.
//   const hsvArray = hsv.split(",");
//   // Then we get the hue, saturation and value from the array.
//   const h = parseInt(hsvArray[0].replace("hsv(", ""));
//   const s = parseInt(hsvArray[1].replace("%", ""));
//   const v = parseInt(hsvArray[2].replace("%", ""));
//   console.log(h,s,v)
// }

// console.log(generateColorScheme("#db7f15"))


