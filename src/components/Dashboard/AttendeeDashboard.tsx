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

export interface Event {
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
  const [event, setEvent] = useState<Event>();
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
        const fetchEventInfo = await fetch(
          `https://obscure-river-76343.herokuapp.com/event-info/${id}`
        );
        const jsonData: Event = await fetchEventInfo.json();
        setEvent(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    getEvent();
  }, [event, id]);

  const onSubmitAttendeeName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // we do not want it to refresh
    try {
      const body = { attendeeName };

      const sendAttendeeInfo = await fetch(
        `http://obscure-river-76343.herokuapp.com/attendee/buy/${id}`,
        {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(sendAttendeeInfo);
      //   window.location.href = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log({ event });

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
          <div key={event?.event_id}>
            <Box>
              <Text fontSize="2xl">
                Event Organisor: {event?.organiser_name}
              </Text>
              <Text fontSize="2xl" mt="4">
                Event Date:
                {
                  event?.date_of_event
                  // .slice(0, 10)
                }
              </Text>
              <Text fontSize="2xl" mt="4">
                Event Time: {event?.time_of_event}
              </Text>
              <Text fontSize="2xl" mt="4">
                Event Description
              </Text>
              <Text fontSize="2xl" mt="2">
                {event?.description}
              </Text>
              <HStack mt="4">
                <Checkbox colorScheme="green" size="lg" isInvalid mr="20%">
                  Attending Event
                </Checkbox>

                <Text fontSize="xl" ml="7">
                  Cost Per Person: £
                  {event !== undefined
                    ? new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                      })
                        .format(
                          Number(event?.total_cost / event?.num_of_attendees)
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
