import {
  Input,
  Box,
  FormLabel,
  Textarea,
  HStack,
  InputLeftElement,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function EventForm() {
  const [organiserName, setOrganiserName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [description, setDescription] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [attendees, setAttendants] = useState("");
  // const [eventIDS, seteventIDS] = useState(0)[]

  const onSubmitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // we do not want it to refresh
    try {
      const body = {
        organiserName,
        eventDate,
        description,
        totalCost,
        attendees,
      };

      const response = await fetch(
        "https://obscure-river-76343.herokuapp.com/events",
        {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const redirect = await response.text();
      // const idNumber = await response.text()
      console.log(redirect);
      // seteventIDS(...eventIDS, parseInt(idNumber))
      window.location.href = `https://obscure-river-76343.herokuapp.com${redirect}`;
    } catch (err) {
      console.error(err.message);
    }
  };

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
        <form onSubmit={(e) => onSubmitEvent(e)}>
          <FormLabel mt="4"> Organiser Name</FormLabel>
          <Input
            placeholder="Organiser Name"
            w="40%"
            value={organiserName}
            onChange={(e) => setOrganiserName(e.target.value)}
          />
          <HStack spacing="5px">
            <InputGroup mt="4">
              <FormLabel> Event Date</FormLabel>
              <FormLabel ml="35%"> Event Time</FormLabel>
            </InputGroup>
          </HStack>
          <HStack>
            <InputGroup>
              <Input
                placeholder="YYYY-MM-DD"
                w="40%"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
              <Input
                placeholder="Event Time"
                w="40%"
                ml="14"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
              />
            </InputGroup>
          </HStack>
          <FormLabel mt="4"> Description</FormLabel>
          <Textarea
            placeholder="Describe your event"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <HStack spacing="5px">
            <InputGroup mt="4">
              <FormLabel ml=""> Total cost</FormLabel>
              <FormLabel ml="55%"> Attendants</FormLabel>
            </InputGroup>
          </HStack>
          <HStack>
            <InputGroup ml="-2">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="£"
              />
              <Input
                placeholder="Total Cost"
                w="40%"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
              />
            </InputGroup>
            <Input
              placeholder="Attendants"
              w="40%"
              value={attendees}
              onChange={(e) => setAttendants(e.target.value)}
            />
          </HStack>
          <Button type="submit" colorScheme="green" mt="4">
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
}
