import {
  Input,
  Box,
  FormLabel,
  Textarea,
  Text,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";

export default function EventForm() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Box boxShadow="dark-lg" p="10" rounded="md" bg="white">
        <form>
          <FormLabel> Event Date</FormLabel>
          <Input placeholder="M/dd/yy" w="40%" />
          <FormLabel mt="4"> Event Time</FormLabel>
          <Input placeholder="Event Time" w="40%" />
          <Text mt="4">Description</Text>
          <Textarea placeholder="Describe your event" />
          <Stack direction="row" mt="4">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="£"
              />
              <Input placeholder="Total cost" />
            </InputGroup>
            <Text centerContent>Attendants</Text>
            <NumberInput>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
        </form>
      </Box>
    </div>
  );
}
