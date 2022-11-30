import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import colors from "./colors";
const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
	disableTransitionOnChange: false,
};

const styles = {
	global: (props: StyleFunctionProps) => ({
		body: {
			// fontFamily: "body",
			// color: mode("gray.800", "whiteAlpha.900")(props),
			// bg: mode("white", "gray.800")(props),
			// lineHeight: "base",
		},
	}),
};

const theme = extendTheme({
	config,
	styles,
	colors: { colors },
});
console.log(theme);
export default theme;
