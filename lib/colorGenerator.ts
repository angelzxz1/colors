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
