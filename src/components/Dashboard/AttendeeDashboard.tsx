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
  // const [event, setEvent] = useState<Event>();
  const [attendeeName, SetAttendeeName] = useState("");
  const [organiserName, setOrganiserName] = useState("");
  const [dateOfEvent, setDateOfEvent] = useState("");
  const [numOfAttendees, setnumOfAttendees] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [description, setDescription] = useState("");
  const [timeOfEvent, setTimeOfEvent] = useState("");

  const costPerPerson = (totalCost / numOfAttendees).toFixed(2);

  const fetchLink = `https://obscure-river-76343.herokuapp.com/event-info/${id}`;

  useEffect(() => {
    const getEvent = async () => {
      try {
        const fetchEventInfo = await fetch(fetchLink);
        const jsonData: Event[] = await fetchEventInfo.json();
        const eventInfo: Event = jsonData[0];

        console.log({ jsonData });
        setOrganiserName(eventInfo.organiser_name);
        setDateOfEvent(eventInfo.date_of_event);
        setnumOfAttendees(eventInfo.num_of_attendees);
        setTotalCost(eventInfo.total_cost);
        setDescription(eventInfo.description);
        setTimeOfEvent(eventInfo.time_of_event);
      } catch (err) {
        console.error(err.message);
      }
    };

    getEvent();
  }, [fetchLink]);

  const handleSubmitAttendeeName = async () => {
    // e.preventDefault(); // we do not want it to refresh;

    function intoPennies(number: string) {
      let convertToString = number.replace(/[^a-zA-Z0-9]/g, "");

      return Number(convertToString);
    }

    const costInPennies = intoPennies(costPerPerson);

    const body = { attendeeName, costInPennies };

    const sendAttendeeInfo = await fetch(
      `https://obscure-river-76343.herokuapp.com/attendee/buy/${id}`,
      {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const redirect = await sendAttendeeInfo.text();
    window.location.href = redirect;
  };

  console.log(costPerPerson);

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
          <div key={id}>
            <Box>
              <Text fontSize="2xl">Event Organisor: {organiserName}</Text>
              <Text fontSize="2xl" mt="4">
                Event Date:
                {dateOfEvent?.slice(0, 10)}
              </Text>
              <Text fontSize="2xl" mt="4">
                Event Time: {timeOfEvent}
              </Text>
              <Text fontSize="2xl" mt="4">
                Event Description
              </Text>
              <Text fontSize="2xl" mt="2">
                {description}
              </Text>
              <HStack mt="4">
                <Checkbox colorScheme="green" size="lg" isInvalid mr="20%">
                  Attending Event
                </Checkbox>

                <Text fontSize="xl" ml="7">
                  Cost Per Person:
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "GBP",
                  }).format(Number(costPerPerson))}
                </Text>
              </HStack>
            </Box>
          </div>
        }

        {/* <form onSubmit={(e) => onSubmitAttendeeName(e)}> */}
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
              onClick={() => handleSubmitAttendeeName()}
              leftIcon={<ArrowForwardIcon />}
              colorScheme="yellow"
              variant="solid"
              mt="5"
            >
              Transfer Money
            </Button>
          </VStack>
        </Box>
      </Container>
    </div>
  );
}
