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
		fH: parseInt(hsb.H.toFixed()),
		fS: parseInt(hsb.S.toFixed()),
		fB: parseInt(hsb.B.toFixed()),
	};
	return floorHSB;
};

/**
 * This method is used to generate a color scheme of 10 colors based on a given color.
 * @param {string} hex - The hex value of the color to generate a scheme for.
 * @returns {string{}} - An object of hex values.
 *
 */
export const generateColorScheme = (hex: string) => {
	const { fH, fS, fB } = HEXtoHSB(hex);
	// First, we'll detect if its a light, mid or dark color using ther function position.
	// We'll use this to determine the color scheme.
	/**
	 * This function is used to determine the position of a color on the HSB scale.
	 * @param fH
	 * @param fS
	 * @param fB
	 */
	const colorPosition = (fH: number, fS: number, fB: number) => {
		//The color is light if fb >= 80 and 20 < fs < 40
		//The color is mid if fb 50 < fb < 80 and fs >= 40
		//The color is dark if fb <= 50 and fs >= 40
		//other than that is gay, thite or black
		if (fB >= 80 && fS >= 20 && fS <= 40) {
			return "light";
		}
		if (fB >= 50 && fB <= 80 && fS >= 40) {
			return "mid";
		}
		if (fB <= 50 && fS >= 40) {
			return "dark";
		}
		return "other";
	};
	const colorPos = colorPosition(fH, fS, fB);
	//Now that we have the color position we'll determinta in which of the 10 color schemes the color belongs to.
	/**
	 * This function is used to determine the color scheme of a color.
	 * @param fH
	 * @param fS
	 * @param fB
	 * @param colorPos
	 * @returns {string} - The color scheme of the color.
	 */
	const colorScheme = (
		fH: number,
		fS: number,
		fB: number,
		colorPos: string
	) => {
		//The color is warm if fh >= 0 and fh <= 60
		//The color is cool if fh >= 120 and fh <= 240
		//The color is neutral if fh >= 60 and fh <= 120
		//other than that
		if (colorPos === "light") {
			if (fH >= 0 && fH <= 60) {
				return "warm";
			}
			if (fH >= 120 && fH <= 240) {
				return "cool";
			}
			if (fH >= 60 && fH <= 120) {
				return "neutral";
			}
		}
		if (colorPos === "mid") {
			if (fH >= 0 && fH <= 60) {
				return "warm";
			}
			if (fH >= 120 && fH <= 240) {
				return "cool";
			}
			if (fH >= 60 && fH <= 120) {
				return "neutral";
			}
		}
		if (colorPos === "dark") {
			if (fH >= 0 && fH <= 60) {
				return "warm";
			}
			if (fH >= 120 && fH <= 240) {
				return "cool";
			}
			if (fH >= 60 && fH <= 120) {
				return "neutral";
			}
		}
		return "other";
	};
	const colorSch = colorScheme(fH, fS, fB, colorPos);
	//Now that we have the color scheme we'll generate the colors.
	/**
	 * This function is used to generate the colors of a color scheme.
	 * @param fH
	 * @param fS
	 * @param fB
	 * @param colorPos
	 * @param colorSch
	 * @returns {string[]} - An array of hex values.
	 */
	// const generateColors = (fH: number, fS: number, fB: number, colorPos: string, colorSch: string) => {
};

