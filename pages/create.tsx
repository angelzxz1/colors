import { generateColorScheme2 } from "../lib/colorGenerator";
import { Flex, Box, Input, Button } from "@chakra-ui/react";
import React , {useEffect}from "react";
const Home = () => {
  const [colors, setColors] = React.useState<any>(null);
  const [value, setValue] = React.useState<string>("");
    useEffect(()=>{
        console.log(generateColorScheme2("f7d5ae"))
    })
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
          onClick={() => {
            setColors((prev) => {
              return generateColorScheme2(value);
            });
            setColors((prev) => {
              console.log(prev);
              return generateColorScheme2(value);
            });
          }}
        >
          Generate
        </Button>
      </Flex>
      <Flex>
        {colors ? (
          <div>
            {colors.map((color: any) => {
              return (
                <div
                  key={color.name}
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-evenly",
                    marginTop: "10px",
                  }}
                >
                  {Object.entries(color.colors).map((subColor: any) => {
                    const [intensity, hex] = subColor;
                    return (
                      <div
                        key={intensity}
                        style={{
                          backgroundColor: hex,
                          width: "100px",
                          height: "100px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                        }}
                      >
                        {intensity}
                        <br />
                        {hex}
                        <br />
                        {color.name}
                        <br />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
