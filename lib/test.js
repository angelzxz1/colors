import { ccc } from "./ChakraUIColors.js";

const RGBToHSL = (r, g, b) => {
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

const HSLToRGB = (h, s, l) => {
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

const RGBToHSB = (r, g, b) => {
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
	return {
		H,
		S,
		B,
	};
};

const HSBToRGB = (h, s, b) => {
	s /= 100;
	b /= 100;
	const k = (n) => (n + h / 60) % 6;
	const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
	const { R, G, B } = {
		R: parseInt((255 * f(5)).toFixed()),
		G: parseInt((255 * f(3)).toFixed()),
		B: parseInt((255 * f(1)).toFixed()),
	};
	return {
		R,
		G,
		B,
		string: `rgb(${R},${G},${B})`,
	};
};

const HEXtoRGB = (hex) => {
	const trimmed = hex.replace("#", "");
	const [Rh, Gh, Bh] = [
		trimmed.slice(0, 2),
		trimmed.slice(2, 4),
		trimmed.slice(4),
	];
	const [R, G, B] = [parseInt(Rh, 16), parseInt(Gh, 16), parseInt(Bh, 16)];
	return { R, G, B, string: `rgb(${R},${G},${B})` };
};

const RGBToHEX = (r, g, b) => {
	return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};

/**
 * This method is used to get shades of a color from the color palette.
 */

const getColorsByShade = (colors) => {
	const shades = {};

	Object.keys(colors).forEach((colorName) => {
		Object.keys(colors[colorName]).forEach((shade) => {
			if (!shades[shade]) {
				shades[shade] = {};
			}

			shades[shade][colorName] = colors[colorName][shade];
		});
	});

	return shades;
};
const HexToHsb = (hex) => {
	const { R, G, B } = HEXtoRGB(hex);
	return RGBToHSB(R, G, B);
};

/**
 * This method will receive an object with the following structure:
 * {
 * 		"colorName1": {
 * 			"50": "#FFFFFF",
 * 			"100": "#FFFFFF",
 * 			"200": "#FFFFFF",
 * 			"300": "#FFFFFF",
 * 			"400": "#FFFFFF",
 * 			"500": "#FFFFFF",
 * 			"600": "#FFFFFF",
 * 			"700": "#FFFFFF",
 * 			"800": "#FFFFFF",
 * 			"900": "#FFFFFF",
 * 		},
 * 		"colorName2": {
 * 			"50": "#FFFFFF",
 * 			"100": "#FFFFFF",
 * 			"200": "#FFFFFF",
 * 			"300": "#FFFFFF",
 * 			"400": "#FFFFFF",
 * 			"500": "#FFFFFF",
 * 			"600": "#FFFFFF",
 * 			"700": "#FFFFFF",
 * 			"800": "#FFFFFF",
 * 			"900": "#FFFFFF",
 * 		},
 * 		...
 *
 * }
 * Then, will convert each hex value to HSB usgin the `HexToHsb` method
 * and will return an object with the same structure but with the HSB values
 *
 */
const colorsToHSB = (colors) => {
	const hsbColors = {};

	Object.keys(colors).forEach((colorName) => {
		hsbColors[colorName] = {};

		Object.keys(colors[colorName]).forEach((shade) => {
			hsbColors[colorName][shade] = HexToHsb(colors[colorName][shade]);
		});
	});

	return hsbColors;
};
/**
 * This method will receive an object like the one retuerned by the getrColorsByShade method
 * And for each shade, will return an object with the lowet and highest fS and fB values
 * With eh following structure:
 * {
 *	50: {
 *		lowers: { fS: 2, fB: 98 },
 *		highers: { fS: 18, fB: 100 },
 *	},
 *	100: {
 *		lowers: { fS: 4, fB: 91 },
 *		highers: { fS: 25, fB: 100 },
 *	},
 *	...
};
*/
const getShadesRanges = (colorsByShade) => {
	const shadesRanges = {};

	Object.keys(colorsByShade).forEach((shade) => {
		const colors = colorsByShade[shade];

		const lowers = {
			S: 100,
			B: 100,
		};
		const highers = {
			S: 0,
			B: 0,
		};
		Object.keys(colors).forEach((colorName) => {
			const { S, B } = colors[colorName];
			if (S < lowers.S) {
				lowers.S = S;
			}
			if (B < lowers.B) {
				lowers.B = B;
			}
			if (S > highers.S) {
				highers.S = S;
			}
			if (B > highers.B) {
				highers.B = B;
			}
		});

		shadesRanges[shade] = {
			lowers,
			highers,
		};
	});

	return shadesRanges;
};

const RangeOfShades = {
	50: { lowers: { S: 1, B: 97 }, highers: { S: 18, B: 100 } },
	100: { lowers: { S: 4, B: 91 }, highers: { S: 27, B: 100 } },
	200: { lowers: { S: 5, B: 85 }, highers: { S: 45, B: 100 } },
	300: { lowers: { S: 9, B: 75 }, highers: { S: 65, B: 100 } },
	400: { lowers: { S: 16, B: 69 }, highers: { S: 95, B: 100 } },
	500: { lowers: { S: 24, B: 58 }, highers: { S: 100, B: 100 } },
	600: { lowers: { S: 28, B: 40 }, highers: { S: 100, B: 85 } },
	700: { lowers: { S: 37, B: 28 }, highers: { S: 100, B: 74 } },
	800: { lowers: { S: 40, B: 17 }, highers: { S: 100, B: 61 } },
	900: { lowers: { S: 34, B: 9 }, highers: { S: 100, B: 44 } },
};

const RangeOfShades2 = {
	50: { lowers: { S: 1, B: 90 }, highers: { S: 10, B: 100 } },
	100: { lowers: { S: 11, B: 81 }, highers: { S: 20, B: 90 } },
	200: { lowers: { S: 21, B: 72 }, highers: { S: 30, B: 81 } },
	300: { lowers: { S: 31, B: 63 }, highers: { S: 40, B: 72 } },
	400: { lowers: { S: 41, B: 54 }, highers: { S: 50, B: 63 } },
	500: { lowers: { S: 51, B: 45 }, highers: { S: 60, B: 54 } },
	600: { lowers: { S: 61, B: 36 }, highers: { S: 70, B: 45 } },
	700: { lowers: { S: 71, B: 27 }, highers: { S: 80, B: 36 } },
	800: { lowers: { S: 81, B: 18 }, highers: { S: 90, B: 27 } },
	900: { lowers: { S: 91, B: 9 }, highers: { S: 100, B: 18 } },
};

/**
 * This method will receive an object like the one retuerned by the getShadesRanges method
 * And for each shade, will return an object with 4 combinations of fS and fB values and a middle value
 * This middle value will be generated by the following formula:
 * (lowers.fS + highers.fS) / 2
 * (lowers.fB + highers.fB) / 2
 *
 * With eh following structure:
 * {
 *     50: {
 *        P0: { S: 2, B: 98 },
 *        P1: { S: 2, B: 100 },
 *        P2: { S: 18, B: 98 },
 *        P3: { S: 18, B: 100 },
 *        middle: { S: 10, B: 99 },
 *     },
 *     100: {
 *        P0: { S: 4, B: 91 },
 *        P1: { S: 4, B: 100 },
 *        P2: { S: 25, B: 91 },
 *        P3: { S: 25, B: 100 },
 *        middle: { S: 14, B: 95 },
 *      },
 *      ...
 * }
 */
const getShadesCombinations = (shadesRanges) => {
	const shadesCombinations = {};

	Object.keys(shadesRanges).forEach((shade) => {
		const { lowers, highers } = shadesRanges[shade];

		shadesCombinations[shade] = {
			P0: {
				S: lowers.S,
				B: lowers.B,
			},
			P1: {
				S: lowers.S,
				B: highers.B,
			},
			P2: {
				S: highers.S,
				B: lowers.B,
			},
			P3: {
				S: highers.S,
				B: highers.B,
			},
			middle: {
				S: (lowers.S + highers.S) / 2,
				B: (lowers.B + highers.B) / 2,
			},
		};
	});

	return shadesCombinations;
};

const RangeOfSquares = {
	50: {
		P0: { S: 1, B: 97 },
		P1: { S: 18, B: 100 },
		P2: { S: 18, B: 97 },
		P3: { S: 1, B: 100 },
		middle: { S: 9.5, B: 98.5 },
	},
	100: {
		P0: { S: 4, B: 91 },
		P1: { S: 27, B: 100 },
		P2: { S: 27, B: 91 },
		P3: { S: 4, B: 100 },
		middle: { S: 15.5, B: 95.5 },
	},
	200: {
		P0: { S: 5, B: 85 },
		P1: { S: 45, B: 100 },
		P2: { S: 45, B: 85 },
		P3: { S: 5, B: 100 },
		middle: { S: 25, B: 92.5 },
	},
	300: {
		P0: { S: 9, B: 75 },
		P1: { S: 65, B: 100 },
		P2: { S: 65, B: 75 },
		P3: { S: 9, B: 100 },
		middle: { S: 37, B: 87.5 },
	},
	400: {
		P0: { S: 16, B: 69 },
		P1: { S: 95, B: 100 },
		P2: { S: 95, B: 69 },
		P3: { S: 16, B: 100 },
		middle: { S: 55.5, B: 84.5 },
	},
	500: {
		P0: { S: 24, B: 58 },
		P1: { S: 100, B: 100 },
		P2: { S: 100, B: 58 },
		P3: { S: 24, B: 100 },
		middle: { S: 62, B: 79 },
	},
	600: {
		P0: { S: 28, B: 40 },
		P1: { S: 100, B: 85 },
		P2: { S: 100, B: 40 },
		P3: { S: 28, B: 85 },
		middle: { S: 64, B: 62.5 },
	},
	700: {
		P0: { S: 37, B: 28 },
		P1: { S: 100, B: 74 },
		P2: { S: 100, B: 28 },
		P3: { S: 37, B: 74 },
		middle: { S: 68.5, B: 51 },
	},
	800: {
		P0: { S: 40, B: 17 },
		P1: { S: 100, B: 61 },
		P2: { S: 100, B: 17 },
		P3: { S: 40, B: 61 },
		middle: { S: 70, B: 39 },
	},
	900: {
		P0: { S: 34, B: 9 },
		P1: { S: 100, B: 44 },
		P2: { S: 100, B: 9 },
		P3: { S: 34, B: 44 },
		middle: { S: 67, B: 26.5 },
	},
};

/**
 * This method will return the shade that is closer to the color
 * @param {Object} color
 * @returns {Number}
 * @example
 * getShade({ S: 50, B: 50 }, RangeOfShades, RangeOfSquares);
 * // => 500
 * @example
 * getShade({ S: 45, B: 20 }, RangeOfShades, RangeOfSquares);
 * // => 800
 */
const getShade = (color, rangeOfSquares) => {
	const { S, B } = color;
	let shade = 500;
	let distance = Number.MAX_SAFE_INTEGER;
	Object.keys(rangeOfSquares).forEach((key) => {
		const { middle } = rangeOfSquares[key];
		const newDistance = Math.sqrt(
			Math.pow(middle.S - S, 2) + Math.pow(middle.B - B, 2)
		);
		if (newDistance < distance) {
			distance = newDistance;
			shade = key;
		}
	});

	return shade;
};

/**
 * This method will return a color scheme based on the color passed
 * This will be done by getting the shade of the color and then
 * getting the shades combinations of that shade
 * Will use the RangeOfShades object to generate the other 9 shades
 * @param {Object} color
 * @returns {Object}
 * @example
 * getColorScheme({ H:50, S: 50, B: 50 }, RangeOfShades, RangeOfSquares);
 * // => {
 * // =>   50: { H: 50, S: 50, B: 50 },
 * // =>   100: { H: 50, S: 50, B: 50 },
 * // =>   200: { H: 50, S: 50, B: 50 },
 * // =>   300: { H: 50, S: 50, B: 50 },
 * // =>   400: { H: 50, S: 50, B: 50 },
 * // =>   500: { H: 50, S: 50, B: 50 },
 * // =>   600: { H: 50, S: 50, B: 50 },
 * // =>   700: { H: 50, S: 50, B: 50 },
 * // =>   800: { H: 50, S: 50, B: 50 },
 * // =>   900: { H: 50, S: 50, B: 50 },
 * // => }
 *
 */
const getColorScheme = (color, rangeOfShades, rangeOfSquares) => {
	const { H } = color;
	const shade = getShade(color, rangeOfSquares);
	//By usinf the RangeOfShades object we can get the other 9 shades.
	//Will iterate over the object and get the limits of each shade
	//Will generate a random number between the limits and then will check if is closer to the shade is looking
	//this will be done by generating the HSB color, converting it to Hex and thengerring the shade using the getShade method
	//If the shade is the same as the one we are looking for then we will return the color
	//If not we will generate a new random number and check again
	const colorScheme = {};
	Object.keys(rangeOfShades).forEach((key) => {
		const { P0, P1 } = rangeOfSquares[key];
		let randomShade = "";
		let i = 0;
		let randomColor = {};
		let randomHex;
		while (randomShade !== key) {
			const randomS =
				Math.floor(Math.random() * (P1.S - P0.S + 1)) + P0.S;
			const randomB =
				Math.floor(Math.random() * (P1.B - P0.B + 1)) + P0.B;
			randomColor = { H, S: randomS, B: randomB };
			const { R, G, B } = HSBToRGB(
				randomColor.H,
				randomColor.S,
				randomColor.B
			);
			randomHex = RGBToHEX(R, G, B);
			randomShade = getShade(HexToHsb(randomHex), rangeOfSquares);
			i++;
			console.log(
				"Attempt number",
				i,
				`Shade of the random is ${randomShade} and the one we are looking for is ${key}`
			);
		}
		colorScheme[key] = randomHex;
	});
	return colorScheme;
};

const value = getColorScheme(
	HexToHsb("#47d7c4"),
	RangeOfShades,
	RangeOfSquares
);
console.log(value);

let itemmm = {
	50: "#e6fcf9",
	100: "#c5ede8",
	200: "#a7dbd4",
	300: "#95dbd2",
	400: "#64bdb1",
	500: "#14ffe0",
	600: "#3b9c8f",
	700: "#1d8c7d",
	800: "#1b665c",
	900: "#0a433a",
};
