import { HEXtoHSB } from "../lib/colorGenerator";
import { Flex, Box, Input, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
const Home = () => {
	const [colors, setColors] = React.useState<any>(null);
	const [value, setValue] = React.useState<string>("");
	useEffect(() => {
		console.log(HEXtoHSB("#f7d5ae"));
	});
	return (
		<Flex w="100%" direction="column">
			<Flex w="100%">
				<Input
					w="20%"
					type="text"
					value={value}
					onChange={(event) => {
						setValue(event.target.value);
					}}
				/>
				<Button
				// onClick={() => {
				//   setColors((prev) => {
				//     return generateColorScheme2(value);
				//   });
				//   setColors((prev) => {
				//     console.log(prev);
				//     return generateColorScheme2(value);
				//   });
				// }}
				>
					Generate
				</Button>
			</Flex>
		</Flex>
	);
};

export default Home;
