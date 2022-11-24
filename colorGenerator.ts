/**
 * This method will receive a color in hex or rgb and will return a color scheme based in that color
 */

/**
 * This method will convert a decimal number to hex number
 */
const equivalent = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
};
const converter = (letra) => {
  return equivalent[letra];
};
const DecToHex = () => {};

/**
 * This method will convert a hexagecimal number to dec number
 */

const HexToDec = (str: string) => {
  const reversed = reverseString(str);
  let acumulador = 0;
  for (let i = 0; i < reversed.length; i++) {
    let temp = 16 * i;
  }
};

const reverseString = (str: string) => {
  return str === "" ? "" : str.split("").reverse();
};
