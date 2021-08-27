import * as React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";

export const App = () => (
  <ChakraProvider>
    <Box textAlign="center" fontSize="xl">
      hello world
    </Box>
  </ChakraProvider>
);
