import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import EventForm from "./EventForm";
import Logout from "./Logout";

export const Dashboard = () => {
  return (
    <div>
      <Flex
        mb={8}
        p={1}
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
      >
        <Box px={7} w="100%" h="20">
          <Flex
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
          >
            <Logout />
          </Flex>
        </Box>
      </Flex>
      <Box>
        <EventForm />
      </Box>
    </div>
  );
};
