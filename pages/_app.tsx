import React from "react";
import "../global.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../lib/theme";

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
