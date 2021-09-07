import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Text,
  HStack,
  Checkbox,
  Input,
  Box,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Card } from "./Card";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { Property } from "./Property";

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
    window.location.href = redirect; // redirect to stripe
  };

  return (
    <div>
      <Flex bg="black">
        <Flex>
          <Text fontSize="40px">s</Text>
          <Flex
            position="fixed"
            top="1rem"
            right="1rem"
            align="center"
            mt="-4"
            bg="black"
          >
            <Text fontSize="40px" color="Red">
              Sub-city
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Box
          as="section"
          bg={useColorModeValue("gray.100", "inherit")}
          py="12"
          px={{ md: "8" }}
        >
          <Card>
            <CardHeader title="Event Information" />
            <CardContent>
              <Property label="Organisor" value={organiserName} />
              <Property label="Date" value={dateOfEvent?.slice(0, 10)} />
              <Property label="Time" value={timeOfEvent} />
              <Property label="Description" value={description} />
              <HStack mt="4" ml="20">
                <Checkbox colorScheme="green" size="lg" isInvalid mr="20%">
                  Attending Event
                </Checkbox>

                <Text fontSize="xl" ml="7">
                  Cost:
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "GBP",
                  }).format(Number(costPerPerson))}
                </Text>
              </HStack>
            </CardContent>
            <Box mt="5" mb="5">
              <HStack ml="20">
                <Input
                  placeholder="Attendee Name"
                  w="40%"
                  ml="4"
                  value={attendeeName}
                  onChange={(e) => SetAttendeeName(e.target.value)}
                ></Input>
                <Button
                  onClick={() => handleSubmitAttendeeName()}
                  leftIcon={<ArrowForwardIcon />}
                  colorScheme="yellow"
                  variant="solid"
                  ml="8"
                >
                  Transfer Money
                </Button>
              </HStack>
            </Box>
          </Card>
        </Box>
      </div>
    </div>
  );
}
