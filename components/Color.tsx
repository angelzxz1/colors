import { Grid } from "@chakra-ui/react";

type props = {
    intensity: string;
    hex: string;
    color: string;
    key: number;
};

const Color = ({ intensity, hex, color, key }: props) => {
    return (
        <Grid
            key={key}
            bg={hex}
            height="100px"
            width="100px"
            color={parseInt(intensity) < 500 ? "black" : "white"}
            justifyContent="center"
            alignItems="center"
            fontSize="1.1rem"
            borderRadius="100px"
            transition="all 150ms ease "
            cursor="pointer"
            _hover={{
                boxShadow: "0 0 10px black",
            }}
        ></Grid>
    );
};

export default Color;

// {`${color} ${intensity}: ${hex.toUpperCase()}`}
