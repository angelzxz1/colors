import * as colorConvert from "color-convert";

function generateColorScheme(color: string): string[] {
	const [h, s, v] = colorConvert.hexToHsv(color);
	const colors: string[] = [];

	const minSaturation = 10;
	const maxSaturation = 90;
	const minValue = 10;
	const maxValue = 90;
	colors.push(colorConvert.hsvToHex([h, minSaturation, maxValue]));

	let prevS = 10;
	let prevV = 90;
	for (let i = 0; i < 8; i++) {
		prevS += 10;
		prevV -= 10;
		colors.push(colorConvert.hsvToHex([h, prevS, prevV]));
	}
	colors.push(colorConvert.hsvToHex([h, maxSaturation, minValue]));
	return colors;
}

// Example usage: generate a color scheme based on the color '#2dc455' (green)
const colorScheme = generateColorScheme("#2dc455");
console.log(colorScheme);
