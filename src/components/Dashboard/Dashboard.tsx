import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";
import EventForm from "./EventForm";
import Logout from "./Logout";

export const Dashboard = () => {
  return (
    <div>
      <Flex bg="black">
        <Flex>
          <Logout />
        </Flex>
        <Flex position="fixed" top="1rem" right="1rem" align="center" mt="-3">
          <Text fontSize="40px" color="Red">
            Sub-city
          </Text>
        </Flex>
      </Flex>
      <Box>
        <EventForm />
      </Box>
    </div>
  );
};
