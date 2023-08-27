import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Roboto_Flex } from "next/font/google";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const theme = extendTheme({
  fonts: {
    heading: `${roboto.style.fontFamily}, sans-serif`,
    body: ` ${roboto.style.fontFamily}, sans-serif`,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${roboto.variable}`}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  );
}
