import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Box,
  Text,
  HStack,
  Checkbox,
  Center,
  Container,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

type EventParams = {
  id: string;
};

export interface Events {
  Event_id: number;
  organiser_name: string;
  date_of_event: string;
  num_of_attendees: number;
  total_cost: number;
  description: string;
}

export default function AttendeeDashboard() {
  let { id } = useParams<EventParams>();
  const [events, setEvents] = useState<Events[]>([]);

  const getEvent = async () => {
    try {
      const response = await fetch(
        `https://obscure-river-76343.herokuapp.com/event-info/${id}`
      );
      const jsonData = await response.json();
      setEvents(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEvent();
  });
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Container boxShadow="dark-lg" p="10" rounded="md" bg="white">
        {events.map((event) => (
          <div key={event.Event_id}>
            <Text fontSize="2xl">Event Organisor: {event.organiser_name}</Text>
            <Text fontSize="2xl" mt="4">
              Event Date: {event.date_of_event.slice(0, 10)}
            </Text>

            <Text fontSize="2xl" mt="4">
              Event Description
            </Text>
            <Text fontSize="2xl" mt="2">
              {event.description}
            </Text>
            <HStack mt="4" center>
              <Checkbox colorScheme="green" size="lg" isInvalid mr="20%">
                Attending Event
              </Checkbox>
              <Text fontSize="xl" ml="7">
                Cost Per Person: £{event.total_cost / event.num_of_attendees}
              </Text>
            </HStack>
            <Center mt="5">
              <Button
                leftIcon={<ArrowForwardIcon />}
                colorScheme="yellow"
                variant="solid"
              >
                Transfer Money
              </Button>
            </Center>
          </div>
        ))}
      </Container>
    </div>
  );
}
