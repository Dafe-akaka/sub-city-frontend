import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Text,
  HStack,
  VStack,
  Checkbox,
  Input,
  Container,
  Box,
  FormLabel,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

type EventParams = {
  id: string;
};

export interface Events {
  event_id: number;
  organiser_name: string;
  date_of_event: string;
  num_of_attendees: number;
  total_cost: number;
  description: string;
  time_of_event: string;
}

export default function AttendeeDashboard() {
  let { id } = useParams<EventParams>();
  const [events, setEvents] = useState<Events>();
  const [attendeeName, SetAttendeeName] = useState("");
  //   const [cost, setCost] = useState("");

  // const getEvent = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://obscure-river-76343.herokuapp.com/event-info/${id}`
  //     );
  //     const jsonData = await response.json();
  //     setEvents(jsonData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  useEffect(() => {
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

    getEvent();
  }, [events, id]);

  const onSubmitAttendeeName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // we do not want it to refresh
    try {
      const body = { attendeeName };

      const response = await fetch(
        `http://obscure-river-76343.herokuapp.com/attendee/buy/${id}`,
        {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(response);
      //   window.location.href = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log({ events });

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Container boxShadow="dark-lg" p="10" rounded="md" bg="white" maxW="xl">
        {
          <div key={events?.event_id}>
            <Box>
              <Text fontSize="2xl">
                Event Organisor: {events?.organiser_name}
              </Text>
              <Text fontSize="2xl" mt="4">
                Event Date:
                {
                  events?.date_of_event
                  // .slice(0, 10)
                }
              </Text>
              <Text fontSize="2xl" mt="4">
                Event Time: {events?.time_of_event}
              </Text>
              <Text fontSize="2xl" mt="4">
                Event Description
              </Text>
              <Text fontSize="2xl" mt="2">
                {events?.description}
              </Text>
              <HStack mt="4">
                <Checkbox colorScheme="green" size="lg" isInvalid mr="20%">
                  Attending Event
                </Checkbox>

                <Text fontSize="xl" ml="7">
                  Cost Per Person: £
                  {events !== undefined
                    ? new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                      })
                        .format(
                          Number(events?.total_cost / events?.num_of_attendees)
                        )
                        .replace(/[^a-zA-Z0-9]/g, "")
                    : null}
                </Text>
              </HStack>
            </Box>
          </div>
        }

        <form onSubmit={(e) => onSubmitAttendeeName(e)}>
          <Box mt="5">
            <VStack>
              <HStack>
                <FormLabel mt="4"> Attendee Name:</FormLabel>
                <Input
                  placeholder="Attendee Name"
                  w="40%"
                  ml="4"
                  value={attendeeName}
                  onChange={(e) => SetAttendeeName(e.target.value)}
                ></Input>
              </HStack>
              <Button
                leftIcon={<ArrowForwardIcon />}
                colorScheme="yellow"
                variant="solid"
                mt="5"
              >
                Transfer Money
              </Button>
            </VStack>
          </Box>
        </form>
      </Container>
    </div>
  );
}
