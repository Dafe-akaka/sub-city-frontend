import {
  Input,
  Box,
  FormLabel,
  Textarea,
  Text,
  HStack,
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
          <FormLabel mt="4"> Organiser Name</FormLabel>
          <Input placeholder="Organiser Name" w="40%" />
          <HStack spacing="5px">
            <InputGroup mt="4">
              <FormLabel> Event Date</FormLabel>
              <FormLabel ml="35%"> Event Time</FormLabel>
            </InputGroup>
          </HStack>
          <HStack>
            <InputGroup spacing="5px">
              <Input placeholder="M/dd/yy" w="40%" />
              <Input placeholder="Event Time" w="40%" ml="14" />
            </InputGroup>
          </HStack>
          <FormLabel mt="4"> Description</FormLabel>
          <Textarea placeholder="Describe your event" />
          <HStack direction="row" mt="6">
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
          </HStack>
        </form>
      </Box>
    </div>
  );
}
