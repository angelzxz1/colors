const HsvToHex = (h, s, v) => {
	console.log("HSV: ", h, s, v);
	const [r, g, b] = hsvToRgb(h, s, v);
	console.log("RGB: ", r, g, b);
	let hex = RGBToHEX(r, g, b);
	console.log("HEX: ", hex);
	console.log("");
	return hex;
};
const RGBToHEX = (r, g, b) => {
	let R = r < 16 ? `0${r.toString(16)}` : r.toString(16);
	let G = g < 16 ? `0${g.toString(16)}` : g.toString(16);
	let B = b < 16 ? `0${b.toString(16)}` : b.toString(16);
	return `#${R}${G}${B}`;
};
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
function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
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

const HexToHsv = (hex) => {
	const [r, g, b] = hexToRgb(hex);
	return rgbToHsv(r, g, b);
};

function generateColorScheme(color) {
	const [h, s, v] = HexToHsv(color);
	const colors = [];

	const minSaturation = 10;
	const maxSaturation = 90;
	const minValue = 10;
	const maxValue = 90;
	colors.push(HsvToHex(h, minSaturation, maxValue));

	let prevS = 10;
	let prevV = 90;
	for (let i = 0; i < 8; i++) {
		prevS += 9;
		prevV -= 9;
		colors.push(HsvToHex(h, prevS, prevV));
	}
	colors.push(HsvToHex(h, maxSaturation, minValue));
	return colors;
}

// Example usage: generate a color scheme based on the color '#2dc455' (green)
const colorScheme = generateColorScheme("#495bd1");
console.log(colorScheme);
[
	"#cfe6d4",
	"#a7cfb1",
	"#84b891",
	"#65a174",
	"#4a8a5a",
	"#347343",
	"#215c30",
	"#13451f",
	"#082e12",
	"#031a08",
];
[
	"#cfd2e6",
	"#a7adcf",
	"#848bb8",
	"#656da1",
	"#4a538a",
	"#343c73",
	"#21295c",
	"#131945",
	"#080d2e",
	"#03061a",
];