// const brightnes = ({
// 	H,
// 	S,
// 	B,
// }: {
// 	H: number;
// 	S: number;
// 	B: number;
// }): string => {
// 	if (B <= 30) {
// 		return "Dark";
// 	} else if (70 <= B) {
// 		return "Light";
// 	} else {
// 		return "Medium";
// 	}
// };
const ccc = {
	blue: {
		50: "#ebf8ff",
		100: "#bee3f8",
		200: "#90cdf4",
		300: "#63b3ed",
		400: "#4299e1",
		500: "#3182ce",
		600: "#2b6cb0",
		700: "#2c5282",
		800: "#2a4365",
		900: "#1A365D",
	},
	cyan: {
		50: "#EDFDFD",
		100: "#C4F1F9",
		200: "#9DECF9",
		300: "#76E4F7",
		400: "#0BC5EA",
		500: "#00B5D8",
		600: "#00A3C4",
		700: "#0987A0",
		800: "#086F83",
		900: "#065666",
	},
	facebook: {
		50: "#E8F4F9",
		100: "#D9DEE9",
		200: "#B7C2DA",
		300: "#6482C0",
		400: "#4267B2",
		500: "#385898",
		600: "#314E89",
		700: "#29487D",
		800: "#223B67",
		900: "#1E355B",
	},
	gray: {
		50: "#F7FAFC",
		100: "#EDF2F7",
		200: "#E2E8F0",
		300: "#CBD5E0",
		400: "#A0AEC0",
		500: "#718096",
		600: "#4A5568",
		700: "#2D3748",
		800: "#1A202C",
		900: "#171923",
	},
	green: {
		50: "#F0FFF4",
		100: "#C6F6D5",
		200: "#9AE6B4",
		300: "#68D391",
		400: "#48BB78",
		500: "#38A169",
		600: "#2F855A",
		700: "#276749",
		800: "#22543D",
		900: "#1C4532",
	},
	linkedin: {
		50: "#E8F4F9",
		100: "#CFEDFB",
		200: "#9BDAF3",
		300: "#68C7EC",
		400: "#34B3E4",
		500: "#00A0DC",
		600: "#008CC9",
		700: "#0077B5",
		800: "#005E93",
		900: "#004471",
	},
	messenger: {
		50: "#D0E6FF",
		100: "#B9DAFF",
		200: "#A2CDFF",
		300: "#7AB8FF",
		400: "#2E90FF",
		500: "#0078FF",
		600: "#0063D1",
		700: "#0052AC",
		800: "#003C7E",
		900: "#002C5C",
	},
	orange: {
		50: "#FFFAF0",
		100: "#FEEBC8",
		200: "#FBD38D",
		300: "#F6AD55",
		400: "#ED8936",
		500: "#DD6B20",
		600: "#C05621",
		700: "#9C4221",
		800: "#7B341E",
		900: "#652B19",
	},
	pink: {
		50: "#FFF5F7",
		100: "#FED7E2",
		200: "#FBB6CE",
		300: "#F687B3",
		400: "#ED64A6",
		500: "#D53F8C",
		600: "#B83280",
		700: "#97266D",
		800: "#702459",
		900: "#521B41",
	},
	purple: {
		50: "#FAF5FF",
		100: "#E9D8FD",
		200: "#D6BCFA",
		300: "#B794F4",
		400: "#9F7AEA",
		500: "#805AD5",
		600: "#6B46C1",
		700: "#553C9A",
		800: "#44337A",
		900: "#322659",
	},
	red: {
		50: "#FFF5F5",
		100: "#FED7D7",
		200: "#FEB2B2",
		300: "#FC8181",
		400: "#F56565",
		500: "#E53E3E",
		600: "#C53030",
		700: "#9B2C2C",
		800: "#822727",
		900: "#63171B",
	},
	teal: {
		50: "#E6FFFA",
		100: "#B2F5EA",
		200: "#81E6D9",
		300: "#4FD1C5",
		400: "#38B2AC",
		500: "#319795",
		600: "#2C7A7B",
		700: "#285E61",
		800: "#234E52",
		900: "#1D4044",
	},
	telegram: {
		50: "#E3F2F9",
		100: "#C5E4F3",
		200: "#A2D4EC",
		300: "#7AC1E4",
		400: "#47A9DA",
		500: "#0088CC",
		600: "#007AB8",
		700: "#006BA1",
		800: "#005885",
		900: "#003F5E",
	},
	twitter: {
		50: "#E5F4FD",
		100: "#C8E9FB",
		200: "#A8DCFA",
		300: "#83CDF7",
		400: "#57BBF5",
		500: "#1DA1F2",
		600: "#1A94DA",
		700: "#1681BF",
		800: "#136B9E",
		900: "#0D4D71",
	},
	whatsapp: {
		50: "#dffeec",
		100: "#b9f5d0",
		200: "#90edb3",
		300: "#65e495",
		400: "#3cdd78",
		500: "#22c35e",
		600: "#179848",
		700: "#0c6c33",
		800: "#01421c",
		900: "#001803",
	},
	yellow: {
		50: "#FFFFF0",
		100: "#FEFCBF",
		200: "#FAF089",
		300: "#F6E05E",
		400: "#ECC94B",
		500: "#D69E2E",
		600: "#B7791F",
		700: "#975A16",
		800: "#744210",
		900: "#5F370E",
	},
};

/**
 * This method will receive and object with the following structure:
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
 * Then it will return an object with the following structure:
 * {
 * 		"50":{
 * 			"colorName1": "#FFFFFF",
 * 			"colorName2": "#FFFFFF",
 * 			...
 * 		},
 * 		"100":{
 * 			"colorName1": "#FFFFFF",
 * 			"colorName2": "#FFFFFF",
 * 			...
 * 		},
 * 		...
 * }
 * @param {Object} colors
 * @returns {Object}
 * const colors = {
 *
 *
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

const colorsByShade = getColorsByShade(ccc);
console.log(colorsByShade);

/*
const getLimits = () => {
	return Object.entries(ccc).map((cc, i) => {
		return Object.entries(cc[1]).map((c) => {
			return HEXtoHSB(c[1]);
		});
	});
};

const OrderByIntesity = () => {
	const listas = getLimits();
	const arr = [];
	for (let i = 0; i < 10; i++) {
		arr.push({
			index: i === 0 ? "50" : (i * 100).toString(),
			listas: listas.map((lista) => {
				return lista[i];
			}),
		});
	}
	return arr;
};

const getLower = () => {
	const ordered = OrderByIntesity();
	return ordered.map((intes) => {
		return intes.listas.sort((a, b) => {
			// console.log(a, b);
			return a.fB < b.fB;
		});
	});
};
console.log(getLower());
*/
