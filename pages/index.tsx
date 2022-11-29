import colors from "../lib/colors";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Color from "../components/Color";
const Home = () => {
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {}, []);
    return (
        <Box>
            {loaded ? (
                <div>Loading...</div>
            ) : (
                Object.entries(colors).map((color, i) => {
                    return (
                        <Flex
                            key={i}
                            display="flex"
                            width="100%"
                            justify="space-evenly"
                            marginTop="10px"
                            direction="column"
                        >
                            <Box width="100%" textAlign="center">
                                {color[0]}
                            </Box>
                            <Flex justify="space-evenly">
                                {Object.entries(color[1]).map((subColor, i) => {
                                    const [intensity, hex] = subColor;
                                    return (
                                        <Color
                                            key={i}
                                            intensity={intensity}
                                            hex={hex}
                                            color={color[0]}
                                        />
                                    );
                                })}
                            </Flex>
                        </Flex>
                    );
                })
            )}
        </Box>
    );
};

export default Home;
