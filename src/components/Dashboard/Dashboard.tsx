import { Flex, Box, Text, Spacer } from "@chakra-ui/react";
import React from "react";
import EventForm from "./EventForm";
import Logout from "./Logout";

export const Dashboard = () => {
  return (
    <div>
      <Flex bg="gray.300">
        <Box top="1rem" right="1rem" align="center" mt="2">
          <Text fontSize="40px" color="black">
            Sub-city
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Logout />
        </Box>
      </Flex>
      <Box>
        <EventForm />
      </Box>
    </div>
  );
};
